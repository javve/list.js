describe('Defaults', function() {

    var listEl = $('<div id="list">\
        <ul class="list">\
            <li><span class="name">Jonny</span></li>\
        </ul>\
    </div>');

    $(document.body).append(listEl);

    var list = new List('list');

    it('should have all default attributes', function() {
        expect(list.items).to.be.an('array');
        expect(list.visibleItems).to.be.an('array');
        expect(list.matchingItems).to.be.an('array');

        expect(list.events).to.deep.equal({ updated: [],
            searchStart: [],
            filterStart: [],
            sortStart: [],
            searchComplete: [],
            filterComplete: [],
            sortComplete: []
        });

        expect(list.searched).to.be.false;
        expect(list.filtered).to.be.false;
        expect(list.i).to.equal(1);
        expect(list.page).to.equal(200);
    });

    it('should have the right elements', function() {
        expect(list.list).to.equal(listEl.find('.list')[0]);
        expect(list.listContainer).to.equal(listEl[0]);
    });

    it('should have all default methods', function() {
        expect(list).to.respondTo('add');
        expect(list).to.respondTo('remove');
        expect(list).to.respondTo('get');
        expect(list).to.respondTo('sort');
        expect(list).to.respondTo('search');
        expect(list).to.respondTo('clear');
        expect(list).to.respondTo('filter');
        expect(list).to.respondTo('size');
        expect(list).to.respondTo('show');
        expect(list).to.respondTo('update');
        expect(list).to.respondTo('on');
    });

    listEl.remove();
});