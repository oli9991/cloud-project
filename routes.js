const countries = require('./controllers/countries.js')
const cities = require('./controllers/cities.js')
const temperatures = require('./controllers/temperatures.js')

const bindRoutes = app => {
  app.use(`/api/${countries.rootPath}`, countries.router)
  app.use(`/api/${cities.rootPath}`, cities.router)
  app.use(`/api/${temperatures.rootPath}`, temperatures.router)
}

module.exports = {
  bindRoutes
}
