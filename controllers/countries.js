const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const CountriesService = require('../services/countries/countries.js')
const { StatusCodes } = HTTP_STATUS

Router.get('/', async (req, res, next) => {
  const data = await CountriesService.getAll()
  res.status(StatusCodes.OK).json(data)
})

Router.post('/', async (req, res, next) => {
  const { nume, lat, lon } = req.body
  const data = await CountriesService.addCountry(nume, lat, lon)
  res.status(StatusCodes.CREATED).json(data)
})

Router.put('/:id', async (req, res, next) => {
  const { nume, lat, lon } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await CountriesService.updateCountry(idBody, id, nume, lat, lon)
  res.status(StatusCodes.OK).json(data)
})

Router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = await CountriesService.deleteCountry(id)
  res.status(StatusCodes.OK).json(data)
})

module.exports = {
  rootPath: 'countries',
  router: Router
}
