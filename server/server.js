'use strict';

var express    = require('express');
var fs = require('fs');
var path       = require('path');
var bodyParser = require('body-parser');
var winston    = require('winston');
const util = require('util');
/**
 * Create the Express application.
 */
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.get('/my', function(req, res) {
    res.render('pages/my');
});
app.get('/basicsearch/', function(req, res) {
    res.render('basicsearch/new');
});


var COMMENTS_FILE = path.join(__dirname, 'comments.json');

//app.use(express.static(path.join(__dirname, '/client/src')));
//app.use('/js', express.static(__dirname + 'client/js/'));
app.use('/js',express.static('./client/js')); 
app.use('/src',express.static('./client/src'));
app.use('/src', express.static(__dirname + '/client/src/'));
console.log(__dirname+'/client/src');

app.use('/scripts',express.static('./client/js'));
app.use('/css',express.static('./client/css'));
app.use('/styles',express.static('./client/css/styles'));

app.use('/images',express.static('./client/images'));

app.use(express.static('client/react/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/comments', function(req, res) {
    //console.error('inside: /api/comments');
    //winston.log('info', 'Hello distributed log files!');
    var ddd = new Date();
    //winston.info('inside: /api/comments', ddd.toLocaleTimeString());   
    winston.log('info', '%s %s', ddd.toLocaleTimeString(), '/api/comments');
    //winston.log('info', 'test message %d', 123);
    
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
    var ddd = new Date();
    winston.log('info', '%s %s', ddd.toLocaleTimeString(), '/api/comments');   
    winston.log('info', '%s', 
        util.format('%s: %j', ddd.toLocaleTimeString(), req.body));
   
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

app.route('/:id')
//p.route('/')
  .get(function(req, res) {
      console.log(req.params.id);
      var fn = req.params.id; //'index.html'));
    res.sendFile(path.join(__dirname, '..', 'client', fn));
  });
  
/**
 * Start the web server.
 */

  
  //var port = process.env.PORT || 3002;

  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002);
  app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
  
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


//app.on('stormpath.ready',function(){
app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Express server listening at %s:%d ', app.get('ip'),app.get('port'));
});

