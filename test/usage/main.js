require(['../../dist/list', '../../dist/list.min'], function(List, ListMin) {
  var options = {
    valueNames: [ 'name', 'born' ]
  };
  var userList = new List('users', options);
});
