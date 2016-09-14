"use strict"

const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
Promise.promisifyAll(request);
const ExampleApp = require('../example');

describe('Test hyphenated resource end points', function() {
    beforeAll(function(done) {
        var self = this;
        var exampleApp = new ExampleApp();
        // start promise chain
        Promise.try(() => {
            // run the example app with example data...
            return exampleApp.run();
        }).then((app) => {
            self.app = app;
            done();
        });
    });
    afterAll(function(done) {
        this.app.stop().then(() => {
            done();
        });
    });
    it('Should return successfully a list of blog posts with hyphenated resource name', function(done) {
        Promise.try(() => {
            return request({
                method: 'GET',
                url: 'http://localhost:8000/blog-posts'
            });
        }).then(response => {
            expect(response.statusCode).toBe(200);
        }).catch(error => {
            fail(error);
        }).then(() => {
            done();
        });
    });
});
