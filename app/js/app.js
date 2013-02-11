'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {template: '<p>This is the partial for view 1.</p>', controller: MyCtrl1});
    $routeProvider.when('/view2', {template: '<p>This is the partial for view 2</p><p>Showing of \'interpolate\' filter: {{ \'Current version is v%VERSION%.\' | interpolate }}</p>', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
