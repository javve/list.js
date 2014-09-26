describe('Item', function() {

  var list, item;

  before(function() {
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

  after(function() {
    fixture.removeList();
  });

  describe('Defaults', function() {
    it('should have all default attributes', function() {
      expect(item.found).to.be(false);
      expect(item.filtered).to.be(false);
    });

    it('should have the right elements', function() {
      expect(item.elm).to.equal($('#list li')[0]);
    });

    it('should have all default methods', function() {
      expect(item.hide).to.be.a('function');
      expect(item.show).to.be.a('function');
      expect(item.values).to.be.a('function');
      expect(item.matching).to.be.a('function');
      expect(item.visible).to.be.a('function');
    });
  });

  describe('Values()', function() {
    it('should have the right values', function() {
      expect(item.values()).to.eql({
        name: 'Jonny',
        born: '1986',
        doin: 'Living the dream'
      });
    });
    it('should be able to change one value', function() {
      expect(item.values().name).to.be.equal('Jonny');
      item.values({ name: 'Egon' });
      expect(item.values().name).to.be.equal('Egon');
    });
    it('should be able to change many value', function() {
      expect(item.values()).to.eql({
        name: 'Egon',
        born: '1986',
        doin: 'Living the dream'
      });
      item.values({
        name: 'Sven',
        born: '1801',
        doin: 'Is dead'
      });
      expect(item.values()).to.eql({
        name: 'Sven',
        born: '1801',
        doin: 'Is dead'
      });
    });
  });

  describe('Hide, show, visible', function() {
    it('should be hidden', function() {
      expect($('#list li').size()).to.equal(1);
      item.hide();
      expect(item.visible()).to.be(false);
      expect($('#list li').size()).to.equal(0);
    });
    it('should be visible', function() {
      item.hide();
      expect($('#list li').size()).to.equal(0);
      item.show();
      expect(item.visible()).to.be(true);
      expect($('#list li').size()).to.equal(1);
    });
  });

  describe('Matching, found, filtered', function() {
    describe('Searching', function() {
      it('should not be visible, match, found or filtered', function() {
        list.search('Fredrik');
        expect(item.matching()).to.be(false);
        expect(item.found).to.be(false);
        expect(item.filtered).to.be(false);
        expect(item.visible()).to.be(false);
      });
      it('should be visble, match and found but not filterd', function() {
        var result = list.search('Sven');
        expect(item.matching()).to.be(true);
        expect(item.found).to.be(true);
        expect(item.filtered).to.be(false);
        expect(item.visible()).to.be(true);
      });
      it('reset: should be visible and matching but not found or filtered', function() {
        list.search();
        expect(item.matching()).to.be(true);
        expect(item.found).to.be(false);
        expect(item.filtered).to.be(false);
        expect(item.visible()).to.be(true);
      });
    });
    describe('Filtering', function() {
      it('should not be visble, match, found or filtered', function() {
        list.filter(function(item) {
          return (item.values().name == "Fredrik");
        });
        expect(item.matching()).to.be(false);
        expect(item.found).to.be(false);
        expect(item.filtered).to.be(false);
        expect(item.visible()).to.be(false);
      });
      it('should be visble, match and filtered but not found', function() {
        list.filter(function(item) {
          return (item.values().name == "Sven");
        });
        expect(item.matching()).to.be(true);
        expect(item.found).to.be(false);
        expect(item.filtered).to.be(true);
        expect(item.visible()).to.be(true);
      });
      it('reset: should be visble and match but not filtered or found', function() {
        list.filter();
        expect(item.matching()).to.be(true);
        expect(item.found).to.be(false);
        expect(item.filtered).to.be(false);
        expect(item.visible()).to.be(true);
      });
    });
  });

  fixture.removeList();
});
