const db = require('./index');

module.exports.getAirportDetails = async (req, res) => {
  const { city, airportCode, continent } = req.body;
  const table = continent === 'Europe' ? 'airports_europe' : 'airports_north_america';
  const column = city === '' ? 'code' : 'city';
  const cityOrCode = city === '' ? airportCode : city;

  const getQuery = `SELECT (city, code) FROM ${table}
    WHERE ${column} LIKE ${cityOrCode}%`;

  const result = await db.query(getQuery);
  res.send(result);
};
