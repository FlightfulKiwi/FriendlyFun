const express = require('express');
const path = require('path');
// const axios = require('axios');
const cors = require('cors');
const { getAirportDetails } = require('../helpers/getAirportDetails');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/airportdetails', getAirportDetails);

const port = 3000;
app.listen(port, () => {
  console.log('Server listening on port', port);
});
