const Router = require('express').Router();
const HTTP_STATUS = require('http-status-codes');

Router.get('/hello', async (req, res, next) => {
  res.status(HTTP_STATUS.OK).json('Hello World');
});

module.exports = {
  rootPath: 'countries',
  router: Router
};
