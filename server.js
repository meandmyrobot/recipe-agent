'use strict';

// Constants
let express = require('express');
let bodyParser = require('body-parser');
const Assistant = require('actions-on-google').ApiAiAssistant;
const RecipeAgent = require('./recipe_agent/recipe-agent');

// Configure our app and the port depending on the environment
let app = express();
app.use(bodyParser.json());
let devPort = 5000;
let port = process.env.PORT || devPort;

// Provide a response for browser hitting the app. TODO: - output recipe landing page
app.get('/', (req, res) => {
    res.send('Server is up and running.');
});

// Fulfillment URL endpoint for Google
app.post('/api', (req, res) => {
    const assistant = new Assistant({request: req, response: res});
    const recipeAgent = new RecipeAgent(assistant);
    recipeAgent.broadcastResponseFromIntent();
});

// Log out what port we are on
app.listen(port, () => {
    console.log('Example app listening on port' + port);
});