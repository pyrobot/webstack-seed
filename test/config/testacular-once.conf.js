basePath = '../../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/lib/angular/angular-core.js',
  'app/lib/angular/angular-cookies.js',
  'app/lib/angular/angular-resource.js',
  'app/lib/angular/angular-sanitize.js',
  'test/lib/angular/angular-mocks.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

singleRun = true;

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
