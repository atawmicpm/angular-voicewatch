//= require_self
//= require_tree ./services
//= require_tree ./controllers
//= require_tree ./directives


var vwApp = angular.module('vwApp', ['ngRoute', 'audioPlayer']);

vwApp.config(function ($routeProvider) {
$routeProvider
  .when('/',
  {
    controller: 'TestsController',
    templateUrl: '/assets/tests.html'
  })

  .when('/config',
  {
    controller: 'ConfigController',
    templateUrl: '/assets/config.html'
  })

  .when('/tests/:id',
  {
    controller: 'TestController',
    templateUrl: '/assets/test.html'
  })

  .otherwise({ redirectTo: '/' });
});