const fixture = require('./fixtures');

describe('Trigger', function() {

  var list;

  beforeAll(function() {
    list = fixture.list(['name', 'born'], fixture.all);
  });

  afterAll(function() {
    fixture.removeList();
  });

  describe('General', function() {
    it('should be triggered by searchComplete', function(done) {
      list.on('searchComplete', function() {
        done();
      });
      list.trigger('searchComplete');
    });
  });
});
