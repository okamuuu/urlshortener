var mysql = require('mysql');

var DBNAME = 'shorten';
var DBUSER = 'shorten';
var DBPASSWD = '';

function createClient () {
    return mysql.createClient({
        database: DBNAME,
        user: DBUSER,
        password: DBPASSWD
    });
}

exports.lookupShortenedUrlById = function(emitter, id) {
    var client = createClient();
    client.query(
        'SELECT id, long_url FROM shorten_urls WHERE id = ?',
        [id],
        function(err, results, fields) {
            if (err) {
                throw err;
            }
            client.end();
            // console.log(results);
            emitter.emit('lookupByIdComplete', results[0]);
        }
    );
};

exports.lookupShortenedUrl = function(emitter, url) {
    var client = createClient();
    client.query(
        'SELECT id, long_url FROM shorten_urls WHERE long_url = ?',
        [url],
        function(err, results, fields) {
            if (err) {
                throw err;
            }
            client.end();
            // console.log(results);
            emitter.emit('lookupComplete', results[0]);
        }
    );
};

exports.insertShortenedUrl = function(emitter, url) {
    var client = createClient();
    client.query(
        'INSERT INTO shorten_urls (long_url) VALUES (?)',
        [url],
        function(err, result) {
            if (err) {
                throw err;
            }
            client.end();
            // console.log(results);
            emitter.emit('insertComplete', result);
        }
    );
};

exports.deleteShortenedUrlById = function(emitter, id) {
    var client = createClient();
    client.query(
        'DELETE FROM shorten_urls WHERE id = ?',
        [id],
        function(err, results) {
            if (err) {
                throw err;
            }
            client.end();
            // console.log(results);
            emitter.emit('deleteComplete', results);
        }
    );
};

