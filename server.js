'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let RecipeAgent = require('./recipe_agent/recipe-agent.js');

let app = express();
app.use(bodyParser.json());
const devPort = 5000;
let port = process.env.PORT || devPort;

app.get('/', (req, res) => {
  res.send('Server is up and running.');
});

app.post('/api', (req, res) => {
  let recipeAgent = new RecipeAgent({request: req, response: res});
  recipeAgent.handleResponse();
});

app.listen(port, () => {
  console.log('Example app listening on port' + port);
});