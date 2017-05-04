'use strict';

// Constants
const KenticoCloud = require('./kentico-cloud');
const MIGRATION_API_URL = 'https://api.kenticocloud.com/draft/projects/';

/**
 * Contuctor for MigrationClient
 * Provides very limited functions for interacting with the Kentico Cloud Migration API - as I didn't get too far with the demo :-)
 */
const MigrationClient = class extends KenticoCloud {

    /**
     * Get the base URL for the call to the Delivery API.
     * @return {String} The migration API endpoint.
     */
    getBaseUrl () {
        return MIGRATION_API_URL;
    }

    /**
     * Calls the Migration API for taxonomy group information.
     * @param {Object} options The options to add to the URL as query string parameters.
     * @return {Promise} The response from the API call
     */
    getTaxonomy (options) {
        return this.getJsonContent('taxonomy/', options);
    }
};

module.exports = MigrationClient;