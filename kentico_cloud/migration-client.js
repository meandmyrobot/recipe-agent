const KenticoCloud = require('./kentico-cloud');
const MIGRATION_API_URL = 'https://api.kenticocloud.com/draft/projects/';

const MigrationClient = class extends KenticoCloud {
    getBaseUrl () {
        return MIGRATION_API_URL;
    }

    getTaxonomy (options) {
        return this.getJsonContent('taxonomy/', options);
    }
};

module.exports = MigrationClient;