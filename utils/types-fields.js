const FIELDS_COUNTRY = {
  NUME: 'name country',
  LONG: 'longitude',
  LAT: 'latitude',
  ID: 'id'
}

const FIELDS_CITY = {
  NUME: 'name city',
  LONG: 'longitude',
  LAT: 'latitude',
  ID: 'id',
  ID_COUNTRY: 'id country'
}

const FIELDS_TEMPERATURE = {
  ID: 'id',
  ID_CITY: 'id city',
  VALUE: 'value',
  TIMESTAMP: 'timestamp'
}

module.exports = {
  FIELDS_COUNTRY,
  FIELDS_CITY,
  FIELDS_TEMPERATURE
}
