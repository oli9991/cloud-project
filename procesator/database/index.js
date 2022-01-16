const { Pool } = require('pg')

const options = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
}

const pool = new Pool(options);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  });

const ExecuteQuery = async (text, params) => {
    const {
      rows,
    } = await pool.query(text, params);
    return rows;
};

module.exports = {
    ExecuteQuery
}