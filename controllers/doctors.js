const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const DoctorsService = require('../services/doctors/index.js')
const { StatusCodes } = HTTP_STATUS

Router.get('/', async (req, res, next) => {
  const data = await DoctorsService.getAll()
  res.status(StatusCodes.OK).json(data)
})

Router.post('/', async (req, res, next) => {
  const { first_name, last_name, specialization } = req.body
  const data = await DoctorsService.addDoctor(
    first_name,
    last_name,
    specialization
  )
  res.status(StatusCodes.CREATED).json(data)
})

Router.put('/:id', async (req, res, next) => {
  const { first_name, last_name, specialization } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await DoctorsService.updateDoctor(
    idBody,
    id,
    first_name,
    last_name,
    specialization
  )
  res.status(StatusCodes.OK).json(data)
})

Router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = await DoctorsService.deleteDoctor(id)
  res.status(StatusCodes.OK).json(data)
})

module.exports = {
  rootPath: 'doctors',
  router: Router
}
