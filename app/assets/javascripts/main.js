//= require_self
//= require_tree ./services
//= require_tree ./controllers
//= require_tree ./directives
//= require_tree ./filters


var vwApp = angular.module('vwApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.transitions']);

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

