'use strict';

/*jshint node:true, es5:true*/

// Server constants
var DEVELOPMENT_MODE = true,

// Angular module to load on startup
// (passed into the jade templates)
    START_MODULE = 'myApp',

// Modules to load
    path = require('path'),
    fs = require('fs'),
    express = require('express'),
    program = require('commander'),

// Create the express server and define a startup port
    app = express(),
    startupPort = 8000,

// Directories to serve
    buildDir = path.join(__dirname, '../../build'),
    testDir = path.join(__dirname, '..././test'),
    appDir = path.join(__dirname, '../../app'),
    viewsDir = path.join(__dirname, '../views');

// parse command line ops with commander
program
  .version('0.0.1')
  .option('-p, --port [number]', 'Use specified port', 8000)
  .option('-D, --dev', 'Development mode (default)')
  .option('-P, --prod', 'Production mode')
  .parse(process.argv);

// Overwrite dev mode with args
DEVELOPMENT_MODE = program.prod ? false : program.dev ? true : DEVELOPMENT_MODE;

// Early out if no library to serve
if (!DEVELOPMENT_MODE) {
  if (!fs.existsSync(buildDir)) {
    console.log("Build directory not found. Run 'grunt build' first");
    process.exit();
  }
}

// Calculate the starup port
startupPort = program.port || process.env.PORT || startupPort;

// Create template vars
app.locals({
  debug: DEVELOPMENT_MODE,
  startModule: DEVELOPMENT_MODE ? START_MODULE : null,
  pageLang: 'en'
});

// Configure the express app
app.configure(function(){
  app.set('port', startupPort);
  app.set('views', viewsDir);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  if (DEVELOPMENT_MODE) {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
    app.use(express.static(appDir));
    app.use(express.static(testDir));
  } else {
    app.use(express.compress());
    app.use(express.static(buildDir));
  }
});

// Set up the default routes
app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/', function (req, res) {
  res.render('index');
});

// exports the express server
module.exports = app;