const countries = require('./controllers/countries.js');

const bindRoutes = app => {
  app.use(`/api/${countries.rootPath}`, countries.router);

  app.use((err, req, res, next) => {
    if (!err.code || typeof err.code == 'string') {
      err.code = 500;
    }
    res.status(err.code).json({
      error: err.message
    });
    next(err);
  });
};

module.exports = {
  bindRoutes
};
