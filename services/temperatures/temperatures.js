const { query } = require('../../database_interaction/db.js')
const { ServerError } = require('../../utils/error-utils')
const {
  checkDouble,
  checkNull,
  checkInt,
  checkString
} = require('../../utils/check-input')
const { FIELDS_TEMPERATURE } = require('../../utils/types-fields')

const getAll = async () => {
  const { rows } = await query(`SELECT * FROM temperatures`, [])
  return {
    message: `All temperatures`,
    data: rows
  }
}

const addTemperature = async (idCity, valoare) => {
  const timestamp = new Date()

  /* check if name is missing */
  checkNull(idCity, FIELDS_TEMPERATURE.ID_CITY)
  /* check if lat is missing */
  checkNull(valoare, FIELDS_TEMPERATURE.VALUE)

  /* check types of fields */
  checkDouble(valoare, FIELDS_TEMPERATURE.VALUE)
  checkInt(idCity, FIELDS_TEMPERATURE.ID_CITY)

  /* check if country is already in database */
  const {
    rows
  } = await query(
    `SELECT * FROM temperatures WHERE timestamp_t=$1 and idOras=$2`,
    [timestamp, idCity]
  )

  if (rows && rows.length > 0) {
    throw new ServerError('This temperature is already in the database.', 409)
  } else {
    /* if country is not in database */
    const response = await query(
      `INSERT INTO temperatures (idOras, valoare, timestamp_t) VALUES ($1, $2, $3) RETURNING id`,
      [idCity, valoare, timestamp]
    )

    return {
      message: `The temperature was successfully added`,
      data: { id: response.rows[0].id }
    }
  }
}

const updateTemperature = async (idBody, id, idCity, valoare) => {
  /* check if id from query is not the same with the one in body is missing */
  if (+id !== +idBody) {
    throw new ServerError('The ids are not the same', 400)
  }
  /* check if id city is missing */
  checkNull(idCity, FIELDS_TEMPERATURE.ID_CITY)
  /* check if value is missing */
  checkNull(valoare, FIELDS_TEMPERATURE.VALUE)
  /* check if id from body is missing */
  checkNull(id, FIELDS_TEMPERATURE.ID)
  /* check if id from query is missing */
  checkNull(id, FIELDS_TEMPERATURE.ID)

  /* check types of fields */

  checkInt(idBody, FIELDS_TEMPERATURE.ID)
  checkInt(idCity, FIELDS_TEMPERATURE.ID_CITY)
  checkDouble(valoare, FIELDS_TEMPERATURE.VALUE)

  /* check if entry in database */
  const { rows } = await query(`SELECT * FROM temperatures WHERE id=$1`, [
    idBody
  ])

  if (rows.length === 0) {
    throw new ServerError('This temperature does not exist', 404)
  } else {
    /* if country is in database */
    await query(`UPDATE temperatures SET valoare=$1, idOras=$2 WHERE id=$3`, [
      valoare,
      idCity,
      idBody
    ])
    return {
      message: `Temperature updated`
    }
  }
}

const deleteTemperature = async id => {
  const { rows } = await query(`SELECT * FROM temperatures WHERE id=$1`, [+id])

  if (rows.length === 0) {
    throw new ServerError('This temperatures does not exist', 404)
  } else {
    /* if country is in database */
    await query(`DELETE FROM temperatures WHERE id=$1`, [+id])
    return {
      message: `Temperature deleted`
    }
  }
}

module.exports = {
  getAll,
  addTemperature,
  deleteTemperature,
  updateTemperature
}
