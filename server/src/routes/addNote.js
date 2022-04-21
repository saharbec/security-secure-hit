const router = require('express').Router();
const jwt = require('jsonwebtoken');

const DB = require('../database');
const verifyToken = require('../middlewares/auth');

router.post('/addNote', verifyToken, async (req, res) => {
  jwt.verify(req.headers['x-access-token'], process.env.TOKEN_KEY, (error, authData) => {
    if (error) {
      return res.status(401).send('An authentication error occurred');
    }
    DB.getDbInstance().query(
      'INSERT INTO notes (email,title,content) VALUES (?,?,?)',
      [authData.user.email, req.body.title, req.body.content],
      (err, result) => {
        if (err) {
          return res.status(401).send('An error occurred');
        }
        return res.status(200).send('Node created successfully');
      }
    );
  });
});

module.exports = router;
