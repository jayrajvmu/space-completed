const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "node",
  database: "master",
  dateStrings: true
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

module.exports = connection;