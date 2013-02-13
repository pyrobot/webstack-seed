/*jshint node:true, es5:true*/
'use strict';

var DEVELOPMENT_MODE = true,
    START_MODULE = 'myApp';

var path = require('path'),
    express = require('express'),
    fs = require('fs');

var program = require('commander');

/**
 *  EXPORTS EXPRESS SERVER
 */
var app = module.exports = express();

// parse command line ops with commander
program
  .version('0.0.1')
  .option('-p, --port [number]', 'Use specified port', 8000)
  .option('-D, --dev', 'Development mode (default)')
  .option('-P, --prod', 'Production mode')
  .parse(process.argv);

DEVELOPMENT_MODE = program.prod ? false : program.dev ? true : DEVELOPMENT_MODE;

if (!DEVELOPMENT_MODE) {
  var buildDir = fs.existsSync(__dirname + '/../build');
  if (!buildDir) {
    console.log("Build directory not found. Run 'grunt build' first");
    process.exit();
  }
}

// Directories to serve
var staticDir = '../build',
    testDir = '../test',
    appDir = '../app';

// Create template vars
app.locals({
  debug: DEVELOPMENT_MODE,
  startModule: DEVELOPMENT_MODE ? START_MODULE : null,
  pageLang: 'en'
});

app.configure(function(){
  app.set('port', program.port || process.env.PORT || 8000);
  app.set('views', __dirname + '/../app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  if (DEVELOPMENT_MODE) {
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, appDir)));
    app.use(express.errorHandler());
  } else {
    app.use(express.compress());
    app.use(express.static(path.join(__dirname, staticDir)));
  }
  app.use(express.static(path.join(__dirname, testDir)));
});

app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/', function (req, res) {
  res.render('index');
});