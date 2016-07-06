'use strict';

var express   = require('express');
var path      = require('path');

/**
 * Create the Express application.
 */
var app = express();

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

//app.on('stormpath.ready',function(){
app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Express server listening at %s:%d ', app.get('ip'),app.get('port'));
});

