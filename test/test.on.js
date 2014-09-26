describe('On', function() {

  var list;

  beforeEach(function() {
    list = fixture.list(['name', 'born'], fixture.all);
  });

  afterEach(function() {
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

  describe('Multiple handlers', function() {
    it('should be trigger both handlers', function(done) {
      var done1 = false,
        done2 = false,
        isDone = function() {
          if (done1 && done2) {
            done();
          }
        };

      list.on('updated', function(list) {
        done1 = true;
        isDone();
      });
      list.on('updated', function(list) {
        done2 = true;
        isDone();
      });
      list.search('jonny');
    });
  });

  describe('Search', function() {
    it('should be triggered before and after search', function(done) {
      var done1 = false;
      list.on('searchStart', function(list) {
        done1 = true;
      });
      list.on('searchComplete', function(list) {
        if (done1) {
          done();
        }
      });
      list.search('jonny');
    });
  });

  describe('Sort', function() {
    it('should be triggered before and after sort', function(done) {
      var done1 = false;
      list.on('sortStart', function(list) {
        done1 = true;
      });
      list.on('sortComplete', function(list) {
        if (done1) {
          done();
        }
      });
      list.sort('name');
    });
  });

  describe('Filter', function() {
    it('should be triggered before and after filter', function(done) {
      var done1 = false;
      list.on('filterStart', function(list) {
        done1 = true;
      });
      list.on('filterComplete', function(list) {
        if (done1) {
          done();
        }
      });
      list.filter(function() {
        return true;
      });
    });
  });
});
