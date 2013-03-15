describe('Search', function() {

    var list, jonny, martina, angelica, sebastian, imma, hasse;

    before(function() {
        list = fixture.list(['name', 'born'], fixture.all);
    });

    after(function() {
        fixture.removeList();
    });

    describe('Updated', function() {
        it('should be triggered after search', function(done) {
            list.on('updated', function(list) {
                done();
            });
            list.search('jonny');
        });
        it('should be triggered after sort', function(done) {
            list.on('updated', function(list) {
                done();
            });
            list.sort('name');
        });
        it('should be triggered after filter', function(done) {
            list.on('updated', function(list) {
                done();
            });
            list.filter(function() {
                return true;
            });
        });
        it('should be triggered after show', function(done) {
            list.on('updated', function(list) {
                done();
            });
            list.show(1,10);
        });

        it('should be triggered after add', function(done) {
            list.on('updated', function(list) {
                done();
            });
            list.add({ name: 'Hej' });
        });
        it('should be triggered after remove', function(done) {
            list.on('updated', function(list) {
                done();
            });
            list.remove('name', 'Jonny');
        });
    });
});