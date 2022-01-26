const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'airport_info',
  user: 'username',
  password: '',
});

module.exports = { pool };
