require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const axios = require('axios');

app.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${process.env.PORT}`);
});

// Middleware to log requests
app.use(logger);

// Body Parsing
app.use(express.json());

// All Routes for Rooms
app.use('/rooms', require('./routes/api/rooms'));

app.get('/', async (req, res) => {
	let headersList = {
		"Accept": "*/*",
		"User-Agent": "Thunder Client (https://www.thunderclient.com)",
		"Content-Type": "application/json" 
	}

	let reqOptions = {
		url: "http://localhost:5000/rooms",
		method: "GET",
		headers: headersList,
	}

	let apiResponse = await axios.request(reqOptions);

	try {
		res.send(apiResponse);
	}
	catch (err) {
		res.send({success: false, message: err.message});
	}
});

// RESTful CRUD --- Task: Move the DB APIs into proper routes as below into rooms.js

// GET /rooms    (View all rooms)
// GET /rooms/1  (View Room 1)
// POST /rooms   (Insert Room)
// PUT /rooms/1  (Update Room1)
// DELETE /rooms/1 (Delete Room1)
