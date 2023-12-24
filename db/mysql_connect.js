// db/mysql_connect.js

const mysql = require("mysql2");
require("dotenv").config();

const dbconn = mysql.createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
});

dbconn.connect((err) => {
  if (!err) {
    console.log("Veritabanına Bağlandı");
  } else {
    console.error("Veritabanı Bağlantı Hatası:", err);
  }
});

module.exports = dbconn;