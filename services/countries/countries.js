const { query } = require('../../database_interaction/db.js')
const { ServerError } = require('../../utils/error-utils')
const {
  checkDouble,
  checkNull,
  checkInt,
  checkString
} = require('../../utils/check-input')
const { FIELDS_COUNTRY } = require('../../utils/types-fields')

const getAll = async () => {
  const { rows } = await query(`SELECT * FROM countries`, [])
  return {
    message: `All countries with all the information`,
    data: rows
  }
}

const addCountry = async (nume, lat, long) => {
  /* check if name is missing */
  checkNull(nume, FIELDS_COUNTRY.NUME)
  /* check if lat is missing */
  checkNull(lat, FIELDS_COUNTRY.LAT)
  /* check if long is missing */
  checkNull(long, FIELDS_COUNTRY.LONG)

  /* check types of fields */
  checkString(nume, FIELDS_COUNTRY.NUME)
  checkDouble(lat, FIELDS_COUNTRY.LAT)
  checkDouble(long, FIELDS_COUNTRY.LONG)

  /* check if country is already in database */
  const { rows } = await query(`SELECT * FROM countries WHERE nume=$1`, [nume])

  if (rows && rows.length > 0) {
    throw new ServerError('This country is already in the database', 409)
  } else {
    /* if country is not in database */
    const response = await query(
      `INSERT INTO countries (nume, lat, lon) VALUES ($1, $2, $3) RETURNING id`,
      [nume, lat, long]
    )

    return {
      message: `The country was successfully added`,
      data: { id: response.rows[0].id }
    }
  }
}

const updateCountry = async (idBody, id, nume, lat, long) => {
  /* check if id from query is not the same with the one in body is missing */
  if (+id !== +idBody) {
    throw new ServerError('The ids are not the same', 400)
  }
  /* check if id from body is missing */
  checkNull(idBody, FIELDS_COUNTRY.ID)
  /* check if id from query is missing */
  checkNull(id, FIELDS_COUNTRY.ID)
  /* check if name is missing */
  checkNull(nume, FIELDS_COUNTRY.NUME)
  /* check if lat is missing */
  checkNull(lat, FIELDS_COUNTRY.LAT)
  /* check if long is missing */
  checkNull(long, FIELDS_COUNTRY.LONG)

  /* check types of fields */

  checkString(nume, FIELDS_COUNTRY.NUME)
  checkInt(idBody, FIELDS_COUNTRY.ID)
  checkDouble(lat, FIELDS_COUNTRY.LAT)
  checkDouble(long, FIELDS_COUNTRY.LONG)

  /* check if entry in database */
  const { rows } = await query(`SELECT * FROM countries WHERE id=$1`, [idBody])

  if (rows.length === 0) {
    throw new ServerError('This country does not exist', 404)
  } else {
    /* if country is in database */
    await query(`UPDATE countries SET nume=$1, lat=$2, lon=$3 WHERE id=$4`, [
      nume,
      lat,
      long,
      idBody
    ])
    return {
      message: `Country updated`
    }
  }
}

const deleteCountry = async id => {
  const { rows } = await query(`SELECT * FROM countries WHERE id=$1`, [+id])

  if (rows.length === 0) {
    throw new ServerError('This country does not exist', 404)
  } else {
    /* if country is in database */
    await query(`DELETE FROM countries WHERE id=$1`, [+id])
    return {
      message: `Country deleted`
    }
  }
}

module.exports = {
  getAll,
  addCountry,
  deleteCountry,
  updateCountry
}
