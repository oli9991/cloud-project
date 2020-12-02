const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const TemperaturesServices = require('../services/temperatures/temperatures.js')
const { StatusCodes } = HTTP_STATUS

Router.get('/', async (req, res, next) => {
  const data = await TemperaturesServices.getAll()
  res.status(StatusCodes.OK).json(data)
})

// Router.get('/country/:idTara', async (req, res, next) => {
//   const { idTara } = req.params
//   const data = await CitiesService.getAllCities(idTara)
//   res.status(StatusCodes.OK).json(data)
// })

Router.post('/', async (req, res, next) => {
  const { idOras, valoare } = req.body
  const data = await TemperaturesServices.addTemperature(idOras, valoare)
  res.status(StatusCodes.CREATED).json(data)
})

Router.put('/:id', async (req, res, next) => {
  const { idOras, valoare } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await TemperaturesServices.updateCity(
    id,
    idBody,
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
