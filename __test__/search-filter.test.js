const fixture = require('./fixtures');

describe('Search and filter', function() {

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
    list.search();
    list.filter();
  });

  describe('Search with filter', function() {
    it('should find everyone born 1986', function() {
      list.filter(function(item) {
        return (item.values().born == '1986');
      });
      expect(list.matchingItems.length).toEqual(3);
      expect(jonny.matching()).toBe(true);
      expect(martina.matching()).toBe(true);
      expect(angelica.matching()).toBe(true);
      expect(sebastian.matching()).toBe(false);
      expect(imma.matching()).toBe(false);
      expect(hasse.matching()).toBe(false);
    });
    it('should find everyone born 1986 and containes "ö"', function() {
      list.filter(function(item) {
        return (item.values().born == '1986');
      });
      list.search('ö');
      expect(list.matchingItems.length).toEqual(1);
      expect(jonny.matching()).toBe(true);
      expect(martina.matching()).toBe(false);
      expect(angelica.matching()).toBe(false);
      expect(sebastian.matching()).toBe(false);
      expect(imma.matching()).toBe(false);
      expect(hasse.matching()).toBe(false);
    });
    it('should find everyone with a "ö"', function() {
      list.filter(function(item) {
        return (item.values().born == '1986');
      });
      list.search('ö');
      list.filter();
      expect(list.matchingItems.length).toEqual(4);
      expect(jonny.matching()).toBe(true);
      expect(martina.matching()).toBe(false);
      expect(angelica.matching()).toBe(false);
      expect(sebastian.matching()).toBe(true);
      expect(imma.matching()).toBe(true);
      expect(hasse.matching()).toBe(true);
    });
  });
});
