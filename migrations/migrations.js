const mysql = require('mysql');
const migration = require('./mysql-migrations');
const connection = mysql.createPool({
  host: 'localhost',
  user: 'node_practice',
  password: 'admin',
  database: 'node_practice'
});

connection.connect((err) => { 
	if (err) {
		throw err;
	}
	console.log('MySQL connected');
});
migration.init(connection, + '/migrations', () => {
    console.log("finished running migrations");
});

module.exports = connection;