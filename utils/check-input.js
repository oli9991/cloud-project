const { ServerError } = require('./error-utils')
const _ = require('underscore')

const checkDouble = (input, field) => {
  if (_.isString(input)) {
    throw new ServerError(`${field} : This field can not be string`, 400)
  }
}

const checkInt = (input, field) => {
  if (!_.isNumber(input)) {
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

module.exports = {
  checkDouble,
  checkNull,
  checkInt,
  checkString
}
