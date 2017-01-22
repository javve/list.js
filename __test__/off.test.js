const fixture = require('./fixtures');

describe('Off', function() {

  var list;

  beforeAll(function() {
    list = fixture.list(['name', 'born'], fixture.all);
  });

  afterAll(function() {
    fixture.removeList();
  });

  describe('General', function() {
    it('should be remove added handler', function(done) {
      var updated = function(list) {
        expect(list.handlers.updated.length).toEqual(1);
        list.off('updated', updated);
        expect(list.handlers.updated.length).toEqual(0);
        done();
      };
      list.on('updated', updated);
      list.search('jonny');
    });

    it('should not remove unnamed handlers', function(done) {
      var searchComplete = function(list) {
        expect(list.handlers.searchComplete.length).toEqual(3);
        list.off('searchComplete', function() {});
        list.off('searchComplete', searchComplete);
        expect(list.handlers.searchComplete.length).toEqual(2);
        done();
      };
      list.on('searchComplete', function() {});
      list.on('searchComplete', searchComplete);
      list.on('searchComplete', function() {});
      list.search('jonny');
    });
  });
});
