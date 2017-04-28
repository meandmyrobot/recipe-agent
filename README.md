[![Build Status](https://travis-ci.org/meandmyrobot/recipe-agent.svg?branch=master)](https://travis-ci.org/meandmyrobot/recipe-agent)
# recipe-agent
Google Assistant agent built with node.js that uses a repository of content stored on Kentico Cloud for fullfillment. This project plays around with a few things:

* [Node.js](https://nodejs.org/en/)
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Actions on Google](https://developers.google.com/actions/tools/)
* [API.AI](https://api.ai/)
* [Kentico Cloud](https://kenticocloud.com/)
* [Travis CI](https://travis-ci.org/)
* [Heroku](https://www.heroku.com/)

## Setup
To connect with Kentico all you need to do is provide your project Id and API key (for preview mode and things like the migration API). I didn't check in my details so to hook it up create a file called params.js on the root and enter in the following:

```javascript
const projectId = 'YOUR_PROJECT_ID';
const apiKey = 'YOUR_API_KEY';
module.exports = {apiKey, projectId};
```