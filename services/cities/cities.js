const { query } = require('../../database_interaction/db.js')
const { ServerError } = require('../../utils/error-utils')
const {
  checkDouble,
  checkNull,
  checkString,
  checkInt
} = require('../../utils/check-input')
const { FIELDS_CITY } = require('../../utils/types-fields')

const getAll = async () => {
  const { rows } = await query(`SELECT * FROM cities`, [])
  return rows
}

const getAllCities = async idTara => {
  const {
    rows
  } = await query(`SELECT id, nume, lat, lon FROM cities WHERE idTara=$1`, [
    +idTara
  ])
  return rows
}

const addCity = async (idTara, nume, lat, long) => {
  /* check if id country is missing */
  checkNull(idTara, FIELDS_CITY.ID_COUNTRY)
  /* check if name is missing */
  checkNull(nume, FIELDS_CITY.NUME)
  /* check if lat is missing */
  checkNull(lat, FIELDS_CITY.LAT)
  /* check if long is missing */
  checkNull(long, FIELDS_CITY.LONG)

  /* check types of fields */
  checkString(nume, FIELDS_CITY.NUME)
  checkInt(idTara, FIELDS_CITY.ID_COUNTRY)
  checkDouble(lat, FIELDS_CITY.LAT)
  checkDouble(long, FIELDS_CITY.LONG)

  /* check if country is in database */
  const { rows } = await query(`SELECT * FROM countries WHERE id=$1`, [idTara])
  if (rows.length > 0) {
    /* check if city exists in this country */
    const {
      rows
    } = await query(`SELECT * FROM cities WHERE idTara=$1 and nume=$2 `, [
      idTara,
      nume
    ])

    if (rows && rows.length > 0) {
      throw new ServerError('This city is already in the database', 409)
    } else {
      /* if city is not in database */
      const response = await query(
        `INSERT INTO cities (nume, lat, lon, idTara) VALUES ($1, $2, $3, $4) RETURNING id`,
        [nume, lat, long, idTara]
      )

      return { id: response.rows[0].id }
    }
  } else {
    throw new ServerError('This country does not exist', 404)
  }
}

const updateCity = async (idBody, id, idTara, nume, lat, long) => {
  /* check if id from query is not the same with the one in body is missing */
  if (+id !== +idBody) {
    throw new ServerError('The ids are not the same', 400)
  }
  /* check if id from body is missing */
  checkNull(idBody, FIELDS_CITY.ID)
  /* check if id from query is missing */
  checkNull(id, FIELDS_CITY.ID)
  /* check if id country is missing */
  checkNull(idTara, FIELDS_CITY.ID_COUNTRY)
  /* check if name is missing */
  checkNull(nume, FIELDS_CITY.NUME)
  /* check if lat is missing */
  checkNull(lat, FIELDS_CITY.LAT)
  /* check if long is missing */
  checkNull(long, FIELDS_CITY.LONG)

  /* check types of fields */

  checkString(nume, FIELDS_CITY.NUME)
  checkInt(idTara, FIELDS_CITY.ID_COUNTRY)
  checkInt(idBody, FIELDS_CITY.ID)
  checkDouble(lat, FIELDS_CITY.LAT)
  checkDouble(long, FIELDS_CITY.LONG)

  /* check if country exists */
  const { rows } = await query(`SELECT * FROM countries WHERE id=$1`, [idTara])

  if (rows.length > 0) {
    /* check if entry in database */
    const { rows } = await query(`SELECT * FROM cities WHERE id=$1`, [idBody])

    if (rows.length === 0) {
      throw new ServerError('This city does not exist', 404)
    } else {
      /* if city is in database */
      await query(
        `UPDATE cities SET idTara=$1, nume=$2, lat=$3, lon=$4 WHERE id=$5`,
        [idTara, nume, lat, long, idBody]
      )
    }
  } else {
    throw new ServerError('This country does not exist', 404)
  }
}

const deleteCity = async id => {
  const { rows } = await query(`SELECT * FROM cities WHERE id=$1`, [+id])

  if (rows.length === 0) {
    throw new ServerError('This city does not exist', 404)
  } else {
    /* if city is in database */
    await query(`DELETE FROM cities WHERE id=$1`, [+id])
  }
}

module.exports = {
  getAll,
  getAllCities,
  addCity,
  deleteCity,
  updateCity
}
