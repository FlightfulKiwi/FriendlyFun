const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.listen(port, () => {
  console.log('Server listening on port', port);
});
