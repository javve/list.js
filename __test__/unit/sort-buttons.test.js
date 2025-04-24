import $ from 'jquery'
import naturalSort from 'string-natural-compare'

import Item from '../../src/item'
import templater from '../../src/templater'

import {
  addSortListeners,
  getInSensitive,
  getNextSortOrder,
  setSortOrder,
  clearSortOrder,
} from '../../src/sort-buttons'

describe('sort listeners', () => {
  describe('getInSensitive', () => {
    it('should be false if data-insensitive is false', () => {
      const button = $(`<button data-insensitive="false">`)[0]
      expect(getInSensitive(button)).toEqual(false)
    })
    it('should be true if data-insensitive is trye', () => {
      const button = $(`<button data-insensitive="true">`)[0]
      expect(getInSensitive(button)).toEqual(true)
    })
    it('should be true by default', () => {
      const button = $(`<button>`)[0]
      expect(getInSensitive(button)).toEqual(true)
    })
  })
  describe('getNextSortOrder', () => {
    it('should be asc by default', () => {
      const button = $(`<button>`)[0]
      expect(getNextSortOrder(button)).toEqual('asc')
    })
    it('should return asc if desc was set before', () => {
      const button = $(`<button class="desc">`)[0]
      expect(getNextSortOrder(button)).toEqual('asc')
    })
    it('should return desc if asc was set before', () => {
      const button = $(`<button class="asc">`)[0]
      expect(getNextSortOrder(button)).toEqual('desc')
    })
    it('should use predefined asc order if set', () => {
      const button = $(`<button data-order="asc">`)[0]
      expect(getNextSortOrder(button)).toEqual('asc')
    })
    it('should use predefined desc if set', () => {
      const button = $(`<button data-order="desc">`)[0]
      expect(getNextSortOrder(button)).toEqual('desc')
    })
  })
  describe('setSortOrder', () => {
    it('should set toggle between orders', () => {
      const buttonName = $(`<button data-sort="name">`)[0]
      const buttonAge = $(`<button data-sort="age">`)[0]
      const buttons = [buttonName, buttonAge]

      setSortOrder(buttons, 'name', 'asc')
      expect(buttonName.classList.contains('asc')).toEqual(true)
      expect(buttonName.classList.contains('desc')).toEqual(false)
      expect(buttonAge.classList.contains('asc')).toEqual(false)
      expect(buttonAge.classList.contains('desc')).toEqual(false)

      setSortOrder(buttons, 'name', 'desc')
      expect(buttonName.classList.contains('asc')).toEqual(false)
      expect(buttonName.classList.contains('desc')).toEqual(true)
      expect(buttonAge.classList.contains('asc')).toEqual(false)
      expect(buttonAge.classList.contains('desc')).toEqual(false)
    })
    it('should respect predefined order', () => {
      const buttonName = $(`<button data-sort="name" data-order="asc">`)[0]
      const buttonAge = $(`<button data-sort="age">`)[0]
      const buttons = [buttonName, buttonAge]

      setSortOrder(buttons, 'name', 'asc')
      expect(buttonName.classList.contains('asc')).toEqual(true)
      expect(buttonName.classList.contains('desc')).toEqual(false)
      expect(buttonAge.classList.contains('asc')).toEqual(false)
      expect(buttonAge.classList.contains('desc')).toEqual(false)

      setSortOrder(buttons, 'name', 'desc')
      expect(buttonName.classList.contains('asc')).toEqual(false)
      expect(buttonName.classList.contains('desc')).toEqual(false)
      expect(buttonAge.classList.contains('asc')).toEqual(false)
      expect(buttonAge.classList.contains('desc')).toEqual(false)
    })
  })

  describe('clearSortOrder', () => {
    it('should set toggle between orders', () => {
      const buttonName = $(`<button data-sort="name" class="desc">`)[0]
      const buttonAge = $(`<button data-sort="age" class="asc">`)[0]
      const buttons = [buttonName, buttonAge]

      expect(buttonName.classList.contains('asc')).toEqual(false)
      expect(buttonName.classList.contains('desc')).toEqual(true)
      expect(buttonAge.classList.contains('asc')).toEqual(true)
      expect(buttonAge.classList.contains('desc')).toEqual(false)

      clearSortOrder(buttons)

      expect(buttonName.classList.contains('asc')).toEqual(false)
      expect(buttonName.classList.contains('desc')).toEqual(false)
      expect(buttonAge.classList.contains('asc')).toEqual(false)
      expect(buttonAge.classList.contains('desc')).toEqual(false)
    })
  })
  describe('addSortListeners', () => {
    beforeEach(() => {
      const template = templater.getTemplate({
        template: '<div><span class="name"></span><span class="age"></span></div>',
        valueNames: ['name', 'age'],
      })
      this.items = [
        new Item({ name: 'Jonny', age: '34' }, { template }),
        new Item({ name: 'Jonas', age: '15' }, { template }),
        new Item({ name: 'Martina', age: '17' }, { template }),
        new Item({ name: 'Unn', age: '30' }, { template }),
      ]
      this.getValues = (valueName) => {
        return this.items.map((i) => i._values[valueName])
      }
    })
    it('should sort and handle classes when clicking buttons', () => {
      const buttonName = $(`<button data-sort="name">`)[0]
      const buttonAge = $(`<button data-sort="age">`)[0]
      const elements = [buttonName, buttonAge]
      addSortListeners(elements, { items: this.items })

      buttonAge.click()
      expect(buttonName.classList.contains('asc')).toEqual(false)
      expect(buttonName.classList.contains('desc')).toEqual(false)
      expect(buttonAge.classList.contains('asc')).toEqual(true)
      expect(buttonAge.classList.contains('desc')).toEqual(false)
      expect(this.getValues('age')).toEqual([
        '15', //
        '17',
        '30',
        '34',
      ])

      buttonAge.click()
      expect(buttonName.classList.contains('asc')).toEqual(false)
      expect(buttonName.classList.contains('desc')).toEqual(false)
      expect(buttonAge.classList.contains('asc')).toEqual(false)
      expect(buttonAge.classList.contains('desc')).toEqual(true)
      expect(this.getValues('age')).toEqual([
        '34', //
        '30',
        '17',
        '15',
      ])

      buttonName.click()
      expect(buttonName.classList.contains('asc')).toEqual(true)
      expect(buttonName.classList.contains('desc')).toEqual(false)
      expect(buttonAge.classList.contains('asc')).toEqual(false)
      expect(buttonAge.classList.contains('desc')).toEqual(false)
      expect(this.getValues('name')).toEqual([
        'Jonas', //
        'Jonny',
        'Martina',
        'Unn',
      ])
    })
    it('should run before and after callbacks', (done) => {
      const buttonAge = $(`<button data-sort="age">`)[0]
      const elements = [buttonAge]
      let beforeHasRun = false
      const before = () => {
        beforeHasRun = true
      }
      return new Promise(async (resolve) => {
        const after = () => {
          expect(beforeHasRun).toEqual(true)
          resolve()
        }
        addSortListeners(elements, { items: this.items, before, after })
        buttonAge.click()
      })
    })
    it('should use custom alphabeth', () => {
      const buttonName = $(`<button data-sort="name">`)[0]
      const elements = [buttonName]
      const alphabet = 'UMJona'
      addSortListeners(elements, { items: this.items, alphabet })
      buttonName.click()
      expect(this.getValues('name')).toEqual([
        'Unn', //
        'Martina',
        'Jonny',
        'Jonas',
      ])
    })
    it('should use sort function', () => {
      const buttonName = $(`<button data-sort="name" class="desc">`)[0]
      const elements = [buttonName]
      const sortFunction = function (itemA, itemB, options) {
        const reversNameA = itemA.values()[options.valueName].split('').reverse().join('')
        const reversNameB = itemB.values()[options.valueName].split('').reverse().join('')
        return naturalSort(reversNameA, reversNameB)
      }
      addSortListeners(elements, { items: this.items, sortFunction })
      buttonName.click()
      expect(this.getValues('name')).toEqual([
        'Martina', //
        'Unn',
        'Jonas',
        'Jonny',
      ])
    })
  })
})
