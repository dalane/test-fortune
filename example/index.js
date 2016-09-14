"use strict";

const Promise = require('bluebird');
const App = require('../src');

class ExampleApp {
    run() {
        var app = new App();
        // start promise chain to run the app and load example records...
        return Promise.try(() => {
            return app.start();
        }).then(() => {
            return app.request({
                method: 'create',
                type: 'user',
                payload: [
                    {id: 'user_one', name: 'User One'},
                    {id: 'user_two', name: 'user Two'}
                ]
            });
        }).then(() =>{
            return app.request({
                method: 'create',
                type: 'blogPost',
                payload: [
                    {id: 'post_1', message: 'This is a post from user one', author: 'user_one'},
                    {id: 'post_2', message: 'This is another post from user one', author: 'user_one'},
                    {id: 'post_3', message: 'This is a post from user two', author: 'user_two'},
                    {id: 'post_4', message: 'This is another post from user two', author: 'user_two'},
                ]
            });
        }).then(() => {
            return app.request({
                method: 'create',
                type: 'comment',
                payload: [
                    {message: 'this is comment on post 1', post: 'post_1', author: 'user_one'},
                    {message: 'this is comment on post 2', post: 'post_2', author: 'user_one'},
                    {message: 'this is comment on post 3', post: 'post_3', author: 'user_two'},
                    {message: 'this is comment on post 4', post: 'post_4', author: 'user_two'},
                ]
            });
        }).then(() => {
            return app;
        });
    }
}

module.exports = ExampleApp;
