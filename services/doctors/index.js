const { query } = require('../../database_interaction/db.js')
const { ServerError } = require('../../utils/error-utils')

const getAll = async () => {
  const { rows } = await query(`SELECT * FROM doctors`, [])
  return rows
}

const addDoctor = async (first_name, last_name, specialization) => {
  /* check if country is already in database */
  const { rows } = await query(`SELECT * FROM doctors WHERE nume=$1`, [nume])

  if (rows && rows.length > 0) {
    throw new ServerError('This doctor is already in the database', 409)
  } else {
    /* if country is not in database */
    const response = await query(
      `INSERT INTO doctors (first_name, last_name, specialization) VALUES ($1, $2, $3) RETURNING id`,
      [first_name, last_name, specialization]
    )

    return { id: response.rows[0].id }
  }
}

const updateDoctor = async (
  idBody,
  id,
  first_name,
  last_name,
  specialization
) => {
  /* check if id from query is not the same with the one in body is missing */
  if (+id !== +idBody) {
    throw new ServerError('The ids are not the same', 400)
  }

  /* check if entry in database */
  const { rows } = await query(`SELECT * FROM doctors WHERE id=$1`, [idBody])

  if (rows.length === 0) {
    throw new ServerError('This doctor does not exist', 404)
  } else {
    /* if country is in database */
    await query(
      `UPDATE doctors SET first_name=$1, last_name=$2, specialization=$3 WHERE id=$4`,
      [first_name, last_name, specialization, idBody]
    )
  }
}

const deleteDoctor = async id => {
  const { rows } = await query(`SELECT * FROM doctors WHERE id=$1`, [+id])

  if (rows.length === 0) {
    throw new ServerError('This doctor does not exist', 404)
  } else {
    /* if country is in database */
    await query(`DELETE FROM doctors WHERE id=$1`, [+id])
  }
}

module.exports = {
  getAll,
  addDoctor,
  deleteDoctor,
  updateDoctor
}
