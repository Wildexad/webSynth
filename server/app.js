require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const port = 8000;

const cors = require('cors');  // чтобы не было ошибки cors
const corsOption = {
  origin: ['http://localhost:8000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsOption))
app.use(bodyParser.json())

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set({ 'content-type': 'application/json; charset=utf-8' });
  next();
});

// add to req bearer token (if exist)
app.use((req, _res, next) => {
  const bearer = req.headers['authorization'];
  if (bearer?.length) {
    req.token = bearer.split(' ')?.[1] || null;
  }
  next();
})

//add to req postgres pool
app.use((req, res, next) => {
  req.db = require("./postgresConfig")
  next()
})

app.use('/api', require('./router').mainRouter);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})