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

    expect(list.handlers.updated).to.be.an('array');
    expect(list.handlers.searchStart).to.be.an('array');
    expect(list.handlers.searchComplete).to.be.an('array');
    expect(list.handlers.sortStart).to.be.an('array');
    expect(list.handlers.sortComplete).to.be.an('array');
    expect(list.handlers.filterStart).to.be.an('array');
    expect(list.handlers.filterComplete).to.be.an('array');

    expect(list.searched).to.be(false);
    expect(list.filtered).to.be(false);
    expect(list.i).to.equal(1);
    expect(list.page).to.equal(10000);
    expect(list.listClass).to.equal('list');
    expect(list.sortClass).to.equal('sort');
    expect(list.searchClass).to.equal('search');
  });

  it('should have the right elements', function() {
    expect(list.list).to.equal($('.list')[0]);
    expect(list.listContainer).to.equal($('#list')[0]);
  });

  it('should have all default methods', function() {
    expect(list.add).to.be.a('function');
    expect(list.remove).to.be.a('function');
    expect(list.get).to.be.a('function');
    expect(list.sort).to.be.a('function');
    expect(list.search).to.be.a('function');
    expect(list.clear).to.be.a('function');
    expect(list.filter).to.be.a('function');
    expect(list.size).to.be.a('function');
    expect(list.show).to.be.a('function');
    expect(list.update).to.be.a('function');
    expect(list.on).to.be.a('function');
  });

  it('should have all helper methods', function() {
    expect(list.utils.classes).to.be.a('function');
    expect(list.utils.getAttribute).to.be.a('function');
    expect(list.utils.getByClass).to.be.a('function');
    expect(list.utils.naturalSort).to.be.a('function');
    expect(list.utils.events.bind).to.be.a('function');
    expect(list.utils.events.unbind).to.be.a('function');
    expect(list.utils.extend).to.be.a('function');
    expect(list.utils.indexOf).to.be.a('function');
    expect(list.utils.toString).to.be.a('function');
  });
});
