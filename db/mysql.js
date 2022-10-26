const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'master',
	password: 'master',
	database: 'seat_managment',
});


connection.connect((err) => { 
	if (err) {
		throw err;
	}
	console.log('MySQL connected Successfully');
});
module.exports = connection;