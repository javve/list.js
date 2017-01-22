const $ = require('jquery'),
  fixture = require('./fixtures');

describe('Item', function() {

  var list, item;

  beforeAll(function() {
    list = fixture.list(['name', 'born', 'doin'], [{
      name: "Jonny",
      born: "1986",
      doin: "Living the dream"
    }]);
    item = list.get('name', 'Jonny')[0];
  });


  beforeEach(function() {
    list.search();
    list.filter();
    list.show(1,200);
  });

  afterAll(function() {
    fixture.removeList();
  });

  describe('Defaults', function() {
    it('should have all default attributes', function() {
      expect(item.found).toBe(false);
      expect(item.filtered).toBe(false);
    });

    it('should have the right elements', function() {
      expect(item.elm).toEqual($('#list li')[0]);
    });

    it('should have all default methods', function() {
      expect(item.hide).toBeInstanceOf(Function);
      expect(item.show).toBeInstanceOf(Function);
      expect(item.values).toBeInstanceOf(Function);
      expect(item.matching).toBeInstanceOf(Function);
      expect(item.visible).toBeInstanceOf(Function);
    });
  });

  describe('Values()', function() {
    it('should have the right values', function() {
      expect(item.values()).toEqual({
        name: 'Jonny',
        born: '1986',
        doin: 'Living the dream'
      });
    });
    it('should be able to change one value', function() {
      expect(item.values().name).toBe('Jonny');
      item.values({ name: 'Egon' });
      expect(item.values().name).toBe('Egon');
    });
    it('should be able to change many value', function() {
      expect(item.values()).toEqual({
        name: 'Egon',
        born: '1986',
        doin: 'Living the dream'
      });
      item.values({
        name: 'Sven',
        born: '1801',
        doin: 'Is dead'
      });
      expect(item.values()).toEqual({
        name: 'Sven',
        born: '1801',
        doin: 'Is dead'
      });
    });
  });

  describe('Hide, show, visible', function() {
    it('should be hidden', function() {
      expect($('#list li').size()).toEqual(1);
      item.hide();
      expect(item.visible()).toBe(false);
      expect($('#list li').size()).toEqual(0);
    });
    it('should be visible', function() {
      item.hide();
      expect($('#list li').size()).toEqual(0);
      item.show();
      expect(item.visible()).toBe(true);
      expect($('#list li').size()).toEqual(1);
    });
  });

  describe('Matching, found, filtered', function() {
    describe('Searching', function() {
      it('should not be visible, match, found or filtered', function() {
        list.search('Fredrik');
        expect(item.matching()).toBe(false);
        expect(item.found).toBe(false);
        expect(item.filtered).toBe(false);
        expect(item.visible()).toBe(false);
      });
      it('should be visble, match and found but not filterd', function() {
        var result = list.search('Sven');
        expect(item.matching()).toBe(true);
        expect(item.found).toBe(true);
        expect(item.filtered).toBe(false);
        expect(item.visible()).toBe(true);
      });
      it('reset: should be visible and matching but not found or filtered', function() {
        list.search();
        expect(item.matching()).toBe(true);
        expect(item.found).toBe(false);
        expect(item.filtered).toBe(false);
        expect(item.visible()).toBe(true);
      });
    });
    describe('Filtering', function() {
      it('should not be visble, match, found or filtered', function() {
        list.filter(function(item) {
          return (item.values().name == "Fredrik");
        });
        expect(item.matching()).toBe(false);
        expect(item.found).toBe(false);
        expect(item.filtered).toBe(false);
        expect(item.visible()).toBe(false);
      });
      it('should be visble, match and filtered but not found', function() {
        list.filter(function(item) {
          return (item.values().name == "Sven");
        });
        expect(item.matching()).toBe(true);
        expect(item.found).toBe(false);
        expect(item.filtered).toBe(true);
        expect(item.visible()).toBe(true);
      });
      it('reset: should be visble and match but not filtered or found', function() {
        list.filter();
        expect(item.matching()).toBe(true);
        expect(item.found).toBe(false);
        expect(item.filtered).toBe(false);
        expect(item.visible()).toBe(true);
      });
    });
  });

  fixture.removeList();
});
