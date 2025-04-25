const fixture = require('./fixtures')
const isVisible = require('../utils/is-visible')

describe('Show', function () {
  var list, a, b, c, d, e, f

  beforeAll(function () {
    list = fixture.list(
      ['id', 'id2'],
      [
        { id: '1', id2: 'a' },
        { id: '2', id2: 'a' },
        { id: '3', id2: 'b' },
        { id: '4', id2: 'b' },
        { id: '5', id2: 'bc' },
        { id: '6', id2: 'bc' },
      ]
    )
    a = list.get('id', '1')[0]
    b = list.get('id', '2')[0]
    c = list.get('id', '3')[0]
    d = list.get('id', '4')[0]
    e = list.get('id', '5')[0]
    f = list.get('id', '6')[0]
  })

  afterAll(function () {
    fixture.removeList()
  })

  afterEach(function () {
    list.filter()
    list.show(1, 200)
  })

  describe('Basics', function () {
    it('should be 1, 2', function () {
      list.show(1, 2)
      expect(list.visibleItems.length).toEqual(2)
      expect(isVisible(a.elm, list.list)).toBe(true)
      expect(isVisible(b.elm, list.list)).toBe(true)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(false)
      expect(isVisible(e.elm, list.list)).toBe(false)
      expect(isVisible(f.elm, list.list)).toBe(false)
    })
    it('should show item 6', function () {
      list.show(6, 2)
      expect(list.visibleItems.length).toEqual(1)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(false)
      expect(isVisible(e.elm, list.list)).toBe(false)
      expect(isVisible(f.elm, list.list)).toBe(true)
    })
    it('should show item 1, 2, 3, 4, 5, 6', function () {
      list.show(1, 200)
      expect(list.visibleItems.length).toEqual(6)
      expect(isVisible(a.elm, list.list)).toBe(true)
      expect(isVisible(b.elm, list.list)).toBe(true)
      expect(isVisible(c.elm, list.list)).toBe(true)
      expect(isVisible(d.elm, list.list)).toBe(true)
      expect(isVisible(e.elm, list.list)).toBe(true)
      expect(isVisible(f.elm, list.list)).toBe(true)
    })
    it('should show item 3, 4, 5', function () {
      list.show(3, 3)
      expect(list.visibleItems.length).toEqual(3)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(true)
      expect(isVisible(d.elm, list.list)).toBe(true)
      expect(isVisible(e.elm, list.list)).toBe(true)
      expect(isVisible(f.elm, list.list)).toBe(false)
    })
    it('should show item 5, 6', function () {
      list.show(5, 3)
      expect(list.visibleItems.length).toEqual(2)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(false)
      expect(isVisible(e.elm, list.list)).toBe(true)
      expect(isVisible(f.elm, list.list)).toBe(true)
    })
  })

  describe('Search', function () {
    afterEach(function () {
      list.search()
    })
    it('should show 3, 4', function () {
      list.search('b')
      list.show(1, 2)
      expect(list.visibleItems.length).toEqual(2)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(true)
      expect(isVisible(d.elm, list.list)).toBe(true)
      expect(isVisible(e.elm, list.list)).toBe(false)
      expect(isVisible(f.elm, list.list)).toBe(false)
    })
    it('should show item 3,4,5,6', function () {
      list.search('b')
      list.show(1, 4)
      expect(list.visibleItems.length).toEqual(4)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(true)
      expect(isVisible(d.elm, list.list)).toBe(true)
      expect(isVisible(e.elm, list.list)).toBe(true)
      expect(isVisible(f.elm, list.list)).toBe(true)
    })
    it('should not show any items but match two', function () {
      list.search('a')
      list.show(3, 2)
      expect(list.visibleItems.length).toEqual(0)
      expect(list.matchingItems.length).toEqual(2)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(false)
      expect(isVisible(e.elm, list.list)).toBe(false)
      expect(isVisible(f.elm, list.list)).toBe(false)
    })
  })

  describe('Filter', function () {
    afterEach(function () {
      list.filter()
    })
    it('should show 3, 4', function () {
      list.filter(function (item) {
        return item.values().id2 == 'b'
      })
      list.show(1, 2)
      expect(list.visibleItems.length).toEqual(2)
      expect(list.matchingItems.length).toEqual(2)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(true)
      expect(isVisible(d.elm, list.list)).toBe(true)
      expect(isVisible(e.elm, list.list)).toBe(false)
      expect(isVisible(f.elm, list.list)).toBe(false)
    })
    it('should show item 3,4,5,6', function () {
      list.filter(function (item) {
        return item.values().id2 == 'bc'
      })
      list.show(1, 4)
      expect(list.visibleItems.length).toEqual(2)
      expect(list.matchingItems.length).toEqual(2)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(false)
      expect(isVisible(e.elm, list.list)).toBe(true)
      expect(isVisible(f.elm, list.list)).toBe(true)
    })
    it('should not show any items but match two', function () {
      list.filter(function (item) {
        return item.values().id2 == 'b'
      })
      list.show(3, 2)
      expect(list.visibleItems.length).toEqual(0)
      expect(list.matchingItems.length).toEqual(2)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(false)
      expect(isVisible(e.elm, list.list)).toBe(false)
      expect(isVisible(f.elm, list.list)).toBe(false)
    })
  })

  describe('Filter and search', function () {
    afterEach(function () {
      list.filter()
    })
    it('should show 4, 5', function () {
      list.show(1, 2)
      list.filter(function (item) {
        return item.values().id > '3'
      })
      list.search('b')
      expect(list.visibleItems.length).toEqual(2)
      expect(list.matchingItems.length).toEqual(3)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(true)
      expect(isVisible(e.elm, list.list)).toBe(true)
      expect(isVisible(f.elm, list.list)).toBe(false)
    })
    it('should show 5, 6', function () {
      list.show(1, 2)
      list.filter(function (item) {
        return item.values().id > '3'
      })
      list.search('b')
      list.show(2, 2)
      expect(list.visibleItems.length).toEqual(2)
      expect(list.matchingItems.length).toEqual(3)
      expect(isVisible(a.elm, list.list)).toBe(false)
      expect(isVisible(b.elm, list.list)).toBe(false)
      expect(isVisible(c.elm, list.list)).toBe(false)
      expect(isVisible(d.elm, list.list)).toBe(false)
      expect(isVisible(e.elm, list.list)).toBe(true)
      expect(isVisible(f.elm, list.list)).toBe(true)
    })
  })
})
