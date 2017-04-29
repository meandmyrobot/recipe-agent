'use strict';

let express = require('express');
let bodyParser = require('body-parser');
const Assistant = require('actions-on-google').ApiAiAssistant;

let app = express();
app.use(bodyParser.json());
const devPort = 5000;
let port = process.env.PORT || devPort;

app.get('/', (req, res) => {
  res.send('Server is up and running.');
});

app.post('/api', (req, res) => {
        const assistant = new Assistant({request: req, response: res}); 
        const intent = assistant.getIntent();
        let agentResponse = 'huh?';

        switch (intent) {
            case RECIPE_RECOMMENDATION_INTENT:
                agentResponse = 'Chocolate';
            break;

            default:
                agentResponse = 'Sorry, I\'ve no idea what you\'re talking about';
        }

        assistant.tell(agentResponse);
});

app.listen(port, () => {
  console.log('Example app listening on port' + port);
});