/* Tests Controller */
vwApp.controller('TestsController', ['$scope', '$timeout', '$compile', '$filter', '$location', '$routeParams', '$route', 'sharedTests', 'ezConfirm', 'appSettings',
  function($scope, $timeout, $compile, $filter, $location, $routeParams, $route, sharedTests, ezConfirm, appSettings){

  $scope.currentPage = 1;   // set initial page for pagination
  $scope.pageSize = 10;     // set number of test results per page
  $scope.tenants = [];      // initialize tenants array for new tenant creation auto complete
  $scope.mcps = [];         // initialize mcps array for new tenant creation auto complete
  $scope.spinner = false;   // hide the ajax-loader.gif on page load

  $scope.showResults = false;     // make the test button say 'show results >' to start
  $scope.isCollapsed = true;      // set the create new test view to collapsed to start
  $scope.configCollapsed = true;  // set the config view collapsed to start
  $scope.resultsFaded = true;     // make sure the test results view is hidden 
  $scope.testData = {};           // create initial object for create test form
  $scope.settingsData = {};        // create initial object for settings data form

  /* grab application settings from REST API and display */
  appSettings.get().then(function(settings){
    $scope.settingsData = settings;
  });

  $scope.saveSettings = function(){
      $params = {
        "smtp":   $scope.settingsData.smtp,
        "email":  $scope.settingsData.email,
      };
      appSettings.save($params);
  };

  /*  grab initial tests from REST API to display in the view */
  sharedTests.getTests().then(function(tests){
    $scope.tests = tests;
    angular.forEach(tests, function(test){
      // push new tenants to the tenants array for auto complete
      if($scope.tenants.indexOf(test.tenant.name) === -1){
        $scope.tenants.push(test.tenant.name);
      }
      // push new mcps to the mcps array for auto complete
      if ($scope.mcps.indexOf(test.mcp.ip_address) === -1){
        $scope.mcps.push(test.mcp.ip_address);
      }
    });
  });


  /*  grab new tests from REST API and update the UI every 30 seconds */
  setInterval(function(){
    sharedTests.getTests().then(function(tests){
      $scope.tests = tests;
    });
    var id = $location.path().match(/\d+/g);
    sharedTests.getTest(id);
  }, 30000);

  /*  popup delete confirmation box, if yes then run deleteTest function from the sharedTests factory */
  $scope.delete = function(id) {
    ezConfirm.create(function(){
      sharedTests.deleteTest(id).then(function(tests){
        $scope.tests = tests;
      });
    });
  };

  /*  submit create test form data to sharedTests factory and clear the form fields */
  $scope.createTest = function() {
    if($scope.testForm.$valid) {
      $params = {
        "phone_number": $scope.testData.phone_number,
        "tenant":       $scope.testData.tenant,
        "mcp":          $scope.testData.mcp,
        "status":       0 
      };

      sharedTests.saveTests($params);
      $scope.testData.phone_number = '';
      $scope.testData.tenant = '';
      $scope.testData.mcp = '';
    }
  };

  /*  update tests array any time the sharedTests factory broadcasts updateTests */
  $scope.$on('updateTests', function(events, tests) {
    $scope.tests = tests;
  });

  $scope.$on('updateSettings', function(events, settings) {
    $scope.settings = settings;
  });

  /*  show tests results if an id is passed in, hide results if not */
  $scope.showHide = function(id) {
    if ( /[0-9]/.test(id) ) {
      $location.path('/tests/' + id);
      sharedTests.getTest(id).then(function(test){
        $scope.searchTests = test.phone_number;
      });
      $scope.spinner = true;
      $scope.showResults = true;
    } else {
      $location.path('/');
      $scope.spinner = false;
      $scope.resultsFaded = true;
      $scope.showResults = false;

    }
  };

  /*  update results array any time the sharedTests factory broadcasts updateResults */
  $scope.$on('updateResults', function(events, test) {
    $scope.testStats = test;
    $scope.filteredResults = [];
    console.log(test);

    angular.forEach(test.results, function(test){
      if(/mp3/.test(test.result.recording)) {
          $scope.filteredResults.push(test.result);
      }
    });
    $scope.filteredResults = $filter('orderBy')($scope.filteredResults, 'updated_at', true);
    $scope.totalItems = $scope.filteredResults.length;
    $scope.currentPage = 1;
    $scope.spinner = false;
    $scope.resultsFaded = false;
  });

  /*  if the url is http://hostname/#/tests/:id then show those test results */
  if($routeParams.id){
    $scope.showHide($routeParams.id);
  }

  /*  when the onFinishRender directive broadcasts ngRepeatFinished, populate and render the waveforms */
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

  /*  short circuit $location change so we can update the browser URL without refreshing the view template   */
  var lastRoute = $route.current;
  $scope.$on('$locationChangeSuccess', function(event) {
      $route.current = lastRoute;
  });

  /*  copy test data to create test form and display create test section when 'copy' button is pressed */
  $scope.copyTest = function(test) {
    console.log(test);
    $scope.testData.phone_number = test.phone_number;
    $scope.testData.tenant = test.tenant.name;
    $scope.testData.mcp = test.mcp.ip_address;
    $scope.isCollapsed = false;
  };

  /*  copy a clicked element within tests to the search box to filter them */
  $scope.copySearchTests = function(search, id) {
    $scope.searchTests = search;
    $scope.showHide(id);
  };

  /*  scope search results */
  $scope.copySearchResults = function(search) {
    $scope.searchResults = search;
  };

}]);

//
// Config controller
//
vwApp.controller('ConfigController', function($scope){
  $scope.results = ['rehe', 'raha', 'roho'];
});


