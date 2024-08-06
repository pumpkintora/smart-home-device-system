require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  user: process.env.DB_USER || "root",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "smarthome",
  port: process.env.DB_PORT || 3306,
});

module.exports = db