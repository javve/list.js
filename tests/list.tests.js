module("List.js standard");
var theList
    , ryah = {
        id: 4
        , name: "Ryan Dahl"
        , feature: "Node"
    }
    , tj = {
        id: 5
        , name: "TJ Holowaychuk"
        , feature: "Node"
    }
    , jonny = {
        id: 6
        , name: "Jonny Strömberg"
        , feature: "List.js"
    };
test('Create List.js from existing list', function() {
    var templates = { 
        valueNames: ['id', 'name', 'feature']
    };
    theList = new List('list', templates);
    ok(true, "list created" );
});

test('Count items', function(){
   equals(theList.size(), 3);
});

test('Add one item', function(){
    theList.add(ryah);
    equals(theList.size(), 4);
});
test('Add two items', function(){
    theList.add([tj, jonny]);
    equals(theList.size(), 6);
});

test('Remove one item', function() {
    var found = theList.remove('id', 6);
    
    equals(found, 1, "Item was note found");
    equals(theList.size(), 5, 'List is not one item shorter');
});

test('Try remove one item that not exists', function() {
    var found = theList.remove('id', 9);
    
    equals(found, false, 'An item was found');
    equals(theList.size(), 5, 'List are not 5 items long');
});

test('Get one item', function() {
    var item = theList.get('id', 4);
    deepEqual(item.values(), ryah); 
});

test('Get two items', function() {
    var items = theList.get('feature', 'Node');
    items = [
        items[0].values(),
        items[1].values()
    ];
    deepEqual(items, [ryah, tj], "Say woot");   
});

test('Get item that doen not exist', function() {
    var item = theList.get('id', 200);
    equals(item, null);   
});

test('Search', function() {
    var items = theList.search('Node'); 
    equals(items.length, 2);
    items = [
        items[0].values(),
        items[1].values()
    ];
    deepEqual(items, [ryah, tj]);
    theList.search(); 
});

test('Search with null values', function() {
    var objectWithNulls = {
        id: 7
        , name: null
        , feature: null
    };
    try {
        var items = theList.search('Node');
        equals(items.length, 2);
        items = [
            items[0].values(),
            items[1].values()
        ];
        deepEqual(items, [ryah, tj]);
    }
    finally {
        theList.search();
    }
});

test('Search for 0', function() {
    var objectWithZeros = {
        id: 7
        , name: "Node"
        , feature: 0
    };
    theList.add(objectWithZeros);
    try {
        var items = theList.search(0);
        equals(items.length, 1);
        items = [
            items[0].values()
        ];
        deepEqual(items, [objectWithZeros]);
    }
    finally {
        theList.search();
    }
});

test('Search with undefined values', function() {
    var objectWithZeros = {
        id: 7
        , name: "Node"
        , feature: 0
    };
    var objectWithUndefined = {
        id: 8
        , name: "Node"
        , feature: undefined
    };
    theList.add(objectWithUndefined);
    try {
        var items = theList.search(0);
        equals(items.length, 1);
        items = [
            items[0].values()
        ];
        deepEqual(items, [objectWithZeros]);
    }
    finally {
        theList.search();
    }
});

test('Filter', function() {
    var visibleItems = theList.filter(function(item) {
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

test('Restore from filter', function() {
    var visibleItems = theList.filter();
    equals(visibleItems.length, 7); 
});
