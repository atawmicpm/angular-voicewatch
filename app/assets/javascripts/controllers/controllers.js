vwApp.controller('ResultsController', function($scope){
  $scope.results = ['rehe', 'raha', 'roho'];
});


//
// Test controller
//
vwApp.controller('TestController', function($scope, $routeParams, sharedTests){
  
  sharedTests.getTest($routeParams.id).then(function(test){
    $scope.test = test;
  });

});


//
//  Tests controller
//
vwApp.controller('TestsController', function($scope, sharedTests){

  $scope.testData = {}

  $scope.showResults = false;

  $scope.showHide = function(id) {
    console.log(id);
    if ( /[0-9]/.test(id) ) {
      console.log(id);
      sharedTests.getTest(id).then(function(test){
        $scope.testSelected = test;
      });
      $scope.showResults = true;
    } else {
      $scope.showResults = false;
    }
  };

// $scope.showResults = false;
// get list of books
  sharedTests.getTests().then(function(tests){
    $scope.tests = tests;
  });

// update books
  $scope.$on('updateTests', function(events, tests) {
    $scope.tests = tests;
  });

// update results
  sharedTests.getTest().then(function(test){
    $scope.testSelected = test;
  });

  $scope.$on('updateResults', function(events, test) {
    $scope.testSelected = test;
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

// copies test data into new test form
  $scope.copyTest = function(test) {
    $scope.testData.phone_number = test.phone_number;
    $scope.testData.tenant = test.tenant.name;
    $scope.testData.mcp = test.mcp.ip_address;
  }

// copies test attribute into search box or clears it depending
// on what is passed
  $scope.copySearchTests = function(search) {
    $scope.searchTests = search;
    $scope.showResults = false;
  }

  $scope.copySearchResults = function(search) {
    $scope.searchResults = search;
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