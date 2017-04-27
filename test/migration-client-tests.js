'use strict';

let config = require('../config');
let MigrationClient = require('../kentico_cloud/migration-client');
let chai = require('chai');
chai.should();

if (config.devMode) {
    describe('Live Migration Test', () => {
        it('Can get the taxonomy information', (done) => {

            let client = new MigrationClient({apiKey: config.apiKey, projectId: config.projectId});

            client.getTaxonomy().
            then((response) => {
                console.log(response.taxonomy_groups[0].nodes);
                true.should.equal(true);
                done();
            }).
            catch((err) => {
                console.log(err);
                done(err);
            });

        });
    });
}
