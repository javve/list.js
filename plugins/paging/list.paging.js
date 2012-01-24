List.prototype.plugins.paging = function(list, options) {
    var pagingList;
    
    var init = function(list, options) {
        options = options || {};
        pagingList = new List(list.listContainer.id, {
            listClass: options.pagingClass || 'paging',
            item: "<li><div class='page'></div></li>", // Have to contain something, can't set valueName at root element
            valueNames: ['page'],
            searchClass: 'nosearchclass',
            sortClass: 'nosortclass'
        });
        list.on('updated', refresh);
    };
    
    var refresh = function() {
        var l = list.matchingItems.length,
            index = list.i,
            page = list.page,
            pages = Math.ceil(l / page),
            currentPage = Math.ceil((index / page));

        pagingList.clear();
        
        for (var i = 1; i <= pages; i++) {
            var className = (currentPage === i) ? "active" : "";
            
            var item = pagingList.add({
                page: "<a class='"+className+"' href='javascript:function Z(){Z=\"\"}Z()'>"+(i)+"</a>"
            })[0];
            addEvent(item.elm, i, page);
        }
    };
    
    var addEvent = function(elm, i, page) {
       ListJsHelpers.addEvent(elm, 'click', function() {
           list.show((i-1)*page + 1, page);
       });
    };
    
    init(list, options);
};