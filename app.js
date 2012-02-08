
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var Emitter = require('events').EventEmitter;
var db = require('./db');

// Routes

app.get('/', routes.index);

// ルート POST
app.post('/', function(req, res) {
    // テンプレート変数
    var locals = {
        error: null,
        short_url: null
    };

    // パラメータをチェック
    if (!req.body.url) {
        locals.error = 'Missing url parameter';
    }  else if (req.body.url > 101) {
        locals.error = 'url parameter too long';
    }
    if (locals.error) {
        res.render('result.ejs', {
            locals: locals
        });
        return;
    }

    var emitter = new Emitter;
    
    emitter.on('insertComplete', function(result) {
        console.log('inserted shortened url.');
        locals.short_url = toShortUrl(result.insertId);
        res.render('result.ejs', {locals: locals});
    });

    emitter.on('lookupComplete', function (row) {
        if ( row && row.id ) {
            console.log('row is exit');
            locals.short_url = toShortUrl(row.id);
            res.render('result.ejs', {locals: locals});
        }
        else {
            console.log('row is NOT exit');
            db.insertShortenedUrl(emitter, req.body.url);
        }
    });

    db.lookupShortenedUrl(emitter, req.body.url);
});

// 短縮URLをリダイレクト
app.get(/^\/([0-9a-zA-Z]{5,})$/, function(req, res) {
    var encryptedId = req.params[0];
    var decryptId = base62.base62_string_to_int(encryptedId);
    console.log('decryptId: ' + decryptId);

    var emitter = new Emitter;
    
    emitter.on('lookupByIdComplete', function (row) {
        if ( row && row.long_url ) {
            res.redirect( row.long_url);
        }
        else {
            res.send('Not Found', 404);
        }
    });

    db.lookupShortenedUrlById(emitter, decryptId);
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

var HOSTNAME = 'localhost';
var PORT = 3000;

var base62 = require('./base62');

function toShortUrl(id) {

    var short_url = 'http://' + HOSTNAME;
    if (PORT != 80) {
        short_url += ':' + PORT;
    }
    short_url += '/' + base62.int_to_base62_string(id);

    return short_url;
}
