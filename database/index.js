const pgp = require('pg-promise');

const credentials = {
  host: 'localhost',
  port: 5432,
  database: 'airport_info',
  user: 'username',
  password: '',
};

const db = pgp(credentials);

module.exports = db;
