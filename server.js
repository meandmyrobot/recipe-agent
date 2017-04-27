'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let Assistant = require('actions-on-google').ApiAiAssistant;
app.use(bodyParser.json());

const devPort = 5000;

function recipeAgent (req, res) {
  const assistant = new Assistant({request: req, response: res});
  assistant.tell('Hello World');
}

app.get('/', (req, res) => {
  res.send('Server is up and running.');
});

app.post('/api', (req, res) => {
  recipeAgent(req, res);
});

let port = process.env.PORT || devPort;

app.listen(port, () => {
  console.log('Example app listening on port' + port);
});