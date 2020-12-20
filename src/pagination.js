const classes = require('./utils/classes')
const events = require('./utils/events')

const List = require('./index')

const is = {
  number(i, left, right, currentPage, innerWindow) {
    return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow)
  },
  left(i, left) {
    return i <= left
  },
  right(i, right) {
    return i > right
  },
  innerWindow(i, currentPage, innerWindow) {
    return i >= currentPage - innerWindow && i <= currentPage + innerWindow
  },
  dotted(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
    return (
      this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) ||
      this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem)
    )
  },
  dottedLeft(pagingList, i, left, right, currentPage, innerWindow) {
    return i === left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right)
  },
  dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
    if (pagingList.items[currentPageItem - 1].values().dotted) {
      return false
    }
    return i === right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right)
  },
}

module.exports = function (list) {
  let isHidden = false

  const refresh = function (pagingList, options) {
    if (list.page < 1) {
      list.listContainer.style.display = 'none'
      isHidden = true
      return
    } else if (isHidden) {
      list.listContainer.style.display = 'block'
    }

    let item
    const l = list.matchingItems.length
    const index = list.i
    const { page } = list
    const pages = Math.ceil(l / page)
    const currentPage = Math.ceil(index / page)
    const innerWindow = options.innerWindow || 2
    const left = options.left || options.outerWindow || 0
    let right = options.right || options.outerWindow || 0

    right = pages - right
    pagingList.clear()
    for (let i = 1; i <= pages; i++) {
      const className = currentPage === i ? 'active' : ''

      // console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow), className);

      if (is.number(i, left, right, currentPage, innerWindow)) {
        item = pagingList.add({
          page: i,
          dotted: false,
        })[0]
        if (className) {
          classes(item.elm).add(className)
        }
        item.elm.firstChild.setAttribute('data-i', i)
        item.elm.firstChild.setAttribute('data-page', page)
      } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
        item = pagingList.add({
          page: '...',
          dotted: true,
        })[0]
        classes(item.elm).add('disabled')
      }
    }
  }

  return function (options) {
    const pagingList = new List(list.listContainer.id, {
      listClass: options.paginationClass || 'pagination',
      item: options.item || "<li><a class='page' href='#'></a></li>",
      valueNames: ['page', 'dotted'],
      searchClass: 'pagination-search-that-is-not-supposed-to-exist',
      sortClass: 'pagination-sort-that-is-not-supposed-to-exist',
    })

    events.bind(pagingList.listContainer, 'click', function (e) {
      const target = e.target || e.srcElement
      const page = list.utils.getAttribute(target, 'data-page')
      const i = list.utils.getAttribute(target, 'data-i')
      if (i) {
        list.show((i - 1) * page + 1, page)
      }
    })

    list.on('updated', function () {
      refresh(pagingList, options)
    })
    refresh(pagingList, options)
  }
}
