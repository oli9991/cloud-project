const { ServerError } = require('./error-utils')
const _ = require('underscore')
const moment = require('moment')

const checkDouble = (input, field) => {
  if (_.isString(input)) {
    throw new ServerError(`${field} : This field must be double`, 400)
  }
}

const checkInt = (input, field) => {
  if (!Number.isInteger(input)) {
    throw new ServerError(`${field} : This field must be int`, 400)
  }
}
const checkString = (input, field) => {
  if (!_.isString(input)) {
    throw new ServerError(`${field} : This field must be string`, 400)
  }
}

const checkNull = (input, field) => {
  if (_.isNaN(input) || _.isNull(input) || _.isUndefined(input)) {
    throw new ServerError(`${field} : This field can not be empty`, 400)
  }
}

const checkDate = (input, field) => {
  if (!moment(input, 'YYYY-MM-DD', true).isValid()) {
    throw new ServerError(
      `${field} : This field must be format YYYY-MM-DD`,
      400
    )
  }
}

const simpleCheckDate = input => moment(input, 'YYYY-MM-DD', true).isValid()

const prettyDate = date => moment(date).format('YYYY-MM-DDTHH:mm')

const formatArray = arr =>
  arr
    ? arr.map(e => ({
        ...e,
        timestamp: prettyDate(e.timestamp)
      }))
    : []

module.exports = {
  checkDouble,
  checkNull,
  simpleCheckDate,
  formatArray,
  prettyDate,
  checkInt,
  checkDate,
  checkString
}
