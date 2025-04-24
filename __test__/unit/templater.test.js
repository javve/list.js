import $ from 'jquery'
import templater from '../../src/templater'

describe('Templater', () => {
  describe('getTemplate function', () => {
    it('should get from string with div', () => {
      const item = `<div><span class="name">Foo</span></div>`
      const valueNames = ['name']
      const template = templater.getTemplate({ template: item, valueNames })
      const itemEl = template.render()
      expect(itemEl.outerHTML).toEqual('<div><span class="name"></span></div>')
    })
    it('should init with item string of a tr', () => {
      const item = `<tr><td class="name">Foo</td></tr>`
      const valueNames = ['name']
      const template = templater.getTemplate({ template: item, valueNames })
      const itemEl = template.render()
      expect(itemEl.outerHTML).toEqual('<tr><td class="name"></td></tr>')
    })
    it('should init with item function', () => {
      const item = () => {
        return `<div><span class="name"></span></div>`
      }
      const valueNames = ['name']
      const template = templater.getTemplate({ template: item, valueNames })
      const itemEl = template.render()
      expect(itemEl.outerHTML).toEqual('<div><span class="name"></span></div>')
    })
    it('should init without item', () => {
      const listEl = $(`
      <ul class="list">
        <li><span class="name">Jonny</span></li>
      </ul>
    `)
      $(document.body).append(listEl)
      const valueNames = ['name']
      const template = templater.getTemplate({ parentEl: document.querySelector('.list'), valueNames })
      const itemEl = template.render()
      expect(itemEl.outerHTML).toEqual('<li><span class="name"></span></li>')
    })
  })
  describe('create', () => {
    it('should create item with values', () => {
      const item =
        '<div data-id="1">' +
        '<a href="http://lol.com" class="link name">Jonny</a>' +
        '<span class="born timestamp" data-timestamp="54321">1986</span>' +
        '<img class="image" src="usage/boba.jpeg">' +
        '<input class="foo" value="Bar">' +
        '</div>'

      const valueNames = [
        'name',
        'born',
        { data: ['id'] },
        { attr: 'src', name: 'image' },
        { attr: 'href', name: 'link' },
        { attr: 'value', name: 'foo' },
        { attr: 'data-timestamp', name: 'timestamp' },
      ]
      const template = templater.getTemplate({ template: item, valueNames })
      const itemEl = templater.create(
        {
          name: 'Sven',
          born: 1950,
          id: 4,
          image: 'usage/rey.jpeg',
          link: 'localhost',
          timestamp: '1337',
          foo: 'hej',
        },
        template,
      )
      expect(itemEl.outerHTML).toEqual(
        '<div data-id="4">' +
          '<a href="localhost" class="link name">Sven</a>' +
          '<span class="born timestamp" data-timestamp="1337">1950</span>' +
          '<img class="image" src="usage/rey.jpeg">' +
          '<input class="foo" value="hej">' +
          '</div>',
      )
    })
  })
  describe('remove', () => {
    it('should remove element from list', () => {
      const listEl = $(`
        <div class="list">
          <div><span class="name">Foo</span></div>
        </div>
      `)[0]
      document.body.appendChild(listEl)
      const item = listEl.querySelector('div')
      const valueNames = ['name']
      expect(listEl.querySelector('div')).not.toEqual(null)
      templater.remove(item, listEl)
      expect(listEl.querySelector('div')).toEqual(null)
    })
  })
  describe('show', () => {
    it('should add element to list', () => {
      const listEl = $(`<div class="list"></div>`)[0]
      document.body.appendChild(listEl)
      const item = $('<div><span class="name">Foo</span></div>')[0]
      expect(listEl.querySelector('div')).toEqual(null)
      templater.show(item, listEl)
      expect(listEl.querySelector('div')).not.toEqual(null)
    })
  })
  describe('clear', () => {
    it('should clear the entire list of children', () => {
      const listEl = $(`
        <div class="list">
          <div><span class="name">Foo</span></div>
          <div><span class="name">Foo</span></div>
        </div>
      `)[0]
      document.body.appendChild(listEl)
      expect(listEl.querySelectorAll('div').length).toEqual(2)
      templater.clear(listEl)
      expect(listEl.querySelectorAll('div').length).toEqual(0)
    })
  })
  describe('set', () => {
    it('should set values to element', () => {
      const itemEl = $(
        '<div data-id="1">' +
          '<a href="http://lol.com" class="link name">Jonny</a>' +
          '<span class="born timestamp" data-timestamp="54321">1986</span>' +
          '<img class="image" src="usage/boba.jpeg">' +
          '<input class="foo" value="Bar">' +
          '</div>',
      )[0]
      const valueNames = [
        'name',
        'born',
        { data: ['id'] },
        { attr: 'src', name: 'image' },
        { attr: 'href', name: 'link' },
        { attr: 'value', name: 'foo' },
        { attr: 'data-timestamp', name: 'timestamp' },
      ]
      templater.set(
        itemEl,
        {
          name: 'Sven',
          born: 1950,
          id: 4,
          image: 'usage/rey.jpeg',
          link: 'localhost',
          timestamp: '1337',
          foo: 'hej',
        },
        valueNames,
      )
      expect(itemEl.outerHTML).toEqual(
        '<div data-id="4">' +
          '<a href="localhost" class="link name">Sven</a>' +
          '<span class="born timestamp" data-timestamp="1337">1950</span>' +
          '<img class="image" src="usage/rey.jpeg">' +
          '<input class="foo" value="hej">' +
          '</div>',
      )
    })
  })
  describe('get', () => {
    it('should get all values from element', () => {
      const itemEl = $(
        '<div data-id="1">' +
          '<a href="http://lol.com" class="link name">Jonny</a>' +
          '<span class="born timestamp" data-timestamp="54321">1986</span>' +
          '<img class="image" src="usage/boba.jpeg">' +
          '<input class="foo" value="Bar">' +
          '</div>',
      )[0]
      const valueNames = [
        'name',
        'born',
        { data: ['id'] },
        { attr: 'src', name: 'image' },
        { attr: 'href', name: 'link' },
        { attr: 'value', name: 'foo' },
        { attr: 'data-timestamp', name: 'timestamp' },
      ]
      const values = templater.get(itemEl, valueNames)
      expect(values).toEqual({
        name: 'Jonny',
        born: '1986',
        id: '1',
        image: 'usage/boba.jpeg',
        link: 'http://lol.com',
        foo: 'Bar',
        timestamp: '54321',
      })
    })
  })
})
