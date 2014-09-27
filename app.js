var express = require('express');
var app = express();
var Datastore = require('nedb');
var StaticPages = require('./routes/StaticPages.js');
var DynamicPages = require('./routes/DynamicPages.js');

app.get('/', StaticPages.getHomepage);
app.get('/admin/add', DynamicPages.addPage);
app.get('/:slug', DynamicPages.getPage);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});