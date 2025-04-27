import List from '../../src/index'

describe('Parse', function () {
  describe('Parse class', function () {
    var list
    beforeEach(function () {
      const div = document.createElement('div')
      div.id = 'parse-list'
      div.innerHTML = `
        <div class="list">
          <div><span class="name">Jonny</span><span class="born">1986</span></div>
          <div><span class="name">Jocke</span><span class="born">1985</span></div>
        </div>
      `
      document.body.appendChild(div)

      list = new List('parse-list', {
        valueNames: ['name', 'born'],
      })
    })

    afterEach(function () {
      const element = document.getElementById('parse-list')
      if (element) {
        element.remove()
      }
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
      const listDiv = document.querySelector('#parse-list .list')
      const el = listDiv.children[2]
      expect(el.querySelectorAll('span').length).toEqual(2)
      expect(el.querySelector('.name').textContent).toEqual('Sven')
      expect(el.querySelector('.born').textContent).toEqual('1950')
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
      const div = document.createElement('div')
      div.id = 'parse-list'
      div.innerHTML = `
        <div class="list">
          <div data-id="1">
            <a href="http://lol.com" class="link name">Jonny</a>
            <span class="born timestamp" data-timestamp="54321">1986</span>
            <img class="image" src="usage/boba.jpeg">
            <input class="foo" value="Bar">
          </div>
          <div data-id="2">
            <a href="http://lol.com" class="link name">Jocke</a>
            <span class="born timestamp" data-timestamp="12345">1985</span>
            <img class="image" src="usage/leia.jpeg">
            <input class="foo child" value="Car">
          </div>
        </div>
      `
      document.body.appendChild(div)

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
      const element = document.getElementById('parse-list')
      if (element) {
        element.remove()
      }
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
      const listDiv = document.querySelector('#parse-list .list')
      const el = listDiv.children[2]
      expect(el.dataset.id).toEqual('4')
      expect(el.querySelector('.name').textContent).toEqual('Sven')
      expect(el.querySelector('.born').textContent).toEqual('1950')
      expect(el.querySelector('.image').getAttribute('src')).toEqual('usage/rey.jpeg')
      expect(el.querySelector('.link').getAttribute('href')).toEqual('localhost')
      expect(el.querySelector('.timestamp').dataset.timestamp).toEqual('1337')
      expect(el.querySelector('.foo').value).toEqual('hej')
    })
  })
})
