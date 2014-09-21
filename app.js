var express = require('express');
var app = express();
var markdown = require( "markdown" ).markdown;
var fs = require('fs');

var showPage = function(req, res){
    var fileName = 'pages/' + req.params.slug + '.md';
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            return res.status(404).send('404 - Page not found');
        }
        return res.send(markdown.toHTML(data));
    });
}

app.get('/:slug', showPage);


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});