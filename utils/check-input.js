const { ServerError } = require('./error-utils')

const checkDouble = (input, field) => {
  if (typeof input === 'string') {
    throw new ServerError(`${field} : This field can not be string`, 400)
  }
}

const checkInt = (input, field) => {
  if (typeof input != 'number') {
    throw new ServerError(`${field} : This field must be int`, 400)
  }
}
const checkString = (input, field) => {
  if (typeof input !== 'string') {
    throw new ServerError(`${field} : This field must be string`, 400)
  }
}

const checkNull = (input, field) => {
  if (input === null || input === undefined || input === '') {
    throw new ServerError(`${field} : This field can not be empty`, 400)
  }
}

module.exports = {
  checkDouble,
  checkNull,
  checkInt,
  checkString
}
