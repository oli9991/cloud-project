const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const CitiesService = require('../services/cities/cities.js')
const { StatusCodes } = HTTP_STATUS

Router.get('/', async (req, res, next) => {
  const data = await CitiesService.getAll()
  res.status(StatusCodes.OK).json(data)
})

Router.get('/country/:idTara', async (req, res, next) => {
  const { idTara } = req.params
  const data = await CitiesService.getAllCities(idTara)
  res.status(StatusCodes.OK).json(data)
})

Router.post('/', async (req, res, next) => {
  const { idTara, nume, lat, lon } = req.body
  const data = await CitiesService.addCity(idTara, nume, lat, lon)
  res.status(StatusCodes.CREATED).json(data)
})

Router.put('/:id', async (req, res, next) => {
  const { nume, lat, lon, idTara } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await CitiesService.updateCity(
    idBody,
    id,
    idTara,
    nume,
    lat,
    lon
  )
  res.status(StatusCodes.OK).json(data)
})

Router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = await CitiesService.deleteCity(id)
  res.status(StatusCodes.OK).json(data)
})

module.exports = {
  rootPath: 'cities',
  router: Router
}
