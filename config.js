let params = undefined;
let projectId = undefined;
let apiKey = undefined;

if (process.env.KENTICO_CLOUD_PROJECT_ID === undefined) {
    params = require('./params');
    projectId = params.projectId;
    apiKey = params.apiKey;
} else {
    projectId = process.env.KENTICO_CLOUD_PROJECT_ID;
    apiKey = process.env.KENTICO_CLOUD_API_KEY;
}

module.exports = {apiKey, projectId};