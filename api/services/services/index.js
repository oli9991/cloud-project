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
  const { rows } = await query(`SELECT * FROM services`, [])
  return rows
}

const addService = async (service_name, description, price, doctor_id) => {
  /* check if country is in database */
  const { rows } = await query(`SELECT * FROM doctors WHERE id=$1`, [doctor_id])
  if (rows.length > 0) {
    /* check if services exists */
    const { rows } = await query(
      `SELECT * FROM services WHERE doctor_id=$1 and service_name=$2 `,
      [doctor_id, service_name]
    )

    if (rows && rows.length > 0) {
      throw new ServerError('This service is already in the database', 409)
    } else {
      /* if city is not in database */
      const response = await query(
        `INSERT INTO services (service_name, description, price, doctor_id) VALUES ($1, $2, $3, $4) RETURNING id`,
        [service_name, description, price, doctor_id]
      )

      return { id: response.rows[0].id }
    }
  } else {
    throw new ServerError('This doctor does not exist', 404)
  }
}

const updateService = async (
  idBody,
  id,
  service_name,
  description,
  price,
  doctor_id
) => {
  /* check if id from query is not the same with the one in body is missing */
  if (+id !== +idBody) {
    throw new ServerError('The ids are not the same', 400)
  }

  /* check if country exists */
  const { rows } = await query(`SELECT * FROM doctors WHERE id=$1`, [doctor_id])

  if (rows.length > 0) {
    /* check if entry in database */
    const { rows } = await query(`SELECT * FROM services WHERE id=$1`, [idBody])

    if (rows.length === 0) {
      throw new ServerError('This service does not exist', 404)
    } else {
      /* if city is in database */
      await query(
        `UPDATE services SET service_name=$1, description=$2, price=$3, doctor_id=$4 WHERE id=$5`,
        [service_name, description, price, doctor_id, idBody]
      )
    }
  } else {
    throw new ServerError('This country does not exist', 404)
  }
}

const deleteService = async id => {
  const { rows } = await query(`SELECT * FROM services WHERE id=$1`, [+id])

  if (rows.length === 0) {
    throw new ServerError('This service does not exist', 404)
  } else {
    /* if city is in database */
    await query(`DELETE FROM services WHERE id=$1`, [+id])
  }
}

module.exports = {
  getAll,
  addService,
  deleteService,
  updateService
}
