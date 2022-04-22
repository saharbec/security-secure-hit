const router = require('express').Router();
const bcrypt = require('bcrypt');
const DB = require('../database/index.js');
const changePasswordValidation = require('../middlewares/validate_password.js');

router.post('/register', changePasswordValidation, async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    DB.getDbInstance().query('SELECT email FROM users where email=(?)', [email], async (error, results, fields) => {
      if (error) {
        return res.status(400).send('An error occurred');
      }
      if (results.length !== 0) {
        return res.status(400).send('The account already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      DB.getDbInstance().query(
        'INSERT INTO users (email,password,firstname,lastname) VALUES (?,?,?,?)',
        [email, hashedPassword, firstName, lastName],
        (error, result) => {
          if (error) {
            return res.status(400).send('An error occurred');
          }
          return res.status(200).send('User created successfully');
        }
      );
    });
  } catch (error) {
    return res.status(400).send('An error occurred');
  }
});

module.exports = router;
