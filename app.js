var express = require('express');
var app = express();
var Datastore = require('nedb');
var pages = require('./routes/pages.js');

app.get('/', function (req, res) { res.send('hello'); });
app.get('/admin/add', pages.addPage);
app.get('/:slug', pages.getPage);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});