'use strict';

let KenticoCloud = require('../kentico_cloud/kentico-cloud');
let chai = require('chai');
chai.should();

describe('Constructor', () => {
    it('Should throw error if no option object is provided', () => {
        (() => {
            let client = new KenticoCloud();
        }).should.throw(Error);
    });
    it('Should throw error if no project Id is provided', () => {
        (() => {
            let client = new KenticoCloud({param: 1});
        }).should.throw(Error);
    });
});