vwApp.filter('reverse', function() {
  return function(items) {
    if(typeof items === 'undefined'){
      return items;
    } else {
      return items.slice().reverse();      
    }
  };
});

vwApp.filter('validlog', function() {
  return function(logs) {
    angular.forEach(logs, function(result, index){
      if(result.result.status === null) {
        logs.splice(index, 1);
      }
    });
    return logs;
  }
});