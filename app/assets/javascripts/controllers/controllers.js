vwApp.controller('ResultsController', function($scope){
  $scope.results = ['rehe', 'raha', 'roho'];
});



vwApp.controller('TestsController', function($scope, sharedTests){

// get list of books
  sharedTests.getTests().then(function(tests){
    $scope.tests = tests;
  });

// update books
  $scope.$on('updateTests', function(events, tests) {
    $scope.tests = tests;
  });

// handling the submit button for the form
  $scope.createTest = function(testData) {
    $params = $.param({
      "phone_number": testData.phone_number,
      "tenant":       testData.tenant,
      "mcp":          testData.mcp
    })
    sharedTests.saveTests($params);
    $scope.testData.phone_number = '';
    $scope.testData.tenant = '';
    $scope.testData.mcp = '';
  }

});

vwApp.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});