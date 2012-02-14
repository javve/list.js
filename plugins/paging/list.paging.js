List.prototype.plugins.paging = function(list, options) {
    var pagingList;
    
    var init = function() {
        options = options || {};
        pagingList = new List(list.listContainer.id, {
            listClass: options.pagingClass || 'paging',
            item: options.pagingItem || "<li> <span class='page'></span> </li>", // Have to contain something, can't set valueName at root element
            valueNames: ['page', 'dotted'],
            searchClass: 'nosearchclass',
            sortClass: 'nosortclass'
        });
        list.on('updated', refresh);
        refresh();
    };
    
    var refresh = function() {
        var l = list.matchingItems.length,
            index = list.i,
            page = list.page,
            pages = Math.ceil(l / page),
            currentPage = Math.ceil((index / page)),
            innerWindow = options.innerWindow || 2,
            left = options.left || options.outerWindow || 0,
            right = options.right || options.outerWindow || 0,
            right = pages - right;
            activeItemClass = options.activeItemClass || 'active';
            firstItemClass = options.firstItemClass || 'first';
            lastItemClass = options.lastItemClass || 'last';

            
        pagingList.clear();
        
        for (var i = 1; i <= pages; i++) {
            var className = "";
            className = (currentPage === i) ? activeItemClass : "";
            className = className + " " + ((i === 1) ? firstItemClass : "");
            className = className + " " + ((i === pages.length) ? lastItemClass : "");
            
            //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow));
            
            if (is.number(i, left, right, currentPage, innerWindow)) {
                var pageHtml = (currentPage === i) ? (i) : "<a href='javascript:function Z(){Z=\"\"}Z()'>"+(i)+"</a>";
                var item = pagingList.add({
                    page: pageHtml,
                    dotted: false
                })[0];
                item.elm.className = className;
                addEvent(item.elm, i, page);
            } else if (is.dotted(i, left, right, currentPage, innerWindow, pagingList.size())) {
                pagingList.add({
                    page: "...",
                    dotted: true
                });
            }
        }
    };
    
    var is = {
        number: function(i, left, right, currentPage, innerWindow) {
           return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
        },
        left: function(i, left) {
            return (i <= left);
        }, 
        right: function(i, right) {
            return (i > right);
        },
        innerWindow: function(i, currentPage, innerWindow) {
            return ( i >= (currentPage - innerWindow) && i <= (currentPage + innerWindow));
        },
        dotted: function(i, left, right, currentPage, innerWindow, currentPageItem) {
            return this.dottedLeft(i, left, right, currentPage, innerWindow) 
            || (this.dottedRight(i, left, right, currentPage, innerWindow, currentPageItem));
        },
        dottedLeft: function(i, left, right, currentPage, innerWindow) {
            return ((i == (left + 1)) && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right))
        },
        dottedRight: function(i, left, right, currentPage, innerWindow, currentPageItem) {
            if (pagingList.items[currentPageItem-1].values().dotted) {
                return false 
            } else {
                return ((i == (right)) && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right))
            }
        }
    };
    
    var addEvent = function(elm, i, page) {
       ListJsHelpers.addEvent(elm, 'click', function() {
           list.show((i-1)*page + 1, page);
       });
    };
    
    init();
    return this;
};