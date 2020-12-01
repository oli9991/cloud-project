const express = require('express');

const app = express();

const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); //middleware de securitate

require('dotenv').config();
require('express-async-errors');

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('combined'));

const { bindRoutes } = require('./routes.js');
bindRoutes(app);

app.listen(3000, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`app is listening on port ${process.env.PORT}`);
  }
});
