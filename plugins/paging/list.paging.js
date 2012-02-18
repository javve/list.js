List.prototype.plugins.paging = function(list, options) {
    var pagingList;
    
    var init = function() {
        options = options || {};
        pagingList = new List(list.listContainer.id, {
            listClass: options.pagingClass || 'paging',
            item: options.pagingItem || "<li> <span class='page'></span> </li>", // Have to contain something, can't set valueName at root element
            valueNames: ['page'],
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
            activeItemClass = options.activeItemClass || 'active',
            firstItemClass = options.firstItemClass || 'first',
            previousItemClass = options.previousItemClass || 'previous',
            lastItemClass = options.lastItemClass || 'last',
            nextItemClass = options.nextItemClass || 'next',
            totalPagesShowing = options.totalPagesShowing || 10;

            
        pagingList.clear();

        // we subtract one to account for the current page
        totalPagesShowing = totalPagesShowing - 1;
        var backPagesCount = 0;
        var upcomingPagesCount = 0;
        var defaultLeftSidePageCount = Math.floor(totalPagesShowing/2);
        var defaultRightSidePageCount = Math.ceil(totalPagesShowing/2);
        var rightSideRemainder = 0;
        var leftSideRemainder = 0;

        // if the amount of pages to the right of the current page is 
        // less than the default amount for showing on either side
        // save it in a remainder we can add to the other side
        // otherwise its at least that amount and the remainder is 0
        if (pages - currentPage < defaultRightSidePageCount) {
            rightSideRemainder = defaultRightSidePageCount - (pages - currentPage);
        }

        // if the remainder from the other side with the default amount
        // for showing on either side is less than one
        // the back pages count is whatever the current page - 1 is
        // and we calculate the remainder (default minus actual) on that side as well
        if (currentPage - (rightSideRemainder + defaultLeftSidePageCount) < 1) {
            backPagesCount = currentPage - 1;
            leftSideRemainder = defaultLeftSidePageCount - backPagesCount;
        // otherwise the count on the left side is the default amount on that side plus
        // the remainder from the other side
        } else {
            backPagesCount = defaultLeftSidePageCount + rightSideRemainder;
        }

        // if we aren't on the last page, calculate the upcoming pages count
        if (currentPage < pages) {
            // if the current page, plus the remainder from the left side (if any), plus the default amount
            // is greater than the total number of pages
            // then the upcoming pages count is the difference between the max pages and current page
            if (currentPage + leftSideRemainder + defaultRightSidePageCount > pages) {
                upcomingPagesCount = pages - currentPage;
            // else the upcoming page count is the remainder from the left side plus the default amount
            } else {
                upcomingPagesCount = leftSideRemainder + defaultRightSidePageCount;
            }
        }

        // build a quick array for each side
        var backPagesArray = [];
        var forwardPagesArray = [];

        var i;
        for(i = backPagesCount; i > 0; i--)
        {
            backPagesArray.push(currentPage - i);
        }

        for (i = upcomingPagesCount; i > 0; i--) {
            forwardPagesArray.push(currentPage + i);
        }
        forwardPagesArray.reverse();

        
        if (pages > 1) {

            if(currentPage !== 1) {
                var firstItem = pagingList.add({
                    page : "<a href='javascript:function Z(){Z=\"\"}Z()'>&lt;&lt;</a>"
                })[0];
                firstItem.elm.className = firstItemClass;
                addEvent(firstItem.elm, 1, page);
                
                var previousItem = pagingList.add({
                    page : "<a href='javascript:function Z(){Z=\"\"}Z()'>&lt; Prev</a>"
                })[0];
                previousItem.elm.className = previousItemClass;
                addEvent(previousItem.elm, currentPage-1, page);
                
                for(var i = 0; i < backPagesArray.length; i++) {
                    var backItem = pagingList.add({
                        page : "<a href='javascript:function Z(){Z=\"\"}Z()'>" + backPagesArray[i] + "</a>"
                    })[0];
                    addEvent(backItem.elm, backPagesArray[i], page);
                }
            }

            var currentItem = pagingList.add({
                page : currentPage
            })[0];
            currentItem.elm.className = activeItemClass;

            if(currentPage !== pages) {
                for(var i = 0; i < forwardPagesArray.length; i++) {
                    var forwardItem = pagingList.add({
                        page : "<a href='javascript:function Z(){Z=\"\"}Z()'>" + forwardPagesArray[i] + "</a>"
                    })[0];
                    addEvent(forwardItem.elm, forwardPagesArray[i], page);
                }

                var nextItem = pagingList.add({
                    page : "<a href='javascript:function Z(){Z=\"\"}Z()'>Next &gt;</a>"
                })[0];
                nextItem.elm.className = nextItemClass;
                addEvent(nextItem.elm, currentPage + 1, page);
                
                var lastItem = pagingList.add({
                    page : "<a href='javascript:function Z(){Z=\"\"}Z()'>&gt; &gt;</a>"
                })[0];
                lastItem.elm.className = lastItemClass;
                addEvent(lastItem.elm, pages, page);
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