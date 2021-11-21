const windowHeight = document.documentElement.clientHeight
const deviceWidth = document.documentElement.clientWidth

const firstArticlesBlock = document.querySelector('.articles__inner')
const modalsList = document.querySelector('.modals-list')
let postNumber = 0

const url = (id) => `http://localhost:1234/articles-lazyloading/data/post-${id}.json`
const preloadTemplate = (index) => `
  <div data-modal-loader="${index}" class="articles__item loading">
    <div class="articles__item-inner">
      <div class="articles__item-button"></div>
      <h4 class="articles__item-title"></h4>
      <p class="articles__item-text"></p>
    </div>
    <div class="articles__item-footer"></div>
  </div>
`

const offer = document.querySelector('.service__block')

// window.addEventListener('scroll', scrollLoader)

/* function scrollLoader() {
  const k = 20 * postNumber
  if (((window.scrollY + document.documentElement.clientHeight) > offer.clientHeight) && !offer.classList.contains('loading')) {
    offer.classList.add('loading')
    if (deviceWidth < 980) {
      lazyLoading(3)
    }
    if (deviceWidth <= 1393) {
      lazyLoading(4)
    }
    if (deviceWidth > 1393) {
      lazyLoading(6)
    }
  }
}

function lazyLoading(count) {
  for (let i = 0; i < count; i++) {
    postNumber++
    if (url(postNumber)) {
      axios.get(url(postNumber)).then((resp) => {
        firstArticlesBlock.insertAdjacentHTML('beforeend', resp.data.post)
        modalsList.insertAdjacentHTML('beforeend', resp.data.modal)
      })
    }
  }
  offer.classList.remove('loading')
}
*/
function preloadLazy(count) {
  for (let i = 0; i < count; i++) {
    postNumber++

    const $el = firstArticlesBlock.querySelector(`[data-modal-loader="${i + 1}"]`)

    axios.get(url(i + 1)).then((resp) => {
      $el && $el.parentNode.removeChild($el)

      firstArticlesBlock.insertAdjacentHTML('beforeend', resp.data.post)
      modalsList.insertAdjacentHTML('beforeend', resp.data.modal)
    })
  }
}

function preloader(selector) {
  let postsCount = 6

  if (deviceWidth < 980) {
    postsCount = 3
  } else if (deviceWidth <= 1393) {
    postsCount = 4
  } else if (deviceWidth > 1393) {
    postsCount = 6
  }

  for (let i = 0; i < postsCount; i++) {
    firstArticlesBlock.insertAdjacentHTML('beforeend', preloadTemplate(i + 1))
  }

  preloadLazy(postsCount)
}

preloader('.service__inner')