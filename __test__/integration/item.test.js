const $ = require('jquery'),
  fixture = require('./fixtures'),
  isVisible = require('../utils/is-visible')

describe('Item', function () {
  var list, item

  beforeAll(function () {
    list = fixture.list(
      ['name', 'born', 'doin'],
      [
        {
          name: 'Jonny',
          born: '1986',
          doin: 'Living the dream',
        },
      ]
    )
    item = list.get('name', 'Jonny')[0]
  })

  beforeEach(function () {
    list.search()
    list.filter()
    list.show(1, 200)
  })

  afterAll(function () {
    fixture.removeList()
  })

  describe('Defaults', function () {
    it('should have all default attributes', function () {
      expect(item.found).toBe(false)
      expect(item.filtered).toBe(false)
    })

    it('should have the right elements', function () {
      expect(item.elm).toEqual($('#list li')[0])
    })

    it('should have all default methods', function () {
      expect(item.values).toBeInstanceOf(Function)
      expect(item.matching).toBeInstanceOf(Function)
    })
  })

  describe('Values()', function () {
    it('should have the right values', function () {
      expect(item.values()).toEqual({
        name: 'Jonny',
        born: '1986',
        doin: 'Living the dream',
      })
    })
    it('should be able to change one value', function () {
      expect(item.values().name).toBe('Jonny')
      item.values({ name: 'Egon' })
      expect(item.values().name).toBe('Egon')
    })
    it('should be able to change many value', function () {
      expect(item.values()).toEqual({
        name: 'Egon',
        born: '1986',
        doin: 'Living the dream',
      })
      item.values({
        name: 'Sven',
        born: '1801',
        doin: 'Is dead',
      })
      expect(item.values()).toEqual({
        name: 'Sven',
        born: '1801',
        doin: 'Is dead',
      })
    })
  })

  describe('Matching, found, filtered', function () {
    describe('Searching', function () {
      it('should not be visible, match, found or filtered', function () {
        list.search('Fredrik')
        expect(item.matching(list)).toBe(false)
        expect(item.found).toBe(false)
        expect(item.filtered).toBe(false)
        expect(isVisible(item.elm, list.list)).toBe(false)
      })
      it('should be visble, match and found but not filterd', function () {
        var result = list.search('Sven')
        expect(item.matching(list)).toBe(true)
        expect(item.found).toBe(true)
        expect(item.filtered).toBe(false)
        expect(isVisible(item.elm, list.list)).toBe(true)
      })
      it('reset: should be visible and matching but not found or filtered', function () {
        list.search()
        expect(item.matching(list)).toBe(true)
        expect(item.found).toBe(false)
        expect(item.filtered).toBe(false)
        expect(isVisible(item.elm, list.list)).toBe(true)
      })
    })
    describe('Filtering', function () {
      it('should not be visble, match, found or filtered', function () {
        list.filter(function (item) {
          return item.values().name == 'Fredrik'
        })
        expect(item.matching(list)).toBe(false)
        expect(item.found).toBe(false)
        expect(item.filtered).toBe(false)
        expect(isVisible(item.elm, list.list)).toBe(false)
      })
      it('should be visble, match and filtered but not found', function () {
        list.filter(function (item) {
          return item.values().name == 'Sven'
        })
        expect(item.matching(list)).toBe(true)
        expect(item.found).toBe(false)
        expect(item.filtered).toBe(true)
        expect(isVisible(item.elm, list.list)).toBe(true)
      })
      it('reset: should be visble and match but not filtered or found', function () {
        list.filter()
        expect(item.matching(list)).toBe(true)
        expect(item.found).toBe(false)
        expect(item.filtered).toBe(false)
        expect(isVisible(item.elm, list.list)).toBe(true)
      })
    })
  })

  fixture.removeList()
})
