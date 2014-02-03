vwApp.controller('ConfigController', function($scope){
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

  $scope.isCollapsed = true;
  $scope.configCollapsed = true;
  $scope.resultsFaded = true;

  $scope.showCreate = function() {
    $scope.showCreateTest = true;
  };

  $scope.hideCreate = function() {
    $scope.showCreateTest = false;
  };

  $scope.audio = document.createElement('audio');

  $scope.playing = false;

  $scope.play = function(sound) {
    $scope.audio.src = sound;
    $scope.playing = true;
    $scope.audio.play();
  };

  $scope.stop = function() {
    $scope.playing = false;
    $scope.audio.pause();
  };

  $scope.audio.addEventListener('ended', function() {
    $scope.$apply(function() {
      $scope.stop();
    });
  });

  $scope.testData = {}
  $scope.showResults = false;

  $scope.showHide = function(id) {
    console.log(id);
    if ( /[0-9]/.test(id) ) {
      sharedTests.getTest(id).then(function(test){
        $scope.testSelected = test;
      });
      $scope.resultsFaded = false;
    } else {
      $scope.resultsFaded = true;
    }
  };

  setInterval(function(){
    sharedTests.getTests().then(function(tests){
      $scope.tests = tests;
    });
  }, 30000);

  sharedTests.getTests().then(function(tests){
    $scope.tests = tests;
  });

// update tests
  $scope.$on('updateTests', function(events, tests) {
    $scope.tests = tests;
  });

// update results
  $scope.$on('updateResults', function(events, test) {
    $scope.testSelected = test;
  });

// handling the submit button for the form
  $scope.createTest = function(testData) {
    $params = $.param({
      "phone_number": testData.phone_number,
      "tenant":       testData.tenant,
      "mcp":          testData.mcp,
      "status":       0 
    });

    sharedTests.saveTests($params);
    $scope.testData.phone_number = '';
    $scope.testData.tenant = '';
    $scope.testData.mcp = '';
  };

// copies test data into new test form
  $scope.copyTest = function(test) {
    $scope.testData.phone_number = test.phone_number;
    $scope.testData.tenant = test.tenant.name;
    $scope.testData.mcp = test.mcp.ip_address;
    $scope.isCollapsed = false;
  };

// copies test attribute into search box or clears it depending
// on what is passed
  $scope.copySearchTests = function(search) {
    $scope.searchTests = search;
    $scope.resultsFaded = true;
  };

  $scope.copySearchResults = function(search) {
    $scope.searchResults = search;
  };

});
