const fixture = require('./fixtures');

describe('Filter', function() {

  var list, jonny, martina, angelica, sebastian, imma, hasse;

  beforeAll(function() {
    list = fixture.list(['name', 'born'], fixture.all);
    jonny = list.get('name', 'Jonny Strömberg')[0];
    martina = list.get('name', 'Martina Elm')[0];
    angelica = list.get('name', 'Angelica Abraham')[0];
    sebastian = list.get('name', 'Sebastian Höglund')[0];
    imma = list.get('name', 'Imma Grafström')[0];
    hasse = list.get('name', 'Hasse Strömberg')[0];
  });

  afterAll(function() {
    fixture.removeList();
  });

  afterEach(function() {
    list.filter();
    list.show(1, 200);
  });

  describe('Basics', function() {
    it('should return everyone born after 1988', function() {
      var result = list.filter(function(item) {
        return (item.values().born > 1988);
      });
      expect(result.length).toEqual(1);
      expect(result[0]).toEqual(sebastian);
    });
    it('should return everyone born 1986', function() {
      var result = list.filter(function(item) {
        return (item.values().born == 1986);
      });
      expect(result.length).toEqual(3);
      for (var i = 0; i < result.length; i++) {
        expect(result[i].values().born).toEqual('1986');
      }
    });
  });

  describe('Show and pages', function() {
    it('should return the visible items', function() {
      list.show(1,2);
      var result = list.filter(function(item) {
        return (item.values().born > 1985);
      });
      expect(result).toEqual(list.visibleItems);
    });

    it('should return be 2 visible items and 3 matching', function() {
      list.show(1,2);
      var result = list.filter(function(item) {
        return (item.values().born > 1985);
      });
      expect(result.length).toEqual(2);
      expect(list.visibleItems.length).toEqual(2);
      expect(list.matchingItems.length).toEqual(4);
    });

    describe('Specific items', function() {
      beforeEach(function() {
        list.show(1,2);
        var result = list.filter(function(item) {
          return (item.values().born > 1985);
        });
      });
      it('should match jonny', function() {
        expect(jonny.matching()).toBe(true);
        expect(jonny.filtered).toBe(true);
        expect(jonny.visible()).toBe(true);
      });
      it('should match martina', function() {
        expect(martina.matching()).toBe(true);
        expect(martina.filtered).toBe(true);
        expect(martina.visible()).toBe(true);
      });
      it('should match but not show angelica', function() {
        expect(angelica.matching()).toBe(true);
        expect(angelica.filtered).toBe(true);
        expect(angelica.visible()).toBe(false);
      });
      it('should match but not show sebastian', function() {
        expect(sebastian.matching()).toBe(true);
        expect(sebastian.filtered).toBe(true);
        expect(sebastian.visible()).toBe(false);
      });
      it('should not match imma', function() {
        expect(imma.matching()).toBe(false);
        expect(imma.filtered).toBe(false);
        expect(imma.visible()).toBe(false);
      });
      it('should not match hasse', function() {
        expect(hasse.matching()).toBe(false);
        expect(hasse.filtered).toBe(false);
        expect(hasse.visible()).toBe(false);
      });
    });
  });
});
