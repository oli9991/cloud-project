const { query } = require('../../database_interaction/db.js')
const { ServerError } = require('../../utils/error-utils')

const getAll = async () => {
  const { rows } = await query(
    `SELECT a.full_name, a.time_interval, s.service_name, s.description, s.price, d.first_name as doctor_firstname, d.lastname as doctor_lastname FROM appointments a, services s, doctors d WHERE a.service_id=s.id AND s.doctor_id=d.id`,
    []
  )
  return rows
}

const addAppointment = async (full_name, time_interval, service_id) => {
  const timestamp = new Date()

  /* check if service exists */
  const { rows } = await query(`SELECT * FROM services WHERE id=$1`, [
    service_id
  ])

  if (rows && rows.length > 0) {
    /* check if appointment is already in database */
    const { rows } = await query(
      `SELECT * FROM appointments WHERE time_interval=$1 and service_id=$2`,
      [time_interval, service_id]
    )

    if (rows && rows.length > 0) {
      throw new ServerError('This appointment is already in the database.', 409)
    } else {
      /* if country is not in database */
      const response = await query(
        `INSERT INTO appointments (service_id, time_interval, full_name) VALUES ($1, $2, $3) RETURNING id`,
        [service_id, time_interval, full_name]
      )

      return { id: response.rows[0].id }
    }
  } else {
    throw new ServerError('This service does not exist', 404)
  }
}

const updateAppointment = async (
  idBody,
  id,
  full_name,
  time_interval,
  service_id
) => {
  /* check if id from query is not the same with the one in body is missing */
  if (+id !== +idBody) {
    throw new ServerError('The ids are not the same', 400)
  }

  /* check if city exists */
  const { rows } = await query(`SELECT * FROM services WHERE id=$1`, [
    service_id
  ])

  if (rows && rows.length > 0) {
    /* check if entry in database */
    const { rows } = await query(`SELECT * FROM appointments WHERE id=$1`, [
      idBody
    ])

    if (rows.length === 0) {
      throw new ServerError('This appointment does not exist', 404)
    } else {
      /* if country is in database */
      await query(
        `UPDATE appointments SET full_name=$1, time_interval=$2, service_id=$3 WHERE id=$3`,
        [full_name, time_interval, service_id, idBody]
      )
    }
  } else {
    throw new ServerError('This service does not exist', 404)
  }
}

const deleteAppointment = async id => {
  const { rows } = await query(`SELECT * FROM appointments WHERE id=$1`, [+id])

  if (rows.length === 0) {
    throw new ServerError('This appointment does not exist', 404)
  } else {
    /* if country is in database */
    await query(`DELETE FROM appointments WHERE id=$1`, [+id])
  }
}

module.exports = {
  getAll,
  addAppointment,
  deleteAppointment,
  updateAppointment
}
