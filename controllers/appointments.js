const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const AppointmentService = require('../services/temperatures/index.js')
const { StatusCodes } = HTTP_STATUS
const _ = require('underscore')

Router.get('/', async (req, res, next) => {
  data = await AppointmentService.getAll()
  res.status(StatusCodes.OK).json(data)
})

Router.post('/', async (req, res, next) => {
  const { full_name, service_id } = req.body
  const data = await AppointmentService.addTemperature(idOras, valoare)
  res.status(StatusCodes.CREATED).json(data)
})

Router.put('/:id', async (req, res, next) => {
  const { idOras, valoare } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await AppointmentService.updateTemperature(
    idBody,
    id,
    idOras,
    valoare
  )
  res.status(StatusCodes.OK).json(data)
})

Router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = await AppointmentService.deleteTemperature(id)
  res.status(StatusCodes.OK).json(data)
})

module.exports = {
  rootPath: 'temperatures',
  router: Router
}
