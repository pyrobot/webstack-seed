'use strict';

/*jshint node:true, es5:true*/

var DEVELOPMENT_MODE = true,
    START_MODULE = 'myApp';

var path = require('path'),
    express = require('express'),
    fs = require('fs');

var program = require('commander');

/**
 *  EXPORTS THE EXPRESS SERVER HERE
 */
var app = module.exports = express();

// Directories to serve
var buildDir = path.join(__dirname, '../build'),
    testDir = path.join(__dirname, '../test'),
    appDir = path.join(__dirname, '../app');

// parse command line ops with commander
program
  .version('0.0.1')
  .option('-p, --port [number]', 'Use specified port', 8000)
  .option('-D, --dev', 'Development mode (default)')
  .option('-P, --prod', 'Production mode')
  .parse(process.argv);

DEVELOPMENT_MODE = program.prod ? false : program.dev ? true : DEVELOPMENT_MODE;

if (!DEVELOPMENT_MODE) {
  if (!fs.existsSync(buildDir)) {
    console.log("Build directory not found. Run 'grunt build' first");
    process.exit();
  }
}

// Create template vars
app.locals({
  debug: DEVELOPMENT_MODE,
  startModule: DEVELOPMENT_MODE ? START_MODULE : null,
  pageLang: 'en'
});

// Configure the express app
app.configure(function(){
  app.set('port', program.port || process.env.PORT || 8000);
  app.set('views', __dirname + '/../app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  if (DEVELOPMENT_MODE) {
    app.use(express.logger('dev'));
    app.use(express.static(appDir));
    app.use(express.errorHandler());
  } else {
    app.use(express.compress());
    app.use(express.static(buildDir));
  }
  app.use(express.static(testDir));
});

// Set up the default routes
app.get('/index.html', function (req, res) {
  res.render('index');
});

app.get('/', function (req, res) {
  res.render('index');
});