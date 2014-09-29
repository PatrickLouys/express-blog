var express = require('express');
var app = express();
var Datastore = require('nedb');
var staticPages = require('./routes/StaticPages.js');
var dynamicPages = require('./routes/DynamicPages.js');
var admin = require('./routes/Admin.js');
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    if (user.name === 'admin' && user.pass === '1234') {
        return next();
    } else {
        return unauthorized(res);
    };
};

app.get('/', staticPages.getHomepage);
app.get('/admin/pages', auth, admin.showPages);
app.get('/admin/add', auth, dynamicPages.addPage);
app.get('/:slug', dynamicPages.getPage);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});