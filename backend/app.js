const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');

require('dotenv').config();

const {
  PORT = 3000,
  MONGODB = 'mongodb://localhost:27017/mestodb',
  NODE_ENV = 'dev',
} = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { errorsHandler } = require('./middlewares/errors');

const app = express();

const whitelist = [
  'http://misterrian.mesto.nomoredomains.sbs',
  'https://misterrian.mesto.nomoredomains.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
];

app.use(cors({
  origin(origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} in ${NODE_ENV} mode`);
});
