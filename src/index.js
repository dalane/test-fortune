"use strict";

const Promise = require('bluebird');
const http = require('http');
const fortune = require('fortune');
const jsonApiSerializer = require('fortune-json-api');

class App {
    constructor() {
        this.store = fortune({
            user: {
                name: { type: String },
                emailAddress: {type: String},
                posts: { link: 'blogPost', inverse: 'author', isArray: true },
                comments: {link: 'comment', inverse: 'author', isArray: true}
            },
            blogPost: {
                message: { type: String },
                comments: {link: 'comment', inverse: 'post', isArray: true},
                author: { link: 'user', inverse: 'posts' }
            },
            comment: {
                message: {type: String},
                post: {link: 'blogPost', inverse: 'comments'},
                author: {link: 'user', inverse: 'comments'}
            }
        }, {
            transforms: {
                user: [
                    function(context, record, update) {
                        switch (context.request.method) {
                            // If it's a create request, return the record.
                            case 'create': return record;
                            // If it's an update request, return the update.
                            case 'update': return update;
                            // If it's a delete request, the return value doesn't matter.
                            case 'delete': return null;
                        }
                    }, function(context, record) {
                        return record;
                    }
                ],
                blogPost: [
                    function(context, record, update) {
                        switch (context.request.method) {
                            // If it's a create request, return the record.
                            case 'create': return record;
                            // If it's an update request, return the update.
                            case 'update': return update;
                            // If it's a delete request, the return value doesn't matter.
                            case 'delete': return null;
                        }
                    }, function(context, record) {
                        return record;
                    }
                ]
            }
        });
        this.server = http.createServer(fortune.net.http(this.store, {
          serializers: [
            // The `options` object here is optional.
            [ jsonApiSerializer, {} ]
          ]
        }));
    }
    start() {
        var self = this;
        return self.store.connect().then(() =>{
            self.server.listen(8000);
        });
    }
    stop() {
        var self = this;
        return Promise.try(() => {
            self.server.close();
            return self.store.disconnect();
        });
    }
    request(options) {
        return this.store.request(options);
    }
}

module.exports = App;
