require('../test_helper.js');

var db = require('../db');
var Emitter = require('events').EventEmitter;
var emitter = new Emitter;

emitter.on('deleteComplete', function (result) {
    QUnit.test('deleteShortenedUrlById', function() {
        // console.log(result);
        assert.ok(result.affectedRows);
    });
});

emitter.on('insertComplete', function (result) {
    QUnit.test('insertShortenedUrl', function() {
        assert.ok(result.insertId, result.insertId);
        // console.log(result); 
        if(result.insertId) {
            db.deleteShortenedUrlById(emitter, result.insertId);
        }

    });
});

emitter.on('lookupComplete', function (row) {
    QUnit.test('lookupShortenedUrl', function() {
        assert.equal(row.id, 1);
    });
});

emitter.on('lookupByIdComplete', function (row) {
    QUnit.test('lookupShortenedUrl', function() {
        assert.equal(row.id, 1);
    });
});

db.lookupShortenedUrlById(emitter, 1);
db.lookupShortenedUrl(emitter, 'http://okamuuu.hatenablog.com/');
db.insertShortenedUrl(emitter, 'http://okamuuu.hatenablog.com/entry/2012/02/07/141131');

QUnit.start();
