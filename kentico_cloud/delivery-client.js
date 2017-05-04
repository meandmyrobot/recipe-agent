'use strict';

// Constants
const KenticoCloud = require('./kentico-cloud');
const DELIVER_PREVIEW_URL = 'https://preview-deliver.kenticocloud.com/';
const DELIVER_PUBLISH_URL = 'https://deliver.kenticocloud.com/';

/**
 * Contuctor for DeliveryClient
 * Provides functions for interacting with the Kentico Cloud Delivery API.
 */
const DeliveryClient = class extends KenticoCloud {

    /**
     * Get the base URL for the call to the Delivery API.
     * @return {String} The publish or preview URL endpoint dependent on the API key being available.
     */
    getBaseUrl () {
        if (this.hasApiKey()) {
            return DELIVER_PREVIEW_URL;
        }

        return DELIVER_PUBLISH_URL;
    }

    /**
     * Calls the Delivery API for an item.
     * @param {Object} codename Code name of the item to query for.
     * @param {Object} options The options to add to the URL as query string parameters.
     * @return {Promise} The response from the API call
     */
    getItem (codename, options) {
        return this.getJsonContent('item/' + encodeURIComponent(codename), options);
    }

    /**
     * Calls the Delivery API for items.
     * @param {Object} options The options to add to the URL as query string parameters.
     * @return {Promise} The response from the API call
     */
    getItems (options) {
        return this.getJsonContent('items/', options);
    }

    /**
     * Calls the Delivery API for information on a type.
     * @param {Object} codename Code name of the type to query for.
     * @param {Object} options The options to add to the URL as query string parameters.
     * @return {Promise} The response from the API call
     */
    getType (codename, options) {
        return this.getJsonContent('types/' + encodeURIComponent(codename), options);
    }
};

module.exports = DeliveryClient;