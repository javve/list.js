describe('Trigger', function() {

  var list;

  before(function() {
    list = fixture.list(['name', 'born'], fixture.all);
  });

  after(function() {
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