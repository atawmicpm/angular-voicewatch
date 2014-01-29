//= require_self
//= require_tree ./services
//= require_tree ./controllers
//= require_tree ./directives


var vwApp = angular.module('vwApp', ['ngRoute']);

vwApp.config(function ($routeProvider) {
$routeProvider
  .when('/',
  {
    controller: 'ResultsController',
    templateUrl: '/assets/results.html'
  })

  .when('/tests',
  {
    controller: 'TestsController',
    templateUrl: '/assets/tests.html'
  })

  .otherwise({ redirectTo: '/' });
});