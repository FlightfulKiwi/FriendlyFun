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
  const { cityOrCode, destination, continent } = req.query;
  const table = continent === 'Europe' ? 'airports_europe' : 'airports_north_america';
  const getQuery = `SELECT
    JSON_BUILD_OBJECT('code', code, 'city', city) AS result
    FROM ${table}
    WHERE ${cityOrCode} LIKE '%${destination}%' LIMIT 1`;

  try {
    const result = await pool.query(getQuery);
    res.send(result.rows[0].result);
  } catch (err) {
    res.send(err);
  }
};
