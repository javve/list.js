describe('Fuzzy Search', function() {
  var list,
    itemHTML,
    pagination;

  beforeEach(function() {
    itemHTML = fixtureFuzzysearch.list(['name', 'born'])
    list = new List('list-fuzzy-search', {
      valueNames: ['name', 'born'],
      item: itemHTML
    }, fixtureFuzzysearch.all);
  });

  afterEach(function() {
    fixtureFuzzysearch.removeList();
  });

  it('should have default attribute', function() {
    expect(list.fuzzySearch).to.be.a('function');
  });

  it('should find result', function() {
    list.fuzzySearch('guybrush');
    expect(list.matchingItems.length).to.be(1);
  });

  it('should find result', function() {
    list.fuzzySearch('g thre');
    expect(list.matchingItems.length).to.be(1);
  });

  it('should find result', function() {
    list.fuzzySearch('thre');
    expect(list.matchingItems.length).to.be(4);
  });

  describe('Search field', function() {

    it('should trigger searchStart', function(done) {
      list.on('searchStart', function() {
        done();
      });
      $('#list-fuzzy-search .fuzzy-search').val('angelica');
      fireKeyup($('#list-fuzzy-search .fuzzy-search')[0]);
    });

    it('should trigger searchComplete', function(done) {
      list.on('searchComplete', function() {
        done();
      });
      $('#list-fuzzy-search .fuzzy-search').val('angelica');
      fireKeyup($('#list-fuzzy-search .fuzzy-search')[0]);
    });

  });
});
