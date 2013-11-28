describe('Create', function() {

    describe('With HTML items', function() {
        var listEl = $('<div id="list">\
            <ul class="list">\
                <li><span class="name">Jonny</span></li>\
            </ul>\
        </div>');

        $(document.body).append(listEl);

        var list = new List('list', { valueNames: ['name'] });

        it('should contain one item', function() {
            expect(list.items.length).to.equal(1);
            expect(listEl.find('li').size()).to.equal(1);
        });

        it('should contain two items', function() {
            list.add({ name: 'Jonas' });
            expect(list.items.length).to.equal(2);
            expect(listEl.find('li').size()).to.equal(2);
        });

        listEl.remove();
    });

    describe('Without items and with string template', function() {
        var listEl = $('<div id="list">\
            <ul class="list"></ul>\
        </div>');

        $(document.body).append(listEl);

        var list = new List('list', {
            valueNames: ['name'],
            item: '<li><span class="name"></span></li>'
        }, [
            { name: 'Jonny' }
        ]);

        it('should contain one item', function() {
            expect(list.items.length).to.equal(1);
            expect(listEl.find('li').size()).to.equal(1);
        });

        it('should contain two items', function() {
            list.add({ name: 'Jonas' });
            expect(list.items.length).to.equal(2);
            expect(listEl.find('li').size()).to.equal(2);
        });

        listEl.remove();
    });

    describe('Without items and with HTML template', function() {
        var listEl = $('<div id="list">\
            <ul class="list"></ul>\
        </div>');

        var templateEl = $('<li id="template-item"><span class="name"></span></li>');

        $(document.body).append(listEl);
        $(document.body).append(templateEl);

        var list = new List('list', {
            valueNames: ['name'],
            item: 'template-item'
        }, [
            { name: 'Jonny' }
        ]);

        it('should contain one item', function() {
            expect(list.items.length).to.equal(1);
            expect(listEl.find('li').size()).to.equal(1);
        });

        it('should contain two items', function() {
            list.add({ name: 'Jonas' });
            expect(list.items.length).to.equal(2);
            expect(listEl.find('li').size()).to.equal(2);
        });

        listEl.remove();
        templateEl.remove();
    });


});