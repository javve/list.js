const $ = require('jquery'),
  List = require('../../src/index')

describe('Parse', function () {
  describe('Parse class', function () {
    var list
    beforeEach(function () {
      $('body').append(
        $(
          '<div id="parse-list">\
        <div class="list">\
          <div><span class="name">Jonny</span><span class="born">1986</span></div>\
          <div><span class="name">Jocke</span><span class="born">1985</span></div>\
        </div>\
      </div>'
        )
      )

      list = new List('parse-list', {
        valueNames: ['name', 'born'],
      })
    })

    afterEach(function () {
      $('#parse-list').remove()
    })

    it('should have two items', function () {
      expect(list.items.length).toEqual(2)
      expect(list.items[0].values().name).toEqual('Jonny')
      expect(list.items[1].values().name).toEqual('Jocke')
    })
    it('should add item to parsed list', function () {
      list.add({ name: 'Sven', born: 1950 })
      expect(list.items.length).toEqual(3)
      expect(list.items[0].values().name).toEqual('Jonny')
      expect(list.items[1].values().name).toEqual('Jocke')
      expect(list.items[2].values().name).toEqual('Sven')
      expect(list.items[0].values().born).toEqual('1986')
      expect(list.items[2].values().born).toEqual(1950)
      var el = $($('#parse-list').find('.list div')[2])
      expect(el.find('span').length).toEqual(2)
      expect(el.find('span.name').text()).toEqual('Sven')
      expect(el.find('span.born').text()).toEqual('1950')
    })
    it('should parsed value always be string while added could be number', function () {
      list.add({ name: 'Sven', born: 1950 })
      expect(list.items[0].values().born).toEqual('1986')
      expect(list.items[0].values().born).not.toEqual(1986)
      expect(list.items[2].values().born).not.toEqual('1950')
      expect(list.items[2].values().born).toEqual(1950)
    })
  })

  describe('Parse data', function () {
    var list

    beforeEach(function () {
      $('body').append(
        $(
          '<div id="parse-list">\
        <div class="list">\
          <div data-id="1">\
            <a href="http://lol.com" class="link name">Jonny</a>\
            <span class="born timestamp" data-timestamp="54321">1986</span>\
            <img class="image" src="usage/boba.jpeg">\
            <input class="foo" value="Bar">\
          </div>\
          <div data-id="2">\
            <a href="http://lol.com" class="link name">Jocke</a>\
            <span class="born timestamp" data-timestamp="12345">1985</span>\
            <img class="image" src="usage/leia.jpeg">\
            <input class="foo child" value="Car">\
          </div>\
        </div>\
      </div>'
        )
      )

      list = new List('parse-list', {
        valueNames: [
          'name',
          'born',
          { data: ['id'] },
          { attr: 'src', name: 'image' },
          { attr: 'href', name: 'link' },
          { attr: 'value', name: 'foo' },
          { attr: 'data-timestamp', name: 'timestamp' },
        ],
      })
    })

    afterEach(function () {
      $('#parse-list').remove()
    })

    it('should get values from class, data, src, value and child els data-attribute', function () {
      expect(list.items.length).toEqual(2)
      var jonny = list.items[0].values()
      expect(jonny.name).toEqual('Jonny')
      expect(jonny.born).toEqual('1986')
      expect(jonny.id).toEqual('1')
      expect(jonny.image).toEqual('usage/boba.jpeg')
      expect(jonny.timestamp).toEqual('54321')
      expect(jonny.foo).toEqual('Bar')
    })
    it('should add item to list with class, data and src', function () {
      list.add({
        name: 'Sven',
        born: 1950,
        id: 4,
        image: 'usage/rey.jpeg',
        link: 'localhost',
        timestamp: '1337',
        foo: 'hej',
      })
      expect(list.items.length).toEqual(3)
      var sven = list.items[2].values()
      expect(sven.name).toEqual('Sven')
      expect(sven.born).toEqual(1950)
      expect(sven.id).toEqual(4)
      expect(sven.image).toEqual('usage/rey.jpeg')
      expect(sven.link).toEqual('localhost')
      expect(sven.timestamp).toEqual('1337')
      expect(sven.foo).toEqual('hej')
      var el = $($('#parse-list').find('.list div')[2])
      expect(el.data('id')).toEqual(4)
      expect(el.find('.name').text()).toEqual('Sven')
      expect(el.find('.born').text()).toEqual('1950')
      expect(el.find('.image').attr('src')).toEqual('usage/rey.jpeg')
      expect(el.find('.link').attr('href')).toEqual('localhost')
      expect(el.find('.timestamp').data('timestamp')).toEqual(1337)
      expect(el.find('.foo').val()).toEqual('hej')
    })
  })
})
