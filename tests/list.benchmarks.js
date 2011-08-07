module("List.js standard");
var theList
    , jonny = {
        id: 6
        , name: "Jonny Strömberg"
        , feature: "List.js"
    };

test('Create List.js from 10 000 existing list', function() {
    var l = 10003
        , items = ""
        , templates = { 
            valueNames: ['id', 'name', 'feature']
            , indexAsync: true
        }
        , dateObj = new Date()
        , time = dateObj.getTime()
        , time2 = 0
        , time3 = 0
        , item = '<li class="item">'
				+ '<span class="id">1</span>'
				+ '<span class="name">John Resig</span>'
				+ '<span class="feature">jQuery</span>'
			+ '</li>';
	
    for (var i = 0; i < l; i++) {
        items = items+item;
    }
    dateObj = new Date();
    time2 = dateObj.getTime();		
    
    ListJsHelpers.getByClass('list', document.getElementById('list'))[0].innerHTML = items;
    theList = new List('list', templates);
    
    dateObj = new Date();
    time3 = dateObj.getTime();
    
    ok(true, "Create objects took " + (time2-time) + " add took " + ((time3-time) + (time2-time)));
});

test('Add 10 000 items', function() {
    var l = 10000
        , values = []
        , dateObj = new Date()
        , time = dateObj.getTime()
        , time2 = 0
        , time3 = 0;
        
    for (var i = 0; i < l; i++) {
        values.push(jonny);
    }
    
    dateObj = new Date();
    time2 = dateObj.getTime();
    
    theList.addAsync(values);
    
    dateObj = new Date();
    time3 = dateObj.getTime();
    
    ok(true, "Create objects took " + (time2-time) + " add took " + ((time3-time) + (time2-time))); 
});
