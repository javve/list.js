import fixture from './fixtures'

describe('Trigger', function () {
  var list

  beforeAll(function () {
    list = fixture.list(['name', 'born'], fixture.all)
  })

  afterAll(function () {
    fixture.removeList()
  })

  describe('General', function () {
    it('should be triggered by searchComplete', () => {
      return new Promise((resolve) => {
        list.on('searchComplete', function () {
          resolve()
        })
        list.trigger('searchComplete')
      })
    })
  })
})
