import fixturePagination from './fixtures-pagination'
import List from '../../src/index'

describe('Pagination', function () {
  describe('Default settings, innerWindow: 2, outerWindow: 0, left: 0, right: 0', function () {
    var list, itemHTML, pagination

    beforeAll(function () {
      itemHTML = fixturePagination.list(['name'])
      list = new List(
        'list-pagination',
        {
          valueNames: ['name'],
          item: itemHTML,
          page: 2,
          pagination: true,
        },
        fixturePagination.all
      )

      pagination = document.querySelector('.pagination')
    })

    afterAll(function () {
      fixturePagination.removeList()
    })

    it('should have default settings', function () {
      expect(pagination.querySelectorAll('a').length).toEqual(4)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[4]).toEqual(undefined)
    })

    it('should show same pages for show(7,2) and show(8,2)', function () {
      list.show(7, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(7)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('4')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('a')[5].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('a')[6].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[7]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(false)
    })

    it('should show same pages for show(7,2) and show(8,2)', function () {
      list.show(8, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(7)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('4')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('a')[5].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('a')[6].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[7]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(false)
    })

    it('should test show(14,2)', function () {
      list.show(14, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(6)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('7')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('8')
      expect(pagination.querySelectorAll('a')[5].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[6]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(false)
    })

    it('should show last page with show(17,2)', function () {
      list.show(17, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(4)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('7')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('8')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[4]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[1].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
    })

    it('should handle page = 0', function () {
      expect(list.listContainer.style.display).toBe('')
      list.show(0, 0)
      expect(list.listContainer.style.display).toBe('none')
      list.show(1, 1)
      expect(list.listContainer.style.display).toBe('block')
    })
  })

  describe('Custom settings, innerWindow: 1, outerWindow: 1, left: 0, right: 0', function () {
    var list, itemHTML, pagination

    beforeAll(function () {
      itemHTML = fixturePagination.list(['name'])
      list = new List(
        'list-pagination',
        {
          valueNames: ['name'],
          item: itemHTML,
          page: 2,
          pagination: {
            innerWindow: 1,
            outerWindow: 1,
          },
        },
        fixturePagination.all
      )

      pagination = document.querySelector('.pagination')
    })

    afterAll(function () {
      fixturePagination.removeList()
    })

    it('should have default settings', function () {
      expect(pagination.querySelectorAll('a').length).toEqual(4)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[4]).toEqual(undefined)
    })

    it('should test show(7,2)', function () {
      list.show(7, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(7)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('4')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('a')[5].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[6].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[7]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(false)
    })

    it('should test show(14,2)', function () {
      list.show(14, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(6)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('7')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('8')
      expect(pagination.querySelectorAll('a')[5].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[6]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(false)
    })

    it('should show last page with show(17,2)', function () {
      list.show(17, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(4)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('8')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[4]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[1].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
    })
  })

  describe('Custom settings, innerWindow: 1, outerWindow: 1, left: 2, right: 1', function () {
    var list, itemHTML, pagination

    beforeAll(function () {
      itemHTML = fixturePagination.list(['name'])
      list = new List(
        'list-pagination',
        {
          valueNames: ['name'],
          item: itemHTML,
          page: 2,
          pagination: {
            innerWindow: 1,
            outerWindow: 1,
            left: 2,
            right: 1,
          },
        },
        fixturePagination.all
      )

      pagination = document.querySelector('.pagination')
    })

    afterAll(function () {
      fixturePagination.removeList()
    })

    it('should have default settings', function () {
      expect(pagination.querySelectorAll('a').length).toEqual(4)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[4]).toEqual(undefined)
    })

    it('should test show(7,2)', function () {
      list.show(7, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(7)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('4')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('a')[5].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[6].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[7]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(false)
    })

    it('should test show(12,2)', function () {
      list.show(12, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(8)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('a')[5].innerHTML).toEqual('7')
      expect(pagination.querySelectorAll('a')[6].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[7].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[8]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('li')[5].classList.contains('active')).toEqual(false)
    })
    it('should show last page with show(17,2)', function () {
      list.show(17, 2)
      expect(pagination.querySelectorAll('a').length).toEqual(5)
      expect(pagination.querySelectorAll('a')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('a')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('a')[2].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('a')[3].innerHTML).toEqual('8')
      expect(pagination.querySelectorAll('a')[4].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('a')[5]).toEqual(undefined)
      expect(pagination.querySelectorAll('li')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[3].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('li')[4].classList.contains('active')).toEqual(true)
    })
  })

  describe('Custom settings, pagination: { item: "<button><span class=page></span></button>" }', function () {
    var list, itemHTML, pagination

    beforeAll(function () {
      itemHTML = fixturePagination.list(['name'])
      list = new List(
        'list-pagination',
        {
          valueNames: ['name'],
          item: itemHTML,
          page: 2,
          pagination: {
            item: '<button><span class=page></span></button>',
          },
        },
        fixturePagination.all
      )

      pagination = document.querySelector('.pagination')
    })

    afterAll(function () {
      fixturePagination.removeList()
    })

    it('should have default settings', function () {
      expect(pagination.querySelectorAll('span').length).toEqual(4)
      expect(pagination.querySelectorAll('span')[0].innerHTML).toEqual('1')
      expect(pagination.querySelectorAll('span')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('span')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('span')[3].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('span')[4]).toEqual(undefined)
    })

    it('should show same pages for show(7,2) and show(8,2)', function () {
      list.show(7, 2)
      expect(pagination.querySelectorAll('span').length).toEqual(7)
      expect(pagination.querySelectorAll('span')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('span')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('span')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('span')[3].innerHTML).toEqual('4')
      expect(pagination.querySelectorAll('span')[4].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('span')[5].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('span')[6].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('span')[7]).toEqual(undefined)
      expect(pagination.querySelectorAll('button')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('button')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('button')[4].classList.contains('active')).toEqual(false)
    })

    it('should show same pages for show(7,2) and show(8,2)', function () {
      list.show(8, 2)
      expect(pagination.querySelectorAll('span').length).toEqual(7)
      expect(pagination.querySelectorAll('span')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('span')[1].innerHTML).toEqual('2')
      expect(pagination.querySelectorAll('span')[2].innerHTML).toEqual('3')
      expect(pagination.querySelectorAll('span')[3].innerHTML).toEqual('4')
      expect(pagination.querySelectorAll('span')[4].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('span')[5].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('span')[6].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('span')[7]).toEqual(undefined)
      expect(pagination.querySelectorAll('button')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('button')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('button')[4].classList.contains('active')).toEqual(false)
    })

    it('should test show(14,2)', function () {
      list.show(14, 2)
      expect(pagination.querySelectorAll('span').length).toEqual(6)
      expect(pagination.querySelectorAll('span')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('span')[1].innerHTML).toEqual('5')
      expect(pagination.querySelectorAll('span')[2].innerHTML).toEqual('6')
      expect(pagination.querySelectorAll('span')[3].innerHTML).toEqual('7')
      expect(pagination.querySelectorAll('span')[4].innerHTML).toEqual('8')
      expect(pagination.querySelectorAll('span')[5].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('span')[6]).toEqual(undefined)
      expect(pagination.querySelectorAll('button')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('button')[3].classList.contains('active')).toEqual(true)
      expect(pagination.querySelectorAll('button')[4].classList.contains('active')).toEqual(false)
    })

    it('should show last page with show(17,2)', function () {
      list.show(17, 2)
      expect(pagination.querySelectorAll('span').length).toEqual(4)
      expect(pagination.querySelectorAll('span')[0].innerHTML).toEqual('...')
      expect(pagination.querySelectorAll('span')[1].innerHTML).toEqual('7')
      expect(pagination.querySelectorAll('span')[2].innerHTML).toEqual('8')
      expect(pagination.querySelectorAll('span')[3].innerHTML).toEqual('9')
      expect(pagination.querySelectorAll('span')[4]).toEqual(undefined)
      expect(pagination.querySelectorAll('button')[1].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('button')[2].classList.contains('active')).toEqual(false)
      expect(pagination.querySelectorAll('button')[3].classList.contains('active')).toEqual(true)
    })

    it('should handle page = 0', function () {
      expect(list.listContainer.style.display).toBe('')
      list.show(0, 0)
      expect(list.listContainer.style.display).toBe('none')
      list.show(1, 1)
      expect(list.listContainer.style.display).toBe('block')
    })
  })
})
