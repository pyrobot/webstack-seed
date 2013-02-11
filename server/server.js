/*jshint node:true, es5:true*/
'use strict';

var DEVELOPMENT_MODE = false,
    START_MODULE = 'myApp';

var path = require('path'),
    express = require('express'),
    fs = require('fs');

var program = require('commander');

var app = module.exports = express();

program
  .version('0.0.1')
  .option('-p, --port', 'Use specified port', parseInt)
  .option('-D, --dev', 'Development mode (default)')
  .option('-P, --prod', 'Production mode')
  .parse(process.argv);

DEVELOPMENT_MODE = program.prod ? false : program.dev ? true : DEVELOPMENT_MODE;

if (!DEVELOPMENT_MODE) {
  var buildDir = fs.existsSync(__dirname + '/build');
  if (!buildDir) {
    console.log("Build directory not found. Run 'grunt build' first");
    return false;
  }
}

// Directory to serve
var staticDir = '../build',
    testDir = '../test',
    appDir = '../app';

app.locals({
  debug: DEVELOPMENT_MODE,
  startModule: DEVELOPMENT_MODE ? START_MODULE : null,
  pageLang: 'en'
});

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/../app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  if (DEVELOPMENT_MODE) {
    app.use(express.static(path.join(__dirname, appDir)));
  } else {
    app.use(express.static(path.join(__dirname, staticDir)));
  }
  app.use(express.static(path.join(__dirname, testDir)));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/', function (req, res) {
  res.render('index');
});