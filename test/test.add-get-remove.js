describe('Add, get, remove', function() {

    var listEl = $('<div id="list">\
        <ul class="list">\
            <li><span class="name">Jonny</span></li>\
        </ul>\
    </div>');

    $(document.body).append(listEl);

    var list = new List('list', { valueNames: ['name'] });

    describe('Add', function() {
        it('should add one item', function() {
            list.add({ name: 'Jonas' });
            expect(list.items.length).to.equal(2);
        });
        it('should add two items', function() {
            list.add([
                { name: 'Martina' },
                { name: 'Angelica' }
            ]);
            expect(list.items.length).to.equal(4);
        });
    });

    describe('Get', function() {
        it('should return one item', function() {
            var item = list.get('name', 'Jonny');
            expect(item.values().name).to.equal('Jonny');
        });
        it('should return null', function() {
            var item = list.get('name', 'jonny');
            expect(item).to.be.null;
        });
        it('should return two items', function() {
            list.add({ name: 'Jonny' });
            var items = list.get('name', 'Jonny');
            expect(items.length).to.equal(2);
            expect(items[0].values().name).to.equal('Jonny');
            expect(items[1].values().name).to.equal('Jonny');
        });
    });

    describe('Remove', function() {
        it('should remove one item', function() {
            expect(list.items.length).to.equal(5);
            var count = list.remove('name', 'Jonas');
            expect(count).to.equal(1);
            expect(list.items.length).to.equal(4);
        });
        it('should not remove anything', function() {
            var count = list.remove('name', 'jonny');
            expect(count).to.be.equal(0);
        });
        it('should remove two items', function() {
            var count = list.remove('name', 'Jonny');
            expect(count).to.equal(2);
            expect(list.items.length).to.equal(2);
        });
    });

    listEl.remove();
});