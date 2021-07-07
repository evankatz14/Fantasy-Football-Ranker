const express = require('express');
const db = require('./postgres');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})