var Datastore = require('nedb');
var getDb = function() {
    return new Datastore({ filename: 'storage/pages.db', autoload: true });
}

exports.showPages = function (req, res) {
    getDb().find({}, function (err, docs) {
        if (err) {
            return res.status(500).send('500 - Error');
        }

        return res.render('admin/showPages', {pages: docs});
    });
}

exports.editPage = function (req, res) {
    getDb().findOne({ "slug": req.params.slug }, function (err, doc) {
        if (err) {
            return res.status(500).send('500 - Error');
        }

        if (doc === null) {
            return res.status(404).send('404 - Page not found');
        }

        return res.render('admin/editPage' ,{page: doc});
    });
}

exports.addPage = function (req, res) {
    var doc = { slug: 'two'
               , createdAt: new Date()
               , content: '## Second page.'
               };

    getDb().insert(doc);
    return res.send('inserted');
}