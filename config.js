const Keys = require('./keys');
let projectId = process.env.KENTICO_CLOUD_PROJECT_ID || Keys.projectId;
let apiKey = process.env.KENTICO_CLOUD_API_KEY || Keys.apiKey;
module.exports = {apiKey, projectId};

