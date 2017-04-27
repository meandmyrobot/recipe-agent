'use strict';

let config = require('../config');
let DeliveryClient = require('../kentico_cloud/delivery-client');
let chai = require('chai');
chai.should();

describe('Live Delivery Test', () => {
    it('Can get the information for a content type', (done) => {
        const codeName = 'recipe';
        let client = new DeliveryClient({projectId: config.projectId});

        client.getType(codeName).
        then((response) => {
            console.log(response.elements);
            true.should.equal(true);
            done();
        }).
        catch((err) => {
            console.log(err);
            done();
        });

    });
});