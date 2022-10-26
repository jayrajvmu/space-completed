const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'node_practice',
	password: 'admin',
	database: 'master'
});


connection.connect((err) => { 
	if (err) {
		throw err;
	}
	console.log('MySQL connected');
});

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
// 	if (error) throw error;
// 	console.log('The solution is: ', results[0].solution);
// });

// connection.end();

module.exports = connection;