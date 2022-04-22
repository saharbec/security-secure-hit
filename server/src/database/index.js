const mysql = require('mysql');

class DB {
  static dbInstance;

  static initDB() {
    DB.dbInstance = mysql.createConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    //   DB.dbInstance.connect((err) => {
    //     if (err) throw err;
    //     console.log('Connected to DB!');
    //   });
  }

  static getDbInstance() {
    return DB.dbInstance;
  }

}

module.exports = DB;
