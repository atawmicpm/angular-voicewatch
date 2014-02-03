vwApp.filter('reverse', function() {
  return function(items) {
    if(typeof items === 'undefined'){
      return items;
    } else {
    return items.slice().reverse();      
    }
  };
});