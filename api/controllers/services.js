const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const ServicesService = require('../services/services/index.js')
const { StatusCodes } = HTTP_STATUS

Router.get('/', async (req, res, next) => {
  const data = await ServicesService.getAll()
  res.status(StatusCodes.OK).json(data)
})

Router.post('/', async (req, res, next) => {
  const { service_name, description, price, doctor_id } = req.body
  console.log(service_name, description, price, doctor_id)
  const data = await ServicesService.addService(
    service_name,
    description,
    price,
    doctor_id
  )
  res.status(StatusCodes.CREATED).json(data)
})

Router.put('/:id', async (req, res, next) => {
  const { service_name, description, price, doctor_id } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await ServicesService.updateService(
    idBody,
    id,
    service_name,
    description,
    price,
    doctor_id
  )
  res.status(StatusCodes.OK).json(data)
})

Router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = await ServicesService.deleteService(id)
  res.status(StatusCodes.OK).json(data)
})

module.exports = {
  rootPath: 'services',
  router: Router
}
