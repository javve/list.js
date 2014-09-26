describe('Filter', function() {

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
    list.filter();
    list.show(1, 200);
  });

  describe('Basics', function() {
    it('should return everyone born after 1988', function() {
      var result = list.filter(function(item) {
        return (item.values().born > 1988);
      });
      expect(result.length).to.equal(1);
      expect(result[0]).to.eql(sebastian);
    });
    it('should return everyone born 1986', function() {
      var result = list.filter(function(item) {
        return (item.values().born == 1986);
      });
      expect(result.length).to.equal(3);
      for (var i = 0; i < result.length; i++) {
        expect(result[i].values().born).to.equal('1986');
      }
    });
  });

  describe('Show and pages', function() {
    it('should return the visible items', function() {
      list.show(1,2);
      var result = list.filter(function(item) {
        return (item.values().born > 1985);
      });
      expect(result).to.eql(list.visibleItems);
    });

    it('should return be 2 visible items and 3 matching', function() {
      list.show(1,2);
      var result = list.filter(function(item) {
        return (item.values().born > 1985);
      });
      expect(result.length).to.equal(2);
      expect(list.visibleItems.length).to.equal(2);
      expect(list.matchingItems.length).to.equal(4);
    });

    describe('Specific items', function() {
      beforeEach(function() {
        list.show(1,2);
        var result = list.filter(function(item) {
          return (item.values().born > 1985);
        });
      });
      it('should match jonny', function() {
        expect(jonny.matching()).to.be(true);
        expect(jonny.filtered).to.be(true);
        expect(jonny.visible()).to.be(true);
      });
      it('should match martina', function() {
        expect(martina.matching()).to.be(true);
        expect(martina.filtered).to.be(true);
        expect(martina.visible()).to.be(true);
      });
      it('should match but not show angelica', function() {
        expect(angelica.matching()).to.be(true);
        expect(angelica.filtered).to.be(true);
        expect(angelica.visible()).to.be(false);
      });
      it('should match but not show sebastian', function() {
        expect(sebastian.matching()).to.be(true);
        expect(sebastian.filtered).to.be(true);
        expect(sebastian.visible()).to.be(false);
      });
      it('should not match imma', function() {
        expect(imma.matching()).to.be(false);
        expect(imma.filtered).to.be(false);
        expect(imma.visible()).to.be(false);
      });
      it('should not match hasse', function() {
        expect(hasse.matching()).to.be(false);
        expect(hasse.filtered).to.be(false);
        expect(hasse.visible()).to.be(false);
      });
    });
  });
});
