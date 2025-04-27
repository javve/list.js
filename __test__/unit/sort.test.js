/* 
sort(items, column, options = {
  order: 'desc',
  alphabet: undefined,
  insensitive: true,
  sortFunction: undefined
})
*/

import naturalSort from 'string-natural-compare'

import Item from '../../src/item'
import sort from '../../src/sort'
import templater from '../../src/templater'

describe('sort', () => {
  beforeEach(() => {
    const template = templater.getTemplate({
      template: '<div><span class="v"></span></div>',
      valueNames: ['v'],
    })
    this.items = []
    this.setValues = (values) => {
      if (!Array.isArray(values)) values = values.split('')
      values.forEach((v) => {
        this.items.push(new Item({ v }, { template }))
      })
    }
    this.getValues = () => {
      return this.items.map((i) => i._values.v)
    }
  })
  describe('options', () => {
    it('should sort asc and case insensitive by default', () => {
      this.setValues('Babc')
      sort(this.items, 'v')
      expect(this.getValues().join('')).toEqual('aBbc')
    })
    it('should sort asc', () => {
      this.setValues('Babc')
      sort(this.items, 'v', { order: 'asc' })
      expect(this.getValues().join('')).toEqual('aBbc')
    })
    it('should sort desc', () => {
      this.setValues('Babc')
      sort(this.items, 'v', { order: 'desc' })
      expect(this.getValues().join('')).toEqual('cBba')
    })
    it('should be case sensitive', () => {
      this.setValues('Babc')
      sort(this.items, 'v', { insensitive: false })
      expect(this.getValues().join('')).toEqual('Babc')
    })
    it('should sort ÅÄÖ asc', () => {
      this.setValues('AaOoÅåÄäÖö')
      sort(this.items, 'v', { order: 'asc' })
      expect(this.getValues().join('')).toEqual('AaOoÄäÅåÖö') // Å & Ä is in wrong order
    })
    it('should sort ÅÄÖ desc', () => {
      this.setValues('AaOoÅåÄäÖö')
      sort(this.items, 'v', { order: 'desc' })
      expect(this.getValues().join('')).toEqual('ÖöÅåÄäOoAa') // Å & Ä is in wrong order
    })
    it('should use custom alphabet and sort ÅÄÖ asc', () => {
      this.setValues('AaOoÅåÄäÖö')
      sort(this.items, 'v', {
        order: 'asc',
        alphabet: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZzÅåÄäÖö',
      })
      expect(this.getValues().join('')).toEqual('AaOoÅåÄäÖö')
    })
    it('should use custom alphabet and sort ÅÄÖ desc', () => {
      this.setValues('AaOoÅåÄäÖö')
      sort(this.items, 'v', {
        order: 'desc',
        alphabet: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvXxYyZzÅåÄäÖö',
      })
      expect(this.getValues().join('')).toEqual('öÖäÄåÅoOaA')
    })
    it('should use custom sort function', () => {
      this.setValues([
        "<input value='b' />", //
        "<input value='a' />",
        "<input value='c' />",
        "<input value='z' />",
        "<input value='s' />",
        "<input value='y' />",
      ])
      sort(this.items, 'v', {
        order: 'desc',
        sortFunction: function (itemA, itemB, options = {}) {
          const column = options.valueName
          expect(column).toEqual('v')
          const tempA = document.createElement('div')
          const tempB = document.createElement('div')
          tempA.innerHTML = itemA.values()[column]
          tempB.innerHTML = itemB.values()[column]
          return naturalSort(tempA.querySelector('input').value, tempB.querySelector('input').value)
        },
      })
      expect(this.getValues()).toEqual([
        "<input value='z' />", //
        "<input value='y' />",
        "<input value='s' />",
        "<input value='c' />",
        "<input value='b' />",
        "<input value='a' />",
      ])
    })
  })
  describe('examples', () => {
    it('should sort dates', () => {
      this.setValues([
        '2008-12-10', //
        '2008-11-10',
        '2007-11-10',
        '2009-12-10',
        '2007-01-4',
        '2006-12-10',
      ])
      sort(this.items, 'v')
      expect(this.getValues()).toEqual([
        '2006-12-10', //
        '2007-01-4',
        '2007-11-10',
        '2008-11-10',
        '2008-12-10',
        '2009-12-10',
      ])
    })
    it('should sort file names (a bit wrong)', () => {
      this.setValues([
        'car.mov', //
        '01alpha.sgi',
        '001alpha.sgi',
        'my.string_41299.tif',
        '0003.zip',
        '0002.asp',
      ])
      sort(this.items, 'v')
      expect(this.getValues()).toEqual([
        '01alpha.sgi', //
        '001alpha.sgi',
        '0002.asp',
        '0003.zip',
        'car.mov',
        'my.string_41299.tif',
      ])
    })
    it('should show order of sorted floates (a bit wrong)', () => {
      this.setValues([
        '10.0401', //
        '10.022',
        '10.021999',
        '11.231',
        '0003.123',
        '09.2123',
      ])
      sort(this.items, 'v')
      expect(this.getValues()).toEqual([
        '0003.123', //
        '09.2123',
        '10.022',
        '10.0401',
        '10.021999',
        '11.231',
      ])
    })
    it('should sort IP addresses', () => {
      this.setValues([
        '192.168.1.1', //
        '192.168.0.100',
        '192.168.0.1',
        '192.168.1.3',
        '127.0.0.1',
        '192.168.1.2',
      ])
      sort(this.items, 'v')
      expect(this.getValues()).toEqual([
        '127.0.0.1', //
        '192.168.0.1',
        '192.168.0.100',
        '192.168.1.1',
        '192.168.1.2',
        '192.168.1.3',
      ])
    })
    it('should handle values from issue 387', () => {
      this.setValues([
        'Test', //
        'Test1Test2',
        'Bill-To Phone1 Extension',
        'z',
        's',
        'y',
      ])
      sort(this.items, 'v')
      expect(this.getValues()).toEqual([
        'Bill-To Phone1 Extension', //
        's',
        'Test',
        'Test1Test2',
        'y',
        'z',
      ])
    })

    it('should show how random values are sorted', () => {
      this.setValues([
        undefined, //
        '',
        null,
        'a',
        '0',
        true,
        0,
        'z',
        '!',
        '?',
        100,
        false,
      ])
      sort(this.items, 'v')
      sort(this.items, 'v', { order: 'desc' })
      sort(this.items, 'v')

      expect(this.getValues()).toEqual([
        '', //
        '!',
        '0',
        0,
        100,
        '?',
        'a',
        false,
        null,
        true,
        undefined,
        'z',
      ])
    })
  })
})
