require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db/mysql');

app.get('/', (req, res) => {
	res.send('Welcome to JS!');
});

app.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT}`);
	console.log(process.env.ports);
});

// All Routes for Rooms
app.use('/rooms', require('./routes/api/rooms'));


// Add a Room
app.post('/addRoom/:id', (req, res) => {
	let room = { title: `Room ${req.params.id}`, description: `This is Room Number ${req.params.id}` };
	let sql = 'INSERT INTO rooms SET ?';
	let query = db.query(sql, room, (err, result, fields) => {
		if (err) {
			throw err;
		}
		console.log(result);
		res.send(result);
	});
});

// View all Rooms
app.get('/viewRooms', (req, res) => {
	let sql = 'SELECT * FROM rooms';
	let query = db.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}
		console.log(result);
		res.send(result);
	});
});

// View a specific Room
app.get('/viewRooms/:id', (req, res) => {
	let sql = `SELECT * FROM rooms WHERE id=${req.params.id}`;
	let query = db.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}
		console.log(result);
		res.send(result);
	});
});

// Update a specific Room
app.get('/updateRooms/:id', (req, res) => {
	let sql = `UPDATE rooms SET title='Room ${req.params.id+1}' WHERE id=${req.params.id}`;
	let query = db.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}
		console.log(result);
		res.send(result);
	});
});


// Delete a specific Room
app.get('/deleteRooms/:id', (req, res) => {
	let sql = `DELETE FROM rooms WHERE id=${req.params.id}`;
	let query = db.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}
		console.log(result);
		res.send(result);
	});
});


// CRUD - REST --- Task: Move the DB APIs into proper routes as below into rooms.js

// GET /rooms    (View all rooms)
// GET /rooms/1  (View Room 1)
// POST /rooms   (Insert Room)
// PUT /rooms/1  (Update Room1)
// DELETE /rooms/1 (Delete Room1)
