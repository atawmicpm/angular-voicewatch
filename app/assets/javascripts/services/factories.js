vwApp.factory('sharedTests', ['$http', '$rootScope', function($http, $rootScope){

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  return {

    getTests: function() {
      return $http.get('/tests.json').then(function(response){
        tests = response.data;
        $rootScope.$broadcast('updateTests', tests);
        return tests;
      });
    },   

    saveTests: function($params) {
      return $http({
        headers: {'Content-Type': 'application/json' },
        url: '/tests.json',
        method: 'POST',
        data: $params
      }).success(function(addData){
        tests = addData;
        $rootScope.$broadcast('updateTests', tests);
      });
    },

    getTest: function(id) {
      return $http.get('/tests/' + id + '.json').then(function(response){
        test = response.data;
        $rootScope.$broadcast('updateResults', test);
        return test;
      });
    },

    deleteTest: function(id) {
      return $http.delete('/tests/' + id + '.json').then(function(response){
        tests = response.data;
        $rootScope.$broadcast('updateTests', tests);
        return tests;
      });
    }

  };
}]);


vwApp.factory('appSettings', ['$http', '$rootScope', function($http, $rootScope){

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  return {

    get: function() {
      return $http.get('/settings/1.json').then(function(response){
        settings = response.data;
        $rootScope.$broadcast('updateSettings', settings);
        return settings;
      });
    },   

    save: function($params) {
      return $http({
        headers: {'Content-Type': 'application/json' },
        url: '/settings.json',
        method: 'POST',
        data: $params
      }).success(function(response){
        settings = response;
        $rootScope.$broadcast('updateSettings', settings);
      });
    }

  };
}]);