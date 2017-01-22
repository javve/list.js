const fixture = require('./fixtures');

describe('Add, get, remove', function() {

  var list;

  beforeAll(function() {
    list = fixture.list(['name'], [ { name: "Jonny" } ]);
  });

  afterAll(function() {
    fixture.removeList();
  });

  afterEach(function() {
    list.clear();
    list.add({ name: "Jonny" });
  });

  describe('Add', function() {
    it('should add one item', function() {
      list.add({ name: 'Jonas' });
      expect(list.items.length).toEqual(2);
    });
    it('should add two items', function() {
      list.add([
        { name: 'Martina' },
        { name: 'Angelica' }
      ]);
      expect(list.items.length).toEqual(3);
    });
    it('should add async items', function(done) {
      list.add([
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},
{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'},{name:'Sven'}
      ], function() {
        expect(list.items.length).toEqual(91);
        done();
      });
    });
    it('should add async items to empty list', function(done) {
      list.clear();
      list.add([
        { name: 'Sven' }
      ], function() {
        expect(list.items.length).toEqual(1);
        done();
      });
    });
  });

  describe('Get', function() {
    it('should return array with one item', function() {
      var items = list.get('name', 'Jonny');
      expect(items[0].values().name).toEqual('Jonny');
    });
    it('should return empty array', function() {
      var items = list.get('name', 'jonny');
      expect(items.length).toBe(0);
    });
    it('should return two items', function() {
      list.add({ name: 'Jonny' });
      var items = list.get('name', 'Jonny');
      expect(items.length).toEqual(2);
      expect(items[0].values().name).toEqual('Jonny');
      expect(items[1].values().name).toEqual('Jonny');
    });
  });

  describe('Remove', function() {
    it('should remove one item', function() {
      list.add({ name: "Jonas" });
      expect(list.items.length).toEqual(2);
      var count = list.remove('name', 'Jonas');
      expect(count).toEqual(1);
      expect(list.items.length).toEqual(1);
    });
    it('should not remove anything due to case sensitivity', function() {
      var count = list.remove('name', 'jonny');
      expect(count).toBe(0);
      expect(list.items.length).toEqual(1);
    });

    it('should avoid node not found error', function() {
      var item = list.get('name', 'Jonny')[0];
      list.list.removeChild(item.elm);
      var count = list.remove('name', 'Jonny');
      expect(count).toBe(1);
      expect(list.items.length).toEqual(0);
    });

    it('should remove eight items', function() {
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Sven' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonas' });
      list.add({ name: 'Jonny' });
      list.add({ name: 'Jonny' });
      expect(list.items.length).toEqual(10);
      var count = list.remove('name', 'Jonny');
      expect(count).toEqual(8);
      expect(list.items.length).toEqual(2);
    });
  });
});
