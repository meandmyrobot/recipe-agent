'use strict';

let DeliveryClient = require('../kentico_cloud/delivery-client');
let chai = require('chai');
chai.should();

const projectId = 'aae8b45b-734e-40e0-a3e2-ac9e6f548cee';
const previewApiKey = 'ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAidWlkIjogInVzcl8wdkw3VHg1c1BBYzhMV1Y2SWpEUzhXIiwNCiAgImVtYWlsIjogIm1pY2hhZWxraW5rYWlkQGdtYWlsLmNvbSIsDQogICJwcm9qZWN0X2lkIjogImFhZThiNDViLTczNGUtNDBlMC1hM2UyLWFjOWU2ZjU0OGNlZSIsDQogICJqdGkiOiAibnpLQVFKNldfQ1E5QmpLdyIsDQogICJ2ZXIiOiAiMS4wLjAiLA0KICAiZ2l2ZW5fbmFtZSI6ICJNaWNoYWVsIiwNCiAgImZhbWlseV9uYW1lIjogIktpbmthaWQiLA0KICAiYXVkIjogInByZXZpZXcuZGVsaXZlci5rZW50aWNvY2xvdWQuY29tIg0KfQ.N5AwGTjNkoWaG14B4mtdw3H5ygmLkKKGkLV8da0W8VY';

describe('Constructor', () => {
    it('Should throw error if no option object is provided', () => {
        (() => {
            let client = new DeliveryClient();
        }).should.throw(Error);
    });
    it('Should throw error if no project Id is provided', () => {
        (() => {
            let client = new DeliveryClient({param: 1});
        }).should.throw(Error);
    });
});

describe('Live Tests', () => {
    it('Can get the information for a content type', (done) => {
        const codeName = 'recipe';
        let client = new DeliveryClient({projectId});

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