const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const TemperaturesServices = require('../services/temperatures/temperatures.js')
const { StatusCodes } = HTTP_STATUS
const _ = require('underscore')

Router.get('/', async (req, res, next) => {
  let data
  const { lat, lon, from, until } = req.query

  if (
    (_.isNull(lat) && _.isNull(lon) && _.isNull(from) && _.isNull(until)) ||
    (_.isUndefined(lat) &&
      _.isUndefined(lon) &&
      _.isUndefined(from) &&
      _.isUndefined(until))
  ) {
    data = await TemperaturesServices.getAll()
  } else {
    data = await TemperaturesServices.getAllCoords(lat, lon, from, until)
  }
  res.status(StatusCodes.OK).json(data)
})

Router.get('/cities/:idOras', async (req, res, next) => {
  let data
  const { from, until } = req.query
  const { idOras } = req.params
  data = await TemperaturesServices.getAllCity(from, until, idOras)
  res.status(StatusCodes.OK).json(data)
})

Router.get('/countries/:idTara', async (req, res, next) => {
  let data
  const { from, until } = req.query
  const { idTara } = req.params
  data = await TemperaturesServices.getAllCountry(from, until, idTara)
  res.status(StatusCodes.OK).json(data)
})

Router.post('/', async (req, res, next) => {
  const { idOras, valoare } = req.body
  const data = await TemperaturesServices.addTemperature(idOras, valoare)
  res.status(StatusCodes.CREATED).json(data)
})

Router.put('/:id', async (req, res, next) => {
  const { idOras, valoare } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await TemperaturesServices.updateTemperature(
    idBody,
    id,
    idOras,
    valoare
  )
  res.status(StatusCodes.OK).json(data)
})

Router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = await TemperaturesServices.deleteTemperature(id)
  res.status(StatusCodes.OK).json(data)
})

module.exports = {
  rootPath: 'temperatures',
  router: Router
}
