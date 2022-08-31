const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
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
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(routes);

// Данный код нужен только для проверки восстановления работы сервера после падения
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} in ${NODE_ENV} mode`);
});
