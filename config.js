let params = require('./params');

// Load params from environment
let projectId = process.env.KENTICO_CLOUD_PROJECT_ID || params.projectId;
let apiKey = process.env.KENTICO_CLOUD_API_KEY || params.apiKey;

module.exports = {apiKey, projectId};
