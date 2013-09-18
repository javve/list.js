describe('Defaults', function() {
    var list;

    before(function() {
        list = fixture.list(['name'], [ { name: 'Jonny' }]);
    });

    after(function() {
        fixture.removeList();
    });

    it('should have all default attributes', function() {
        expect(list.items).to.be.an('array');
        expect(list.visibleItems).to.be.an('array');
        expect(list.matchingItems).to.be.an('array');

        expect(list.handlers).to.deep.equal({ updated: [],
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
        expect(list.listClass).to.equal('list');
        expect(list.sortClass).to.equal('sort');
        expect(list.searchClass).to.equal('search');
        expect(list.page).to.equal(200);
    });

    it('should have the right elements', function() {
        expect(list.list).to.equal($('.list')[0]);
        expect(list.listContainer).to.equal($('#list')[0]);
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
});