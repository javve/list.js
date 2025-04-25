const $ = require('jquery')

const Item = require('../../src/item')
const templater = require('../../src/templater')

describe('item', function () {
  beforeAll(() => {
    this.templateParams = {
      template: '<div><span class="name"></span></div>',
      valueNames: ['name'],
    }
  })
  describe('init', () => {
    it('should throw error if missing template', () => {
      expect(() => {
        new Item({ name: 'Jonny' })
      }).toThrowError('missing_item_template')
    })
  })
  describe('create', () => {
    it('should create item with only values', () => {
      const template = templater.getTemplate(this.templateParams)
      const item = new Item({ name: 'Jonny' }, { template })
      expect(item._values).toEqual({ name: 'Jonny' })
      expect(item.elm).toBeUndefined()
    })
    it('should create item with values and element', () => {
      const template = templater.getTemplate(this.templateParams)
      const element = document.createElement('div')
      const item = new Item({ name: 'Jonny' }, { element, template })
      expect(item._values).toEqual({ name: 'Jonny' })
      expect(item.elm).not.toBeUndefined()
      expect(item.elm).toBe(element)
    })
  })
  describe('get', () => {
    it('should get values', () => {
      const template = templater.getTemplate(this.templateParams)
      const item = new Item({ name: 'Jonny' }, { template })
      expect(item.values()).toEqual({ name: 'Jonny' })
    })
  })
  describe('set', () => {
    it('should set values on item without element', () => {
      const template = templater.getTemplate(this.templateParams)
      const item = new Item({ name: 'Jonny' }, { template })
      item.values({ name: 'Anna' })
      expect(item.elm).toBeUndefined()
      expect(item._values.name).toEqual('Anna')
    })
    it('should set values on item with element', () => {
      const template = templater.getTemplate(this.templateParams)
      const element = $('<div><span class="name">Jonny</span></div>')[0]
      const item = new Item({ name: 'Jonny' }, { element, template })
      expect(item.elm.querySelector('span').innerHTML).toEqual('Jonny')
      item.values({ name: 'Anna' })
      expect(item._values.name).toEqual('Anna')
      expect(item.elm.querySelector('span').innerHTML).toEqual('Anna')
    })
  })
  describe('matching', () => {
    beforeAll(() => {
      const template = templater.getTemplate(this.templateParams)
      this.item = new Item({ name: 'Jonny' }, { template })
    })
    it('should handle not found or filtered', () => {
      const item = this.item
      item.found = false
      item.filtered = false
      expect(item.matching({ searched: false, filtered: false })).toEqual(true)
      expect(item.matching({ searched: true, filtered: false })).toEqual(false)
      expect(item.matching({ searched: true, filtered: false })).toEqual(false)
    })
    it('should handle found and not filtered', () => {
      const item = this.item
      item.found = true
      item.filtered = false
      expect(item.matching({ searched: false, filtered: false })).toEqual(true)
      expect(item.matching({ searched: true, filtered: false })).toEqual(true)
      expect(item.matching({ searched: true, filtered: true })).toEqual(false)
      expect(item.matching({ searched: false, filtered: true })).toEqual(false)
    })
    it('should handle not found but filtered', () => {
      const item = this.item
      item.found = false
      item.filtered = true
      expect(item.matching({ searched: false, filtered: false })).toEqual(true)
      expect(item.matching({ searched: true, filtered: false })).toEqual(false)
      expect(item.matching({ searched: true, filtered: true })).toEqual(false)
      expect(item.matching({ searched: false, filtered: true })).toEqual(true)
    })
    it('should handle both found and filtered', () => {
      const item = this.item
      item.found = true
      item.filtered = true
      expect(item.matching({ searched: false, filtered: false })).toEqual(true)
      expect(item.matching({ searched: true, filtered: false })).toEqual(true)
      expect(item.matching({ searched: true, filtered: true })).toEqual(true)
      expect(item.matching({ searched: false, filtered: true })).toEqual(true)
    })
  })
})
