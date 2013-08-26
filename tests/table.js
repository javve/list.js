var list,
    fixtureMarkup = document.querySelector('#table').innerHTML,
    options = {
      valueNames: [
        'id',
        'name',
        'feature'
      ]
    },
    ryan = {
        id: 4,
        name: 'Ryan Dahl',
        feature: 'Node'
    },
    tj = {
        id: 5,
        name: 'TJ Holowaychuk',
        feature: 'Node'
    },
    jonny = {
        id: 6,
        name: 'Jonny Strömberg',
        feature: 'List.js'
    };

module('table', {
  setup: function() {
    list = new List('table', options);
  },
  teardown: function() {
    document.getElementById('table').innerHTML = fixtureMarkup;
  }
});

test('List creation', function() {
  equal(list.items.length, 3);
});

test('Count items', function() {
  equal(list.size(), 3);
});

test('Add an item', function() {
  list.add(ryan);
  equal(list.size(), 4);
});

test('Add multiple items', function() {
  list.add([ryan, tj]);
  equal(list.size(), 5);
});

test('Remove one item', function() {
  var found = list.remove('id', 1);
  equals(found, 1, 'Item should have been found when removed.')
  equal(list.size(), 5, 'One item should be removed.');
});
