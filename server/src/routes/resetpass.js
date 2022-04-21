const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = process.env;
const bcrypt = require('bcrypt');
const changePasswordValidation = require('../middlewares/validate_password.js');
const passwordConfig = require('../config/config');
const DB = require('../database/index.js');

router.post('/resetpass', changePasswordValidation, async (req, res) => {
  try {
    const { id, token, newPassword } = req.body;
    DB.getDbInstance().query('SELECT * FROM users where id=(?)', [id], async (error, results, fields) => {
      if (error) {
        console.log(error);
        return res.status(400).send('An error occurred');
      }
      if (results.length === 0) {
        return res.status(400).send('Invalid id');
      }
      const { password, oldPasswords } = results[0];
      const userKey = config.TOKEN_KEY + password;
      jwt.verify(token, userKey, async (err, decoded) => {
        if (err) {
          return res.status(401).send('Invalid token');
        }
        const oldPasswordsArr =
          oldPasswords === null ? [password] : [password, ...oldPasswords.split(',')].slice(0, passwordConfig.history);
        isPrevPass = await checkIfPassExists(newPassword, oldPasswordsArr);
        if (isPrevPass) {
          return res.status(400).send('You have already used this password');
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        DB.getDbInstance().query(
          'UPDATE users SET password = (?) , oldPasswords = (?) , failedLoginAttempts = 0 WHERE id = (?)',
          [newHashedPassword, oldPasswordsArr.join(','), id],
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).send('An error occurred');
            }
            return res.status(200).send('password changed');
          }
        );
      });
    });
  } catch (error) {
    return res.status(400).send('An error occurred');
  }
});

async function checkIfPassExists(password, previousPasswords) {
  for (var i = 0; i < previousPasswords.length; i++) {
    const resultOfCompa = await bcrypt.compare(password, previousPasswords[i]);
    if (resultOfCompa) {
      return true;
    }
  }
  return false;
}

module.exports = router;
