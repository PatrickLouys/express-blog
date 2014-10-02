var Datastore = require('nedb');

exports.showPages = function (req, res) {
    var db = new Datastore({ filename: 'storage/pages.db', autoload: true });
    db.find({}, function (err, docs) {
        if (err) {
            return res.status(500).send('500 - Error');
        }

        var content = '<h1>Admin - Manage Pages</h1>';
        for (var key in docs) {
            content = content + '<br><a href="/admin/pages/edit/' + docs[key].slug + '">Edit ' + docs[key].slug + '</a>';
        }

        return res.send('admin/index', {content: content});
    });
}