// angular.module('Results', ['$http', 'bootstrap.ui']).

//   factory('resultsData', ['$http', '$rootScope', function($http, $rootScope) {
//     get: function(id) {
//       return $http.get('/tests/' + id + '.json').then(function(response){
//         test = response.data;
//         $rootScope.$broadcast('updateResults', test);
//         return test;
//       });
//     },

//   }]).


//   directive('resultsRenderer', ['$compile', 'resultsData', function($compile, resultsData) {
//     return {
//       restrict: 'E',
//       templateUrl: '/assets/results-tpl.html',

//       link:function(scope, element, attrs) {

//       }
//     };
//   }]).


//   controller('ResultsController', ['$scope', 'bootstrap.ui', 'resultsData', 'resultsRenderer', function($scope, bootstrap.ui, resultsData, resultsRenderer) {
//     $scope.results = resultsData.get();
//   }]);



/* 
app.directive('changeIt', function(){
  return {
    restrict: 'CA',
    scope: { getDataFn : '&' },
    link: function (scope) {
      scope.name = getDataFn().name;
    }
  }
});     

<div class='change-it' get-data-fn='getMyData()'></div>
<div class='change-it' get-data-fn='getYourData()'></div>


app.controller('Ctrl', function($scope, myData, yourData) {
  $scope.getMyData = function() {
    return myData;
  };

  $scope.getYourData = function() {
    return yourData; 
  };
});
*/