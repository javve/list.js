describe('Off', function() {

  var list;

  before(function() {
    list = fixture.list(['name', 'born'], fixture.all);
  });

  after(function() {
    fixture.removeList();
  });

  describe('General', function() {
    it('should be remove added handler', function(done) {
      var updated = function(list) {
        expect(list.handlers.updated.length).to.equal(1);
        list.off('updated', updated);
        expect(list.handlers.updated.length).to.equal(0);
        done();
      };
      list.on('updated', updated);
      list.search('jonny');
    });

    it('should not remove unnamed handlers', function(done) {
      var searchComplete = function(list) {
        expect(list.handlers.searchComplete.length).to.equal(3);
        list.off('searchComplete', function() {});
        list.off('searchComplete', searchComplete);
        expect(list.handlers.searchComplete.length).to.equal(2);
        done();
      };
      list.on('searchComplete', function() {});
      list.on('searchComplete', searchComplete);
      list.on('searchComplete', function() {});
      list.search('jonny');
    });
  });
});
