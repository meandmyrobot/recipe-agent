'use strict';

let MigrationClient = require('../kentico_cloud/migration-client');
let chai = require('chai');
chai.should();

const projectId = 'aae8b45b-734e-40e0-a3e2-ac9e6f548cee';
const apiKey = 'ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdkw3VHg1c1BBYzhMV1Y2SWpEUzhXIiwNCiAgImVtYWlsIjogIm1pY2hhZWxraW5rYWlkQGdtYWlsLmNvbSIsDQogICJnaXZlbl9uYW1lIjogIk1pY2hhZWwiLA0KICAiZmFtaWx5X25hbWUiOiAiS2lua2FpZCIsDQogICJ2ZXIiOiAiMS4wLjAiLA0KICAianRpIjogIkdhS3Q3cEgwdjduRjZsZngiLA0KICAiYXVkIjogImFwaS1kcmFmdC5rZW50aWNvY2xvdWQuY29tIg0KfQ.HhjyQvTF7925OCkpgZZRfKL-6kz1577pJkzvvNi0eWc';

describe.only('Live Tests', () => {
    it('Can get the taxonomy information', (done) => {

        let client = new MigrationClient({apiKey, projectId});

        client.getTaxonomy().
        then((response) => {
            console.log(response.taxonomy_groups[0].nodes);
            true.should.equal(true);
            done();
        }).
        catch((err) => {
            console.log(err);
            done();
        });

    });
});