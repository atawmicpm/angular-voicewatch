
vwApp.filter('validlog', function() {
  return function(logs) {
    angular.forEach(logs, function(result, index){
      if(result.result.status === null) {
        logs.splice(index, 1);
      }
    });
    return logs;
  };
});

vwApp.filter('startFrom', function () {
    return function (input, start) {
        if(input !== undefined){
          start = +start;
          return input.slice(start);
        } 
    };
});


