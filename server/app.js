require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');  // чтобы не было ошибки cors
const app = express();
const port = 8000;

// Конфигурация CORS
const corsOption = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

// Обработка запросов OPTIONS и отправка заголовков CORS
app.options('*', cors(corsOption));

// Подключение bodyParser и CORS
app.use(bodyParser.json());
app.use(cors(corsOption));

// Middleware для установки content-type
app.use((_req, res, next) => {
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  next();
});

// Middleware для обработки токена аутентификации
app.use((req, _res, next) => {
  const bearer = req.headers['authorization'];
  if (bearer?.length) {
    req.token = bearer.split(' ')?.[1] || null;
  }
  next();
});

// Middleware для подключения к базе данных PostgreSQL
app.use((req, res, next) => {
  req.db = require("./postgresConfig")
  next()
});

// Роутинг API
app.use('/api', require('./router').mainRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
});