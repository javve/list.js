const $ = require('jquery')
const valueNamesUtils = require('../../src/utils/value-names')

describe('Utils / Value Names', () => {
  let valueNames, itemEl

  beforeEach(() => {
    valueNames = [
      'name',
      'born',
      { data: ['id'] },
      { attr: 'src', name: 'image' },
      { attr: 'href', name: 'link' },
      { attr: 'value', name: 'foo' },
      { attr: 'data-timestamp', name: 'timestamp' },
    ]
    itemEl = $(
      '<div data-id="1">' +
        '<a href="http://lol.com" class="link name">Jonny</a>' +
        '<span class="born timestamp" data-timestamp="54321">1986</span>' +
        '<img class="image" src="usage/boba.jpeg">' +
        '<input class="foo" value="Bar">' +
        '</div>'
    )[0]
  })
  describe('getDefinitionFromName', () => {
    it('should get regular class name', () => {
      expect(valueNamesUtils.getDefinitionFromName('born', valueNames)).toEqual('born')
    })
    it('should get root data attribute', () => {
      expect(valueNamesUtils.getDefinitionFromName('id', valueNames)).toEqual({ data: 'id' })
    })
    it('should get attribute', () => {
      expect(valueNamesUtils.getDefinitionFromName('link', valueNames)).toEqual({ attr: 'href', name: 'link' })
    })
    it('should get data attribute', () => {
      expect(valueNamesUtils.getDefinitionFromName('timestamp', valueNames)).toEqual({
        attr: 'data-timestamp',
        name: 'timestamp',
      })
    })
  })
  describe('set', () => {
    it('should set class', () => {
      valueNamesUtils.set(itemEl, 'born', '1337', valueNames)
      const born = itemEl.querySelector('.born').innerHTML
      expect(born).toEqual('1337')
    })
    it('should set root data attribute', () => {
      valueNamesUtils.set(itemEl, 'id', '555', valueNames)
      const id = itemEl.getAttribute('data-id')
      expect(id).toEqual('555')
    })
    it('should set attribute', () => {
      valueNamesUtils.set(itemEl, 'link', 'http://foo.se/', valueNames)
      const link = itemEl.querySelector('a').href
      expect(link).toEqual('http://foo.se/')
    })
    it('should set data attribut', () => {
      valueNamesUtils.set(itemEl, 'timestamp', 'bar-bar', valueNames)
      const timestamp = itemEl.querySelector('span').getAttribute('data-timestamp')
      expect(timestamp).toEqual('bar-bar')
    })
  })
})
