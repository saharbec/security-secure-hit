const router = require('express').Router();
const verifyToken = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const DB = require('../database');
const config = process.env;

router.post('/removeNote', verifyToken, async (req, res) => {
  try {
    const { title } = req.body;
    authData = jwt.verify(req.headers['x-access-token'], config.TOKEN_KEY);
    const { email } = authData.user;
    DB.getDbInstance().query('DELETE FROM notes WHERE email = ? and title = ?', [email, title]);
    return res.status(200).send('Note removes');
  } catch (error) {
    return res.status(400).send('An error occurred');
  }
});

module.exports = router;
