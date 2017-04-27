const params = require('./params');
let projectId = process.env.KENTICO_CLOUD_PROJECT_ID || params.projectId;
let apiKey = process.env.KENTICO_CLOUD_API_KEY || params.apiKey;
let devMode = false || params.apiKey;
module.exports = {apiKey, devMode, projectId};
