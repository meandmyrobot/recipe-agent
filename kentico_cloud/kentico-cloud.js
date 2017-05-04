'use strict';

// Constants
const fetch = require('node-fetch');
const RESPONSE_CODE_OK = 200;
const RESPONSE_CODE_MOVED = 300;

/**
 * Contuctor for KenticoCloud
 * Parent class for the three clients (Deliver, Migration and the one that I haven't looked at yet).
 *
 * @param {Object} options Contains the project ID and optional API key.
 */
const KenticoCloud = class {
    constructor (options) {
        if (!options) {
            throw new Error('Options required.');
        }
        if (!options.projectId) {
            throw new Error('Project ID is required.');
        }

        /**
         * The Kentico Cloud project ID.
         * @private
         * @type {String}
         */
        this.projectId = options.projectId;

        /**
         * The Kentico Cloud API Key.
         * @private
         * @type {String}
         */
        this.apiKey = null;

        if (options.apiKey) {
            this.apiKey = options.apiKey;
        }
    }

    /**
     * Check for the API key.
     * @return {Boolean} True if the API key is available.
     */
    hasApiKey () {
        return this.apiKey !== null;
    }

    /**
     * Return the HTTP headers for the client call. Adds authorization with the API key if available.
     * @return {Object} HTTP headers.
     */
    getHeaders () {
        let headers = {};
        if (this.hasApiKey()) {
            headers.Authorization = 'Bearer ' + this.apiKey;
        }

        return headers;
    }

    /**
     * Builds the URL string for the API that the client will call.
     * @param {Object} options The query parameters
     * @return {String} The URL formatted with querystring parameters based on the options.
     */
    getUrlParameters (options) {
        if (options) {
            let parameters = Object.getOwnPropertyNames(options).map((name) => encodeURIComponent(name) + '=' + encodeURIComponent(options[name]));
            if (parameters.length > 0) {
                return '?' + parameters.join('&');
            }
        }

        return '';
    }

    /**
     * Makes the client call to the API and captures the response
     * @param {String} relativeUrl The URL endpoint that the client will call (without querystring parameters).
     * @param {Object} options The query parameters
     * @return {Promise} The results of the client call.
     */
    getJsonContent (relativeUrl, options) {
        const headers = this.getHeaders();
        const context = {headers};

        let url = this.getBaseUrl() + this.projectId + '/' + relativeUrl + this.getUrlParameters(options);
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