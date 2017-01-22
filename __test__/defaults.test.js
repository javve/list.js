const $ = require('jquery'),
  fixture = require('./fixtures');

describe('Defaults', function() {
  var list;

  beforeAll(function() {
    list = fixture.list(['name'], [ { name: 'Jonny' }]);
  });

  afterAll(function() {
    fixture.removeList();
  });

  it('should have all default attributes', function() {
    expect(list.items).toBeInstanceOf(Array);
    expect(list.visibleItems).toBeInstanceOf(Array);
    expect(list.matchingItems).toBeInstanceOf(Array);

    expect(list.handlers.updated).toBeInstanceOf(Array);
    expect(list.handlers.searchStart).toBeInstanceOf(Array);
    expect(list.handlers.searchComplete).toBeInstanceOf(Array);
    expect(list.handlers.sortStart).toBeInstanceOf(Array);
    expect(list.handlers.sortComplete).toBeInstanceOf(Array);
    expect(list.handlers.filterStart).toBeInstanceOf(Array);
    expect(list.handlers.filterComplete).toBeInstanceOf(Array);

    expect(list.searched).toBe(false);
    expect(list.filtered).toBe(false);
    expect(list.i).toEqual(1);
    expect(list.page).toEqual(10000);
    expect(list.listClass).toEqual('list');
    expect(list.sortClass).toEqual('sort');
    expect(list.searchClass).toEqual('search');
  });

  it('should have the right elements', function() {
    expect(list.list).toEqual($('.list')[0]);
    expect(list.listContainer).toEqual($('#list')[0]);
  });

  it('should have all default methods', function() {
    expect(list.add).toBeInstanceOf(Function);
    expect(list.remove).toBeInstanceOf(Function);
    expect(list.get).toBeInstanceOf(Function);
    expect(list.sort).toBeInstanceOf(Function);
    expect(list.search).toBeInstanceOf(Function);
    expect(list.clear).toBeInstanceOf(Function);
    expect(list.filter).toBeInstanceOf(Function);
    expect(list.size).toBeInstanceOf(Function);
    expect(list.show).toBeInstanceOf(Function);
    expect(list.update).toBeInstanceOf(Function);
    expect(list.on).toBeInstanceOf(Function);
  });

  it('should have all helper methods', function() {
    expect(list.utils.classes).toBeInstanceOf(Function);
    expect(list.utils.getAttribute).toBeInstanceOf(Function);
    expect(list.utils.getByClass).toBeInstanceOf(Function);
    expect(list.utils.naturalSort).toBeInstanceOf(Function);
    expect(list.utils.events.bind).toBeInstanceOf(Function);
    expect(list.utils.events.unbind).toBeInstanceOf(Function);
    expect(list.utils.extend).toBeInstanceOf(Function);
    expect(list.utils.indexOf).toBeInstanceOf(Function);
    expect(list.utils.toString).toBeInstanceOf(Function);
  });
});
