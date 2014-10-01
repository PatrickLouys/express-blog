var Datastore = require('nedb');
var markdown = require( "markdown" ).markdown;

exports.getPage = function (req, res) {
    var db = new Datastore({ filename: 'storage/pages.db', autoload: true });
    db.findOne({ "slug": req.params.slug }, function (err, doc) {
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

exports.addPage = function (req, res) {
    var db = new Datastore({ filename: 'storage/pages.db', autoload: true });
    var doc = { slug: 'two'
               , createdAt: new Date()
               , content: '## Second page.'
               };

    db.insert(doc);
    return res.send('inserted');
}