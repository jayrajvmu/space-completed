require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});
app.use(cors());
app.use(express.json());
app.use('/', require('./middleware/logger'))
app.use('/booking', require('./routes/api/booking'));
app.use('/checkin', require('./routes/api/checkin'));
app.use('/wings', require('./routes/api/wings'));
app.use('/availability',require('./routes/api/availability'));