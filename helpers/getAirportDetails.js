const { pool } = require('../database/index');

pool.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to postgres!');
  }
});
pool.connect();

module.exports.getAirportDetails = async (req, res) => {
  const { choice, cityOrCode, continent } = req.body;
  const table = continent === 'Europe' ? 'airports_europe' : 'airports_north_america';
  const column = choice === 'city' ? 'city' : 'code';
  const getQuery = `SELECT (code) FROM ${table}
    WHERE ${column} LIKE '%${cityOrCode}%' LIMIT 1`;

  try {
    const result = await pool.query(getQuery);
    res.send(result.rows);
  } catch (err) {
    res.send(err);
  }
};
