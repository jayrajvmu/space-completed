const express = require('express');
const router = express.Router();
const roomsList = require('../../Rooms');


// View All Rooms
router.get('/', (req, res) => {
	res.json(roomsList);
});


// View Room 1
router.get('/:id', (req, res) => {
	res.json(roomsList.filter((room) => {
		return room.id === +req.params.id;
	}));
});

module.exports = router;