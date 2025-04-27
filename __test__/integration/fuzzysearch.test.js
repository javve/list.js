import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import fixtureFuzzysearch from './fixtures-fuzzysearch'
import List from '../../src/index'

describe('Fuzzy Search', function () {
  var list, itemHTML

  beforeEach(function () {
    itemHTML = fixtureFuzzysearch.list(['name', 'born'])
    list = new List(
      'list-fuzzy-search',
      {
        valueNames: ['name', 'born'],
        item: itemHTML,
      },
      fixtureFuzzysearch.all,
    )
  })

  afterEach(function () {
    fixtureFuzzysearch.removeList()
  })

  it('should have default attribute', function () {
    expect(list.fuzzySearch).toBeInstanceOf(Function)
  })

  it('should find result', function () {
    list.fuzzySearch('guybrush')
    expect(list.matchingItems.length).toBe(1)
  })

  it('should find result', function () {
    list.fuzzySearch('g thre')
    expect(list.matchingItems.length).toBe(1)
  })

  it('should find result', function () {
    list.fuzzySearch('thre')
    expect(list.matchingItems.length).toBe(4)
  })

  describe('Search field', function () {
    it('should trigger searchStart', () => {
      return new Promise((resolve) => {
        list.on('searchStart', function () {
          resolve()
        })
        const input = screen.getByRole('textbox')
        userEvent.type(input, 'angelica')
      })
    })

    it('should trigger searchComplete', () => {
      return new Promise((resolve) => {
        list.on('searchComplete', function () {
          resolve()
        })
        const input = screen.getByRole('textbox')
        userEvent.type(input, 'angelica')
      })
    })
  })
})
