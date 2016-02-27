describe('Search', function() {

  var list, jonny, martina, angelica, sebastian, imma, hasse;

  beforeEach(function() {
    list = fixture.list(['name', 'born'], fixture.all);

    jonny = list.get('name', 'Jonny Strömberg')[0];
    martina = list.get('name', 'Martina Elm')[0];
    angelica = list.get('name', 'Angelica Abraham')[0];
    sebastian = list.get('name', 'Sebastian Höglund')[0];
    imma = list.get('name', 'Imma Grafström')[0];
    hasse = list.get('name', 'Hasse Strömberg')[0];
  });

  afterEach(function() {
    fixture.removeList();
  });

  describe('Case-sensitive', function() {
    it('should not be case-sensitive', function() {
      var result = list.search('jonny');
      expect(result.length).to.equal(1);
      expect(result[0]).to.eql(jonny);
    });
  });

  describe('Number of results', function() {
    it('should find jonny, martina, angelice', function() {
      var result = list.search('1986');
      expect(result.length).to.equal(3); // 3!!
      expect(jonny.matching()).to.be(true);
      expect(martina.matching()).to.be(true);
      expect(angelica.matching()).to.be(true);
      expect(sebastian.matching()).to.be(false);
      expect(imma.matching()).to.be(false);
      expect(hasse.matching()).to.be(false);
    });
    it('should find all with utf-8 char ö', function() {
      var result = list.search('ö');
      expect(result.length).to.equal(4); // 4!!
      expect(jonny.matching()).to.be(true);
      expect(martina.matching()).to.be(false);
      expect(angelica.matching()).to.be(false);
      expect(sebastian.matching()).to.be(true);
      expect(imma.matching()).to.be(true);
      expect(hasse.matching()).to.be(true);
    });
    it('should not break with weird searches', function() {
      expect(list.search).withArgs(undefined).to.not.throwException();
      expect(list.search).withArgs(null).to.not.throwException();
      expect(list.search).withArgs(0).to.not.throwException();
      expect(list.search).withArgs(function() {}).to.not.throwException();
      expect(list.search).withArgs({ foo: "bar" }).to.not.throwException();
    });
    it('should not break with weird values', function() {
      jonny.values({ name: undefined });
      martina.values({ name: null });
      angelica.values({ name: 0 });
      sebastian.values({ name: function() {} });
      imma.values({ name: { foo: "bar" } });

      expect(list.search).withArgs("jonny").to.not.throwException();
      expect(list.search).withArgs(undefined).to.not.throwException();
      expect(list.search).withArgs(null).to.not.throwException();
      expect(list.search).withArgs(0).to.not.throwException();
      expect(list.search).withArgs(function() {}).to.not.throwException();
      expect(list.search).withArgs({ foo: "bar" }).to.not.throwException();
    });
  });


  describe('Default search columns', function() {
    it('should find in the default match column', function() {
      list.searchColumns = ['name'];
      var result = list.search('jonny');
      expect(result.length).to.equal(1);
      expect(result[0]).to.eql(jonny);
    });
    it('should not find in the default match column', function() {
      list.searchColumns = ['born'];
      var result = list.search('jonny');
      expect(result.length).to.equal(0);
    });
  });


  describe('Specfic columns', function() {
    it('should find match in column', function() {
      var result = list.search('jonny', [ 'name' ]);
      expect(result.length).to.equal(1);
      expect(result[0]).to.eql(jonny);
    });
    it('should not find match in column', function() {
      var result = list.search('jonny', [ 'born' ]);
      expect(result.length).to.equal(0);
    });
    it('should find match in column', function() {
      var result = list.search('jonny', [ 'name' ]);
      expect(result.length).to.equal(1);
      expect(result[0]).to.eql(jonny);
    });
    it('should not find match in column', function() {
      var result = list.search('jonny', [ 'born' ]);
      expect(result.length).to.equal(0);
    });
    it('should work with columns that does not exist', function() {
      var result = list.search('jonny', [ 'pet' ]);
      expect(result.length).to.equal(0);
    });
  });

  describe('Custom search function', function() {
    var customSearchFunction = function(searchString, columns) {
      for (var k = 0, kl = list.items.length; k < kl; k++) {
        if (list.items[k].values().born > 1985) {
          list.items[k].found = true;
        }
      }
    };
    it('should use custom function in third argument', function() {
      var result = list.search('jonny', [ 'name' ], customSearchFunction);
      expect(result.length).to.equal(4);
    });
    it('should use custom function in second argument', function() {
      var result = list.search('jonny', customSearchFunction);
      expect(result.length).to.equal(4);
    });
  });
  //
  // describe('Special characters', function() {
  //   it('should escape and handle special characters', function() {
  //     list.add([
  //       { name: 'Jonny&Jabba' },
  //       { name: '<Leia' },
  //       { name: '>Luke' },
  //       { name: '"Chewie"' },
  //       { name: "'Ewok'" }
  //     ]);
  //     var result = list.search('Leia');
  //     console.log(result);
  //     expect(result.length).to.equal(1);
  //     var result = list.search('<');
  //     console.log(result);
  //     expect(result.length).to.equal(1);
  //   });
  // });
});
