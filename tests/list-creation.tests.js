module("List.js Creation Variants test");

var listItems = [
    { id: 1, name: "Ryan Dahl" },
    { id: 2, name: "TJ Holowaychuk" },
    { id: 3, name: "Jonny Strömberg" },
    { id: 4, name: "Anton Johansson" },
    { id: 5, name: "Jonas Söderberg" },
    { id: 6, name: "Jonas Arnklint" },
    { id: 7, name: "Gustaf Lindqvist" },
    { id: 8, name: "Joakim Westerlund" },
    { id: 9, name: "Jonny Strömberg" },
    { id: 10, name: "Ryan Dahl" }
];

test('Create List.js from existing list', function() {
    var templates = { 
        valueNames: ['id', 'name']
    };
    var theList1 = new List('list1', templates, listItems);
    equals(theList1.size(), 11);
    ok(true, "list created" );
});

test('Create List.js from existing list', function() {
    var templates = { 
        valueNames: ['id', 'name'],
        item: "itemTemplate"
    };
    var theList2 = new List('list2', templates, listItems);
    equals(theList2.size(), 10);
    ok(true, "list created" );
});

test('Create List.js from existing list', function() {
    var templates = { 
        valueNames: ['id', 'name'],
        item: '<li id="itemTemplate"><span class="id">1</span><span class="name">John Resig</span></li>'
    };
    var theList3 = new List('list3', templates, listItems);
    equals(theList3.size(), 10);
    ok(true, "list created" );
});

test('Create List.js with element instead of id', function() {
    var templates = { 
        valueNames: ['id', 'name'],
        item: '<li id="itemTemplate"><span class="id">1</span><span class="name">John Resig</span></li>'
    };
    var theList3 = new List(ListJsHelpers.getByClass('list4', document.body, true), templates, listItems);
    equals(theList3.size(), 10);
    ok(true, "list created" );
});

test('Create List.js from existing list with missing markup', function() {
    var templates = { 
        valueNames: ['id', 'name']
    };
    var theListBroken = new List('list-broken', templates);
    equals(theListBroken.size(), 3);
    deepEqual(theListBroken.get('id', 3).values(), { id: "3", name: "" });
    ok(true, "list created" );
});
test('Create List.js from existing list witb broken template', function() {
    var templates = {
        valueNames: ['id', 'name'],
        item: "itemTemplateBroken"
    };
    var brokenList = new List('list-broken-item', templates, listItems);
    equals(brokenList.size(), 10);
    ok(true, "list created" );
});
