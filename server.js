'use strict';

// Constants
const express = require('express');
const bodyParser = require('body-parser');
const Assistant = require('actions-on-google').ApiAiAssistant;
const RecipeAgent = require('./recipe_agent/recipe-agent');

// Configure our app and the port depending on the environment
let app = express();
app.use(bodyParser.json());
const devPort = 5000;
let port = process.env.PORT || devPort;

// Fulfillment URL endpoint for Google
app.post('/api', (req, res) => {
    const assistant = new Assistant({request: req, response: res});
    const recipeAgent = new RecipeAgent(assistant);
    recipeAgent.broadcastResponseFromIntent();
});

// Provide a response for browser hitting the app. TODO: - output recipe landing page
app.get('/', (req, res) => {
    res.send('Server is up and running.');
});

// Log out what port we are on
app.listen(port, () => {
    console.log('Example app listening on port' + port);
});