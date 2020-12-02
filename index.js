require('express-async-errors')
require('dotenv').config()

const express = require('express')
const createError = require('http-errors')
const { ServerError } = require('./utils/error-utils')

const app = express()

const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet') //middleware de securitate
const { bindRoutes } = require('./routes.js')

app.use(cors())
app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('combined'))

bindRoutes(app)

app.use((err, req, res, next) => {
  console.error(err)
  let status = 500
  let message = 'Something Bad Happened'
  if (err instanceof ServerError) {
    status = err.httpStatus
    message = err.message
  } else if (err.statusCode) {
    status = err.statusCode
    message = err.message
  }
  return next(createError(status, message))
})

app.listen(process.env.PORT, () => {
  console.log(`app is listening on port ${process.env.PORT}`)
})
