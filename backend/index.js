const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express()
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log('Error handler middleware, Unauthorized');
    res.status(401).send(err);
  }
  else {
    console.log('Error handler middleware, another error');
    next(err);
  }
});

app.listen(port, () => {
  console.log(`La Paz Cloud example app: http://localhost:${port}`)
});
