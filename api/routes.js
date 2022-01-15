const doctors = require('./controllers/doctors.js')
const services = require('./controllers/services.js')
const appointments = require('./controllers/appointments.js')

const bindRoutes = app => {
  app.use(`/api/${doctors.rootPath}`, doctors.router)
  app.use(`/api/${services.rootPath}`, services.router)
  app.use(`/api/${appointments.rootPath}`, appointments.router)
}

module.exports = {
  bindRoutes
}
