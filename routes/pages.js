var Datastore = require('nedb');
var markdown = require( "markdown" ).markdown;
var getDb = function() {
    return new Datastore({ filename: 'storage/pages.db', autoload: true });
}

exports.getPage = function (req, res) {
    getDb().findOne({ "slug": req.params.slug }, function (err, doc) {
        if (err) {
            return res.status(500).send('500 - Error');
        }

        if (doc === null) {
            return res.status(404).send('404 - Page not found');
        }

        var content = markdown.toHTML(doc.content);
        return res.render('page' ,{content: content});
    });
}

exports.getHomepage = function (req, res) {
    getDb().find({}, function (err, docs) {
        if (err) {
            return res.status(500).send('500 - Error');
        }

        return res.render('index', {pages: docs});
    });
}