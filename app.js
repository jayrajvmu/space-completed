require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors())
//app is listen port value
app.listen(process.env.PORT, () => {
    console.log(`Example app listing on port ${process.env.PORT}`);
    console.log(process.env.PORT);
});


app.use(express.json());
//All Routes for availabilities
app.use('/availability', require('./routes/api/availability'));


