'use strict';

let express = require('express');
let bodyParser = require('body-parser');
const Assistant = require('actions-on-google').ApiAiAssistant;
const RecipeAgent = require('./recipe_agent/recipe-agent');

let app = express();
app.use(bodyParser.json());
const devPort = 5000;
let port = process.env.PORT || devPort;

app.get('/', (req, res) => {
  res.send('Server is up and running.');
});

app.post('/api', (req, res) => {
        const assistant = new Assistant({request: req, response: res});
        const recipeAgent = new RecipeAgent(assistant);
        agentResponse = recipeAgent.getRecipeResponse();
        assistant.tell(agentResponse);
});

app.listen(port, () => {
  console.log('Example app listening on port' + port);
});