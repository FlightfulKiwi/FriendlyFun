/* ----- Params for Electricity ----- */
const geoCoverageAmericas = {
  'United States': 'US',
  Canada: 'CA',
};
const geoCoverageAmericasCountries = Object.keys(geoCoverageAmericas);
const geoCoverageAmericasCodes = Object.values(geoCoverageAmericas);

const geoCoverageEurope = {
  Austria: 'AT',
  Belgium: 'BE',
  Bulgaria: 'BG',
  Croatia: 'HR',
  Czechia: 'CZ',
  Denmark: 'DK',
  Estonia: 'EE',
  Finland: 'FI',
  France: 'FR',
  Germany: 'DE',
  Ireland: 'IE',
  Italy: 'IT',
  Lithuania: 'LT',
  Netherlands: 'NL',
  Poland: 'PL',
  Portugal: 'PT',
  Spain: 'ES',
  Sweden: 'SE',
  'United Kingdom': 'GB',
};
const geoCoverageEuropeCountries = Object.keys(geoCoverageEurope);
const geoCoverageEuropeCodes = Object.values(geoCoverageEurope);

/* ----- Params for Fuel Combustion ----- */
const fuelSources = {
  'Bituminous Coal': ['bit', ['short_ton', 'btu']],
  'Home Heating and Diesel Fuel': ['dfo', ['gallon', 'btu']],
  'Jet Fuel': ['jf', ['gallon', 'btu']],
  Kerosene: ['ker', ['gallon', 'btu']],
  'Lignite Coal': ['lig', ['short_ton', 'btu']],
  'Municipal Solid Waste': ['msw', ['short_ton', 'btu']],
  'Natural Gas': ['ng', ['thousand_cubic_feet', 'btu']],
  'Petroleum Coke': ['pc', ['gallon', 'btu']],
  'Propane Gas': ['pg', ['gallon', 'btu']],
  'Residual Fuel Oil': ['rfo', ['gallon', 'btu']],
  'Subbituminous Coal': ['sub', ['short_ton', 'btu']],
  'Tire-Derived Fuel': ['tdf', ['short_ton', 'btu']],
  'Waste Oil': ['wo', ['barrel', 'btu']],
};
const fuelSourcesNames = Object.keys(fuelSources);

/* ----- Export of params ----- */
module.exports = {
  geoCoverageAmericas,
  geoCoverageAmericasCodes,
  geoCoverageAmericasCountries,
  geoCoverageEurope,
  geoCoverageEuropeCodes,
  geoCoverageEuropeCountries,
  fuelSources,
  fuelSourcesNames,
};
