let params = null;

try {
    params = require('./params');
}
catch(err) {
    console.log(err);
}

// Load params from environment
let projectId = process.env.KENTICO_CLOUD_PROJECT_ID || params.projectId;
let apiKey = process.env.KENTICO_CLOUD_API_KEY || params.apiKey;

// Developer mode only works on local
let devMode = false || params.apiKey;

module.exports = {apiKey, devMode, projectId};
