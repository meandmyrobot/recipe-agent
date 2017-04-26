'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

const NAME_ACTION = 'make_name';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

// [START SillyNameMaker]
exports.sillyNameMaker = (req, res) => {
  const assistant = new Assistant({request: req, response: res});

  // Make a silly name
  function makeName (assistant) {
    let number = assistant.getArgument(NUMBER_ARGUMENT);
    let color = assistant.getArgument(COLOR_ARGUMENT);
    assistant.tell('Alright, your silly name is ' +
      color + ' ' + number +
      '! I hope you like it. See you next time.');
  }

  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);

  assistant.handleRequest(actionMap);
};