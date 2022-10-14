const { response } = require('express');
const express = require('express');
const router = express.Router();
const db = require('../../db/mysql');

// View all Rooms
router.get('/', (req, res) => {
	let sql = 'SELECT * FROM rooms';
	let query = db.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}
		res.send({ success: true, message: 'Successfully fetched all rooms', rooms: result });
	});
});

// View a specific Room
router.get('/:id', (req, res) => {
	let sql = `SELECT * FROM rooms WHERE id=${req.params.id}`;
	let query = db.query(sql, (err, result, fields) => {
		if (err) {
			throw err;
		}
		if (result.length === 0) {
			return res.status(404).send({success: false, message: `There is no room with id ${req.params.id}`});
		}
		res.send({ success: true, message: 'Successfully fetched requested room', room: result[0] });
	});
});

// Add a Room
router.post('/', (req, res) => {
	let room = req.body;
	if (!req.body.title) {
		return res.status(400).send({ success: false, message: `Please add a valid room title` });
	}
	if (!req.body.description) {
		return res.status(400).send({ success: false, message: `Please add a valid room description` });
	}
	let sql = 'INSERT INTO rooms SET ?';
	let query = db.query(sql, room, (err, result, fields) => {		
		if (err) {
			throw err;
		}
		res.send({ success: true, message: `${request.body.title} added Successfully` });
	});
});

// Update a specific Room
router.put('/:id', (req, res) => {
	// console.log(req.body);
	let title = req.body.title;
	let description = req.body.description;
	let sql = `UPDATE rooms SET ? WHERE id=${req.params.id}`;
	let query = db.query(sql, room, (err, result, fields) => {
		if (err) {
			res.status(400).send({ success: false, message: err.message });
		}
		res.send({ success: true, message: `Update Successful` });
	});
});

// Delete a specific Room
router.delete('/:id', (req, res) => {
	let sql = `DELETE FROM rooms WHERE id=${req.params.id}`;
	let query = db.query(sql, (err, result, fields) => {
		if (err) {
			res.status(400).send({ success: false, message: err.message });
		}
		res.send({ success: true, message: `Successfully deleted Room Number ${req.params.id}` });
	});
});

module.exports = router;