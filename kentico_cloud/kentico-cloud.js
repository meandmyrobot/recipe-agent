/**
 * Wee Delivery Client for Kentico Cloud.
 */
const fetch = require('node-fetch');

const RESPONSE_CODE_OK = 200;
const RESPONSE_CODE_MOVED = 300;

const KenticoCloud = class {
    constructor (options) {
        this.apiKey = null;

        if (!options) {
            throw new Error('Options required.');
        }
        if (!options.projectId) {
            throw new Error('Project ID is required.');
        }

        this.projectId = options.projectId;

        if (options.apiKey) {
            this.apiKey = options.apiKey;
        }
    }

    hasApiKey () {
        return this.apiKey !== null;
    }

    getHeaders () {
        let headers = {};
        if (this.hasApiKey()) {
            headers.Authorization = 'Bearer ' + this.apiKey;
        }

        return headers;
    }

    getJsonContent (relativeUrl, options) {
        let url = this.getBaseUrl() + this.projectId + '/' + relativeUrl;
        const headers = this.getHeaders();

        if (options) {
            let parameters = Reflect.getOwnPropertyNames(options).map((name) => encodeURIComponent(name) + '=' + encodeURIComponent(options[name]));
            if (parameters.length > 0) {
                url = url + '?' + parameters.join('&');
            }
        }

        const context = {headers};
        console.log(url);
        return fetch(url, context).then(this.checkStatus).
        then((response) => response.json());
    }

    static checkStatus (response) {
        if (response.status >= RESPONSE_CODE_OK && response.status < RESPONSE_CODE_MOVED) {
            return response;
        }

        const error = 'HTTP error ' + response.status + ': ' + response.statusText;
        throw error;
    }
};

module.exports = KenticoCloud;