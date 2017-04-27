const KenticoCloud = require('./kentico-cloud');
const DELIVER_PREVIEW_URL = 'https://preview-deliver.kenticocloud.com/';
const DELIVER_PUBLISH_URL = 'https://deliver.kenticocloud.com/';

const DeliveryClient = class extends KenticoCloud {
    getBaseUrl () {
        if (this.hasApiKey()) {
            return DELIVER_PREVIEW_URL;
        }

        return DELIVER_PUBLISH_URL;
    }

    getItem (codename, options) {
        return this.getJsonContent('items/' + encodeURIComponent(codename), options);
    }

    getItems (options) {
        return this.getJsonContent('items', options);
    }

    getType (codename, options) {
        return this.getJsonContent('types/' + encodeURIComponent(codename), options);
    }
};

module.exports = DeliveryClient;