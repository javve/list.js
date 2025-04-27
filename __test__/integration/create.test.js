import List from '../../src/index'

describe('Create', () => {
  describe('With HTML items', () => {
    let list, listEl
    beforeEach(function () {
      listEl = document.createElement('div')
      listEl.id = 'list'
      listEl.innerHTML = `
        <ul class="list">
          <li><span class="name">Jonny</span></li>
        </ul>
      `
      document.body.appendChild(listEl)
      list = new List('list', { valueNames: ['name'] })
    })
    afterEach(() => {
      listEl.remove()
    })

    it('should contain one item', () => {
      expect(list.items.length).toEqual(1)
      expect(listEl.querySelectorAll('li').length).toEqual(1)
    })

    it('should contain two items', () => {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.querySelectorAll('li').length).toEqual(2)
    })
  })

  describe('With and element instead of id', () => {
    var listEl, list
    beforeEach(() => {
      listEl = document.createElement('div')
      listEl.id = 'list'
      listEl.innerHTML = `
        <ul class="list">
          <li><span class="name">Jonny</span></li>
        </ul>
      `
      document.body.appendChild(listEl)
      var el = document.getElementById('list')
      list = new List(el, { valueNames: ['name'] })
    })
    afterEach(() => {
      listEl.remove()
    })

    it('should contain one item', () => {
      expect(list.items.length).toEqual(1)
      expect(listEl.querySelectorAll('li').length).toEqual(1)
    })
  })

  describe('Without items and with string template', () => {
    var listEl, list
    beforeEach(() => {
      listEl = document.createElement('div')
      listEl.id = 'list'
      listEl.innerHTML = '<ul class="list"></ul>'
      document.body.appendChild(listEl)
      list = new List(
        'list',
        {
          valueNames: ['name'],
          item: '<li><span class="name"></span></li>',
        },
        [{ name: 'Jonny' }]
      )
    })
    afterEach(() => {
      listEl.remove()
    })

    it('should contain one item', () => {
      expect(list.items.length).toEqual(1)
      expect(listEl.querySelectorAll('li').length).toEqual(1)
    })

    it('should contain two items', () => {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.querySelectorAll('li').length).toEqual(2)
    })
  })

  describe('Without items and with string template for table', () => {
    var listEl, list

    beforeEach(() => {
      listEl = document.createElement('div')
      listEl.id = 'list'
      listEl.innerHTML = '<table class="list"></table>'
      document.body.appendChild(listEl)
      list = new List(
        'list',
        {
          valueNames: ['name'],
          item: '<tr><span class="name"></span></tr>',
        },
        [{ name: 'Jonny' }]
      )
    })

    afterEach(() => {
      listEl.remove()
    })

    it('should contain one item', () => {
      expect(list.items.length).toEqual(1)
      expect(listEl.querySelectorAll('tr').length).toEqual(1)
    })

    it('should contain two items', () => {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.querySelectorAll('tr').length).toEqual(2)
    })
  })

  describe('Without items and with template function', () => {
    var listEl, list
    beforeEach(() => {
      listEl = document.createElement('div')
      listEl.id = 'list'
      listEl.innerHTML = '<ul class="list"></ul>'
      document.body.appendChild(listEl)
      list = new List(
        'list',
        {
          valueNames: ['name'],
          item: function (values) {
            return `<li data-template-fn-${values.name.toLowerCase()}><span class="name"></span></li>`
          },
        },
        [{ name: 'Jonny' }]
      )
    })
    afterEach(() => {
      listEl.remove()
    })

    it('should contain one item', () => {
      expect(list.items.length).toEqual(1)
      expect(listEl.querySelectorAll('li').length).toEqual(1)
    })

    it('should contain two items', () => {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.querySelectorAll('li').length).toEqual(2)
    })

    it('should get values from items', () => {
      list.add({ name: 'Egon' })
      expect(listEl.querySelectorAll('li[data-template-fn-egon]').length).toEqual(1)
    })
  })

  describe('without items and or template', () => {
    it('should throw error on init', () => {
      var listEl = document.createElement('div')
      listEl.id = 'list'
      listEl.innerHTML = '<ul class="list"></ul>'
      document.body.appendChild(listEl)

      expect(() => {
        new List('list', {
          valueNames: ['name'],
        })
      }).toThrow()

      listEl.remove()
    })
  })

  describe('Without items and with HTML template', () => {
    var listEl, list, templateEl
    beforeEach(() => {
      listEl = document.createElement('div')
      listEl.id = 'list'
      listEl.innerHTML = '<ul class="list"></ul>'

      templateEl = document.createElement('li')
      templateEl.id = 'template-item'
      templateEl.innerHTML = '<span class="name"></span>'

      document.body.appendChild(listEl)
      document.body.appendChild(templateEl)

      list = new List(
        'list',
        {
          valueNames: ['name'],
          item: 'template-item',
        },
        [{ name: 'Jonny' }]
      )
    })
    afterEach(() => {
      listEl.remove()
      templateEl.remove()
    })

    it('should contain one item', () => {
      expect(list.items.length).toEqual(1)
      expect(listEl.querySelectorAll('li').length).toEqual(1)
    })

    it('should contain two items', () => {
      list.add({ name: 'Jonas' })
      expect(list.items.length).toEqual(2)
      expect(listEl.querySelectorAll('li').length).toEqual(2)
    })
  })

  describe('Asyn index with existing list', () => {
    it('should contain 162 items', () => {
      return new Promise((resolve) => {
        var listEl = document.createElement('div')
        listEl.id = 'list'
        listEl.innerHTML = `
         <ul class="list">
            <li><span class="name">Jonny</span></li><li><span class="name">Sven</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
            <li><span class="name">Anna</span></li><li><span class="name">Lisa</span></li>
            <li><span class="name">Egon</span></li><li><span class="name">Frida</span></li>
            <li><span class="name">Maj-britt</span></li><li><span class="name">Fredrik</span></li>
            <li><span class="name">Torbjorn</span></li><li><span class="name">Lolzor</span></li>
            <li><span class="name">Sandra</span></li><li><span class="name">Gottfrid</span></li>
            <li><span class="name">Tobias</span></li><li><span class="name">Martina</span></li>
            <li><span class="name">Johannes</span></li><li><span class="name">Ted</span></li>
            <li><span class="name">Malin</span></li><li><span class="name">Filippa</span></li>
            <li><span class="name">Imma</span></li><li><span class="name">Hasse</span></li>
            <li><span class="name">Robert</span></li><li><span class="name">Mona</span></li>
          </ul>
        `
        document.body.appendChild(listEl)

        new List('list', {
          valueNames: ['name'],
          indexAsync: true,
          parseComplete: function () {
            expect(listEl.querySelectorAll('li').length).toEqual(162)
            listEl.remove()
            resolve()
          },
        })
      })
    })
  })
})
