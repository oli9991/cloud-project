const Router = require('express').Router()
const HTTP_STATUS = require('http-status-codes')
const AppointmentService = require('../services/appointments/index.js')
const { StatusCodes } = HTTP_STATUS
const _ = require('underscore')
const { HandleAsync } = require('../commands.js')

Router.get('/', async (req, res, next) => {
  data = await AppointmentService.getAll()
  res.status(StatusCodes.OK).json(data)
})

Router.post('/', async (req, res, next) => {
  const { full_name, service_id, time_interval } = req.body
  HandleAsync({ full_name, service_id, time_interval })

  res.status(StatusCodes.CREATED).json({message: 'Ok'})
})

Router.put('/:id', async (req, res, next) => {
  const { idOras, valoare } = req.body
  const idBody = req.body.id
  const { id } = req.params
  const data = await AppointmentService.updateAppointment(
    idBody,
    id,
    idOras,
    valoare
  )
  res.status(StatusCodes.OK).json(data)
})

Router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const data = await AppointmentService.deleteAppointment(id)
  res.status(StatusCodes.OK).json(data)
})

module.exports = {
  rootPath: 'appointments',
  router: Router
}
