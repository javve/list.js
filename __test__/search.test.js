const fixture = require('./fixtures')

describe('Search', function () {
  var list, jonny, martina, angelica, sebastian, imma, hasse

  beforeEach(function () {
    list = fixture.list(['name', 'born'], fixture.all)

    jonny = list.get('name', 'Jonny Strömberg')[0]
    martina = list.get('name', 'Martina Elm')[0]
    angelica = list.get('name', 'Angelica Abraham')[0]
    sebastian = list.get('name', 'Sebastian Höglund')[0]
    imma = list.get('name', 'Imma Grafström')[0]
    hasse = list.get('name', 'Hasse Strömberg')[0]
  })

  afterEach(function () {
    fixture.removeList()
  })

  describe('Case-sensitive', function () {
    it('should not be case-sensitive', function () {
      var result = list.search('jonny')
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(jonny)
    })
  })

  describe('Number of results', function () {
    it('should find jonny, martina, angelice', function () {
      var result = list.search('1986')
      expect(result.length).toEqual(3) // 3!!
      expect(jonny.matching()).toBe(true)
      expect(martina.matching()).toBe(true)
      expect(angelica.matching()).toBe(true)
      expect(sebastian.matching()).toBe(false)
      expect(imma.matching()).toBe(false)
      expect(hasse.matching()).toBe(false)
    })
    it('should find all with utf-8 char ö', function () {
      var result = list.search('ö')
      expect(result.length).toEqual(4) // 4!!
      expect(jonny.matching()).toBe(true)
      expect(martina.matching()).toBe(false)
      expect(angelica.matching()).toBe(false)
      expect(sebastian.matching()).toBe(true)
      expect(imma.matching()).toBe(true)
      expect(hasse.matching()).toBe(true)
    })
    it('should not break with weird searches', function () {
      expect(function () {
        list.search(undefined)
      }).not.toThrow()
      expect(function () {
        list.search(null)
      }).not.toThrow()
      expect(function () {
        list.search(0)
      }).not.toThrow()
      expect(function () {
        list.search(function () {})
      }).not.toThrow()
      expect(function () {
        list.search({ foo: 'bar' })
      }).not.toThrow()
    })
    it('should not break with weird values', function () {
      jonny.values({ name: undefined })
      martina.values({ name: null })
      angelica.values({ name: 0 })
      sebastian.values({ name: function () {} })
      imma.values({ name: { foo: 'bar' } })

      expect(function () {
        list.search('jonny')
      }).not.toThrow()
      expect(function () {
        list.search(undefined)
      }).not.toThrow()
      expect(function () {
        list.search(null)
      }).not.toThrow()
      expect(function () {
        list.search(0)
      }).not.toThrow()
      expect(function () {
        list.search(function () {})
      }).not.toThrow()
      expect(function () {
        list.search({ foo: 'bar' })
      }).not.toThrow()
    })
  })

  describe('Default search columns', function () {
    it('should find in the default match column', function () {
      list.searchColumns = ['name']
      var result = list.search('jonny')
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(jonny)
    })
    it('should not find in the default match column', function () {
      list.searchColumns = ['born']
      var result = list.search('jonny')
      expect(result.length).toEqual(0)
    })
  })

  describe('Specific columns', function () {
    it('should find match in column', function () {
      var result = list.search('jonny', ['name'])
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(jonny)
    })
    it('should not find match in column', function () {
      var result = list.search('jonny', ['born'])
      expect(result.length).toEqual(0)
    })
    it('should find match in column', function () {
      var result = list.search('jonny', ['name'])
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(jonny)
    })
    it('should not find match in column', function () {
      var result = list.search('jonny', ['born'])
      expect(result.length).toEqual(0)
    })
    it('should work with columns that do not exist', function () {
      var result = list.search('jonny', ['pet'])
      expect(result.length).toEqual(0)
    })
    it('should remove column option', function () {
      var result = list.search('jonny', ['born'])
      expect(result.length).toEqual(0)
      result = list.search('jonny')
      expect(result.length).toEqual(1)
    })
  })

  describe('Custom search function', function () {
    var customSearchFunction = function (searchString, columns) {
      for (var k = 0, kl = list.items.length; k < kl; k++) {
        if (list.items[k].values().born > 1985) {
          list.items[k].found = true
        }
      }
    }
    it('should use custom function in third argument', function () {
      var result = list.search('jonny', ['name'], customSearchFunction)
      expect(result.length).toEqual(4)
    })
    it('should use custom function in second argument', function () {
      var result = list.search('jonny', customSearchFunction)
      expect(result.length).toEqual(4)
    })
  })

  describe('Multiple word search', function () {
    it('should find jonny, hasse', function () {
      var result = list.search('berg str')
      expect(result.length).toEqual(2)
      expect(jonny.matching()).toBe(true)
      expect(martina.matching()).toBe(false)
      expect(angelica.matching()).toBe(false)
      expect(sebastian.matching()).toBe(false)
      expect(imma.matching()).toBe(false)
      expect(hasse.matching()).toBe(true)
    })
    it('should find martina, angelica, sebastian, hasse', function () {
      var result = list.search('a e')
      expect(result.length).toEqual(4)
      expect(jonny.matching()).toBe(false)
      expect(martina.matching()).toBe(true)
      expect(angelica.matching()).toBe(true)
      expect(sebastian.matching()).toBe(true)
      expect(imma.matching()).toBe(false)
      expect(hasse.matching()).toBe(true)
    })
    it('stripping whitespace should find martina', function () {
      var result = list.search('martina  elm ')
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(martina)
    })
  })

  describe('Quoted phrase searches', function () {
    it('should find martina', function () {
      var result = list.search('"a e"')
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(martina)
    })
    it('quoted phrase and multiple words should find jonny', function () {
      var result = list.search('" str" 1986')
      expect(result.length).toEqual(1)
      expect(result[0]).toEqual(jonny)
    })
  })

  describe('Special characters', function() {
    it('should escape and handle special characters', function() {
      list.add([
        { name: 'Jonny Jr.' },
        { name: 'Jonny&Jabba' },
        { name: '<Leia' },
        { name: '>Luke' },
        { name: '"Chewie"' },
        { name: "'Ewok'" }
      ]);
      var result = list.search('Leia');
      expect(result.length).toEqual(1);

      var result = list.search('<');
      expect(result.length).toEqual(1);

      var result = list.search('Jr.');
      expect(result.length).toEqual(1);
    });
  });
})
