import fixture from './fixtures'

describe('On', function () {
  var list

  beforeEach(function () {
    list = fixture.list(['name', 'born'], fixture.all)
  })

  afterEach(function () {
    fixture.removeList()
  })

  describe('Updated', function () {
    it('should be triggered after search', () => {
      return new Promise((resolve) => {
        list.on('updated', function () {
          resolve()
        })
        list.search('jonny')
      })
    })
    it('should be triggered after sort', () => {
      return new Promise((resolve) => {
        list.on('updated', function () {
          resolve()
        })
        list.sort('name')
      })
    })
    it('should be triggered after filter', () => {
      return new Promise((resolve) => {
        list.on('updated', function () {
          resolve()
        })
        list.filter(function () {
          return true
        })
      })
    })
    it('should be triggered after show', () => {
      return new Promise((resolve) => {
        list.on('updated', function () {
          resolve()
        })
        list.show(1, 10)
      })
    })

    it('should be triggered after add', () => {
      return new Promise((resolve) => {
        list.on('updated', function () {
          resolve()
        })
        list.add({ name: 'Hej' })
      })
    })
    it('should be triggered after remove', () => {
      return new Promise((resolve) => {
        list.on('updated', function () {
          resolve()
        })
        list.remove('name', 'Jonny')
      })
    })
  })

  describe('Multiple handlers', () => {
    it('should be trigger both handlers', () => {
      return new Promise((resolve) => {
        var done1 = false,
          done2 = false,
          isDone = function () {
            if (done1 && done2) {
              resolve()
            }
          }

        list.on('updated', function () {
          done1 = true
          isDone()
        })
        list.on('updated', function () {
          done2 = true
          isDone()
        })
        list.search('jonny')
      })
    })
  })

  describe('Search', function () {
    it('should be triggered before and after search', () => {
      return new Promise((resolve) => {
        var done1 = false
        list.on('searchStart', function () {
          done1 = true
        })
        list.on('searchComplete', function () {
          if (done1) {
            resolve()
          }
        })
        list.search('jonny')
      })
    })
  })

  describe('Sort', function () {
    it('should be triggered before and after sort', () => {
      return new Promise((resolve) => {
        var done1 = false
        list.on('sortStart', function () {
          done1 = true
        })
        list.on('sortComplete', function () {
          if (done1) {
            resolve()
          }
        })
        list.sort('name')
      })
    })
  })

  describe('Filter', function () {
    it('should be triggered before and after filter', () => {
      return new Promise((resolve) => {
        var done1 = false
        list.on('filterStart', function () {
          done1 = true
        })
        list.on('filterComplete', function () {
          if (done1) {
            resolve()
          }
        })
        list.filter(function () {
          return true
        })
      })
    })
  })
})
