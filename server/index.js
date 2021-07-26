const express = require('express');
const db = require('./postgres');
const path = require('path');
const router = require('./router');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const port = 3001;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/', router);

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})