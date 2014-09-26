var express = require('express');
var app = express();
var Datastore = require('nedb');
var PageHandler = require('./src/PageHandler.js');

app.get('/', function (req, res) { res.send('hello'); });
app.get('/admin/add', PageHandler.addPage);
app.get('/:slug', PageHandler.getPage);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});