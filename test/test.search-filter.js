describe('Search and filter', function() {

  var list, jonny, martina, angelica, sebastian, imma, hasse;

  before(function() {
    list = fixture.list(['name', 'born'], fixture.all);

    jonny = list.get('name', 'Jonny Strömberg')[0];
    martina = list.get('name', 'Martina Elm')[0];
    angelica = list.get('name', 'Angelica Abraham')[0];
    sebastian = list.get('name', 'Sebastian Höglund')[0];
    imma = list.get('name', 'Imma Grafström')[0];
    hasse = list.get('name', 'Hasse Strömberg')[0];
  });

  after(function() {
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
      expect(list.matchingItems.length).to.equal(3);
      expect(jonny.matching()).to.be(true);
      expect(martina.matching()).to.be(true);
      expect(angelica.matching()).to.be(true);
      expect(sebastian.matching()).to.be(false);
      expect(imma.matching()).to.be(false);
      expect(hasse.matching()).to.be(false);
    });
    it('should find everyone born 1986 and containes "ö"', function() {
      list.filter(function(item) {
        return (item.values().born == '1986');
      });
      list.search('ö');
      expect(list.matchingItems.length).to.equal(1);
      expect(jonny.matching()).to.be(true);
      expect(martina.matching()).to.be(false);
      expect(angelica.matching()).to.be(false);
      expect(sebastian.matching()).to.be(false);
      expect(imma.matching()).to.be(false);
      expect(hasse.matching()).to.be(false);
    });
    it('should find everyone with a "ö"', function() {
      list.filter(function(item) {
        return (item.values().born == '1986');
      });
      list.search('ö');
      list.filter();
      expect(list.matchingItems.length).to.equal(4);
      expect(jonny.matching()).to.be(true);
      expect(martina.matching()).to.be(false);
      expect(angelica.matching()).to.be(false);
      expect(sebastian.matching()).to.be(true);
      expect(imma.matching()).to.be(true);
      expect(hasse.matching()).to.be(true);
    });
  });
});
