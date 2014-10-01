var Datastore = require('nedb');
var markdown = require( "markdown" ).markdown;

exports.getHomepage = function (req, res) {
    var db = new Datastore({ filename: 'storage/pages.db', autoload: true });
    db.find({}, function (err, docs) {
        if (err) {
            return res.status(500).send('500 - Error');
        }

        return res.render('index', {pages: docs});
    });
}