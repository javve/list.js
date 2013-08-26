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

test('size: Count items', function() {
  equal(list.size(), 3);
});

test('add: Add an item', function() {
  list.add({ id: '14', name: 'caige', feature: 'listjs' });
  equal(list.size(), 4);
});

test('add: Add multiple items', function() {
  list.add([ryan, tj]);
  equal(list.size(), 5);
});

test('remove: Remove one item', function() {
  var item = list.remove('id', 1);
  equals(item, 1, 'Item should have been found when removed.');
  equal(list.size(), 2, 'One item should be removed.');
});

test('remove: Try and remove one item that does not exist', function() {
  var item = list.remove('id', 9);

  equals(item, 0, 'Item should not be found');
  equals(list.size(), 3, 'List contents should not have changed');
});

test('get: Get one item', function() {
  var item = list.get('id', 3);
  deepEqual(item.values(), {
    id: '3',
    name: 'Anton Johansson',
    feature: 'Hacker'
  });
});

test('get: Get two items,', function() {
  var items;
  list.add([ ryan, tj ]);
  items = list.get('feature', 'Node');
  items = [
    items[0].values(),
    items[1].values()
  ];
  deepEqual(items, [ryan, tj]);
});

test('get: Get item that does not exist', function() {
  var item = list.get('id', 200);
  equals(item, null);
});

test('search: term', function() {
  var items;
  list.add([ryan, tj]);
  items = list.search('Node');
  items = [
    items[0].values(),
    items[1].values()
  ];
  deepEqual(items, [ryan, tj]);
});

test('search: null values', function() {
  var items,
      objectWithNulls = {
        id: 7,
        name: null,
        feature: null
      };

  expect(2);
  list.add([ryan, tj]);

  try {
    items = list.search('Node');
    equals(items.length, 2);
    items = [
        items[0].values(),
        items[1].values()
    ];
    deepEqual(items, [ryah, tj]);
  } catch(e) {}
});

test('search: for 0', function() {  
  var items,
      objectWithZeros = {
        id: 7,
        name: 'Node',
        feature: 0
      };

  expect(2);
  list.add(objectWithZeros);
  try {
      items = list.search(0);
      equals(items.length, 1);
      items = [
          items[0].values()
      ];
      deepEqual(items, [objectWithZeros]);
  } catch(e) {}
});

test('search: undefined values', function() {
  var items,
      objectWithZeros = {
        id: 7,
        name: 'Node',
        feature: 0
      },
      objectWithUndefined = {
        id: 8,
        name: 'Node',
        feature: undefined
      };
  expect(2);
  list.add([objectWithZeros, objectWithUndefined]);
  try {
    items = list.search(0);
    equals(items.length, 1);
    items = [
        items[0].values()
    ];
    deepEqual(items, [objectWithZeros]);
  } catch(e) {}
});

test('filter: Filter list', function() {
  var visibleItems = list.filter(function(item) {
    if (+item.values().id < 3) {
      return true;
    } else {
      return false;
    }
  });
  equals(visibleItems.length, 2);
  equals(visibleItems[0].values().id, 1);
  equals(visibleItems[1].values().id, 2);
});

test('filter: Restore via filter', function() {
  var visibleItems = list.filter();
  equals(visibleItems.length, 3); 
});
