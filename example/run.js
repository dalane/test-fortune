"use strict";

const ExampleApp = require('./');

const exampleApp = new ExampleApp();
exampleApp.run().then(() => {
    console.log('example api application started...');
});
