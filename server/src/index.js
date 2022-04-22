const express = require('express');
const app = express();
const database = require('./database');

const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const path = require('path');

const verifyToken = require('./middlewares/auth');

dotenv.config();
database.initDB();

const PORT = process.env.PORT;

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const addNoteRoute = require('./routes/addNote');
const searchRoute = require('./routes/search');
const removeNoteRoute = require('./routes/removeNote');
const changePassRoute = require('./routes/changepass');
const forgotPassRoute = require('./routes/forgotpass');
const resetPassRoute = require('./routes/resetpass');

app.use(cors());
// Parse URL-encoded body
app.use(express.urlencoded({ extended: true }));
// Parse JSON body
app.use(express.json());

const TLSoptions = {
  key: fs.readFileSync(path.resolve(__dirname, '../../cert/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../cert/cert.pem')),
};

TLSserver = https.createServer(TLSoptions, app);

TLSserver.listen(PORT, function () {
  console.log(`TLS Server is running on port ${PORT}`);
});

// app.listen(Port, function () {
//     console.log(`Server is running on port ${Port}`);
// });

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.get('/init', async (req, res) => {
  const users = fs.readFileSync(path.join(__dirname, './database/security-db.sql')).toString();
  const query = await database.getDbInstance().query(users,  (err, result) => {
    if (err){
      throw err;
    }else{
      res.send("Query run successfully");
    }
  });
});

app.get('/passwordRequirements', (req, res) => {
  res.send(require('./config/config')['password requirements']);
});

app.get('/authentication_status', verifyToken, (req, res) => {
  res.status(200).send();
});

app.post('/login', loginRoute);
app.post('/register', registerRoute);
app.post('/addNote', addNoteRoute);
app.post('/search', searchRoute);
app.post('/removeNote', removeNoteRoute);
app.post('/changePassword', changePassRoute);
app.post('/forgotpass', forgotPassRoute);
app.post('/resetpass', resetPassRoute);
