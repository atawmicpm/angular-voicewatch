vwApp.controller('ConfigController', function($scope){
  $scope.results = ['rehe', 'raha', 'roho'];
});


//
// Test controller
//
vwApp.controller('TestController', function($scope, $routeParams, $compile, sharedTests){
  
  sharedTests.getTest($routeParams.id).then(function(test){
    $scope.test = test;
  });

});


//
//  Tests controller
//
vwApp.controller('TestsController', function($scope, $compile, $filter, $location, $routeParams, $route, $anchorScroll, sharedTests, ezConfirm){



  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.tenants = [];
  $scope.mcps = [];

  $scope.delete = function(id) {
    ezConfirm.create(function(){
      sharedTests.deleteTest(id).then(function(tests){
        $scope.tests = tests;
      });
    });
  };

  $scope.$on('ngRepeatFinished', function() {

    var start = ($scope.currentPage -1) * 10;
    var end = start + 10;

    $scope.wavesurferResults = [];    
    $scope.wavesurferResults = $scope.filteredResults.slice(start,end);
    
    angular.forEach($scope.wavesurferResults, function(result){
      var wavesurfer = $compile('<wave-surfer recording="' + result.recording + '" result-id="' + result.id + '"></wave-surfer>')($scope);
      angular.element('#wavesurfer' + result.id).append(wavesurfer);
    });
  });

  $scope.isCollapsed = true;
  $scope.configCollapsed = true;
  $scope.resultsFaded = true;

  $scope.showCreate = function() {
    $scope.showCreateTest = true;
  };

  $scope.hideCreate = function() {
    $scope.showCreateTest = false;
  };


  var lastRoute = $route.current;
  $scope.$on('$locationChangeSuccess', function(event) {
      $route.current = lastRoute;
  });

  $scope.testData = {};
  $scope.showResults = false;

  $scope.showHide = function(id) {
    if ( /[0-9]/.test(id) ) {
      $location.path('/tests/' + id);
      sharedTests.getTest(id).then(function(test){
        $scope.testSelected = test;
        $scope.searchTests = $scope.testSelected.phone_number;
      });
      $scope.resultsFaded = false;
      $scope.showResults = true;
      $scope.currentPage = 1;
    } else {
      $location.path('/');
      $scope.resultsFaded = true;
      $scope.showResults = false;
    }
  };

  // if /#/tests/:id then show that test
  if($routeParams.id){
    $scope.showHide($routeParams.id);
  }

  // update the UI every 30 seconds
  setInterval(function(){
    sharedTests.getTests().then(function(tests){
      $scope.tests = tests;
    });
  }, 30000);

  sharedTests.getTests().then(function(tests){
    $scope.tests = tests;
    angular.forEach(tests, function(test){
      if($scope.tenants.indexOf(test.tenant.name) === -1){
        $scope.tenants.push(test.tenant.name);
      }
      if ($scope.mcps.indexOf(test.mcp.ip_address) === -1){
        $scope.mcps.push(test.mcp.ip_address);
      }
    });
  });

// update tests
  $scope.$on('updateTests', function(events, tests) {
    $scope.tests = tests;
  });

// update results
  $scope.$on('updateResults', function(events, test) {

    $scope.testSelected = test;
    $scope.filteredResults = [];

    angular.forEach(test.results, function(test){
      if(/mp3/.test(test.result.recording)) {
          $scope.filteredResults.push(test.result);
      }
    });
    $scope.filteredResults = $filter('orderBy')($scope.filteredResults, 'updated_at', true);
    $scope.totalItems = $scope.filteredResults.length;
  });

// handling the submit button for the form
  $scope.createTest = function() {
    if($scope.testForm.$valid) {
      $params = $.param({
        "phone_number": $scope.testData.phone_number,
        "tenant":       $scope.testData.tenant,
        "mcp":          $scope.testData.mcp,
        "status":       0 
      });

      sharedTests.saveTests($params);
      $scope.testData.phone_number = '';
      $scope.testData.tenant = '';
      $scope.testData.mcp = '';
      }
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
  $scope.copySearchTests = function(search, id) {
    $scope.searchTests = search;
    $scope.showHide(id);
  };

  $scope.copySearchResults = function(search) {
    $scope.searchResults = search;
  };

  $scope.gotoTop = function() {
    $location.hash('top');
    $anchorScroll();
  };

});
