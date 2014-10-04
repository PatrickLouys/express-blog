var express = require('express');
var app = express();
var Datastore = require('nedb');
var pages = require('./routes/pages.js');
var admin = require('./routes/admin.js');
var basicAuth = require('basic-auth');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

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

app.get('/', pages.getHomepage);
app.get('/admin/pages', auth, admin.showPages);
app.get('/admin/pages/edit/:slug', admin.editPage);
app.get('/admin/pages/add', auth, admin.addPage);
app.get('/:slug', pages.getPage);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
