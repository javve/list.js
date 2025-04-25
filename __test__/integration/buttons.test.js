import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import $ from 'jquery'
import List from '../../src/index'

describe('Button', function () {
  var list

  beforeEach(function () {
    $('body').append(
      $(`<div id="parse-list">
        <input class="search" />
        <span class="sort" id="sort-name" data-sort="name">Sort name</span>
        <span class="sort" id="sort-name-asc" data-sort="name" data-order="asc">Sort name asc</span>
        <span class="sort" id="sort-name-desc" data-sort="name" data-order="desc">Sort name desc</span>
        <div class="list">
          <div><span class="name">Jonny</span><span class="born">1986</span></div>
          <div><span class="name">Jocke</span><span class="born">1985</span></div>
        </div>
      </div>`)
    )

    list = new List('parse-list', {
      valueNames: ['name', 'born'],
    })
  })

  afterEach(function () {
    $('#parse-list').remove()
  })

  describe('Sort', () => {
    it('should trigger sortStart', async () => {
      return new Promise((resolve) => {
        list.on('sortStart', () => {
          resolve()
        })
        const sortBtn = document.querySelector('#sort-name')
        userEvent.click(sortBtn)
      })
    })
    it('should trigger sortComplete', async () => {
      return new Promise((resolve) => {
        list.on('sortComplete', () => {
          resolve()
        })
        const sortBtn = document.querySelector('#sort-name')
        userEvent.click(sortBtn)
      })
    })

    it('should switch sorting order when clicking multiple times', () => {
      return new Promise((resolve) => {
        const sortBtn = document.querySelector('#sort-name')
        var sortRun = 0
        list.on('sortComplete', () => {
          sortRun++
          if (sortRun == 1) {
            expect(sortBtn.classList.contains('asc')).toBe(true)
            expect(sortBtn.classList.contains('desc')).toBe(false)
            setTimeout(function () {
              sortBtn.click()
            }, 50)
          } else if (sortRun == 2) {
            expect(sortBtn.classList.contains('asc')).toBe(false)
            expect(sortBtn.classList.contains('desc')).toBe(true)
            setTimeout(function () {
              sortBtn.click()
            }, 50)
          } else if (sortRun == 3) {
            expect(sortBtn.classList.contains('asc')).toBe(true)
            expect(sortBtn.classList.contains('desc')).toBe(false)
            resolve()
          }
        })
        expect(sortBtn.classList.contains('asc')).toBe(false)
        expect(sortBtn.classList.contains('desc')).toBe(false)
        sortBtn.click()
      })
    })

    it('should sort with predefined order', () => {
      return new Promise((resolve) => {
        const sortBtn = document.querySelector('#sort-name')
        const sortBtnAsc = document.querySelector('#sort-name-asc')
        const sortBtnDesc = document.querySelector('#sort-name-desc')
        var sortRun = 0
        list.on('sortComplete', function () {
          sortRun++
          if (sortRun == 1) {
            expect(sortBtn.classList.contains('asc')).toBe(true)
            expect(sortBtn.classList.contains('desc')).toBe(false)
            expect(sortBtnAsc.classList.contains('asc')).toBe(true)
            expect(sortBtnAsc.classList.contains('desc')).toBe(false)
            expect(sortBtnDesc.classList.contains('asc')).toBe(false)
            expect(sortBtnDesc.classList.contains('desc')).toBe(false)
            setTimeout(function () {
              sortBtnAsc.click()
            }, 50)
          } else if (sortRun == 2) {
            expect(sortBtn.classList.contains('asc')).toBe(true)
            expect(sortBtn.classList.contains('desc')).toBe(false)
            expect(sortBtnAsc.classList.contains('asc')).toBe(true)
            expect(sortBtnAsc.classList.contains('desc')).toBe(false)
            expect(sortBtnDesc.classList.contains('asc')).toBe(false)
            expect(sortBtnDesc.classList.contains('desc')).toBe(false)
            setTimeout(function () {
              sortBtnAsc.click()
            }, 50)
          } else if (sortRun == 3) {
            expect(sortBtn.classList.contains('asc')).toBe(true)
            expect(sortBtn.classList.contains('desc')).toBe(false)
            expect(sortBtnAsc.classList.contains('asc')).toBe(true)
            expect(sortBtnAsc.classList.contains('desc')).toBe(false)
            expect(sortBtnDesc.classList.contains('asc')).toBe(false)
            expect(sortBtnDesc.classList.contains('desc')).toBe(false)
            setTimeout(function () {
              sortBtnDesc.click()
            }, 50)
          } else if (sortRun == 4) {
            expect(sortBtn.classList.contains('asc')).toBe(false)
            expect(sortBtn.classList.contains('desc')).toBe(true)
            expect(sortBtnAsc.classList.contains('asc')).toBe(false)
            expect(sortBtnAsc.classList.contains('desc')).toBe(false)
            expect(sortBtnDesc.classList.contains('asc')).toBe(false)
            expect(sortBtnDesc.classList.contains('desc')).toBe(true)
            setTimeout(function () {
              sortBtnDesc.click()
            }, 50)
          } else if (sortRun == 5) {
            expect(sortBtn.classList.contains('asc')).toBe(false)
            expect(sortBtn.classList.contains('desc')).toBe(true)
            expect(sortBtnAsc.classList.contains('asc')).toBe(false)
            expect(sortBtnAsc.classList.contains('desc')).toBe(false)
            expect(sortBtnDesc.classList.contains('asc')).toBe(false)
            expect(sortBtnDesc.classList.contains('desc')).toBe(true)
            resolve()
          }
        })
        expect(sortBtn.classList.contains('asc')).toBe(false)
        expect(sortBtn.classList.contains('desc')).toBe(false)
        expect(sortBtnAsc.classList.contains('asc')).toBe(false)
        expect(sortBtnAsc.classList.contains('desc')).toBe(false)
        expect(sortBtnDesc.classList.contains('asc')).toBe(false)
        expect(sortBtnDesc.classList.contains('desc')).toBe(false)
        sortBtnAsc.click()
      })
    })

    it('buttons should change class when sorting programmatically', () => {
      return new Promise((resolve) => {
        const sortBtn = document.querySelector('#sort-name')
        const sortBtnAsc = document.querySelector('#sort-name-asc')
        const sortBtnDesc = document.querySelector('#sort-name-desc')
        list.on('sortComplete', () => {
          expect(sortBtn.classList.contains('asc')).toBe(true)
          expect(sortBtn.classList.contains('desc')).toBe(false)
          expect(sortBtnAsc.classList.contains('asc')).toBe(true)
          expect(sortBtnAsc.classList.contains('desc')).toBe(false)
          expect(sortBtnDesc.classList.contains('asc')).toBe(false)
          expect(sortBtnDesc.classList.contains('desc')).toBe(false)
          resolve()
        })
        list.sort('name', { order: 'asc' })
      })
    })
  })

  describe('Search', () => {
    it('should trigger searchStart', async () => {
      return new Promise((resolve) => {
        list.on('searchStart', () => {
          resolve()
        })

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'jon')
      })
    })
    it('should trigger searchComplete', async () => {
      return new Promise((resolve) => {
        list.on('searchComplete', () => {
          resolve()
        })
        const input = screen.getByRole('textbox')
        userEvent.type(input, 'jon')
      })
    })
  })
})
