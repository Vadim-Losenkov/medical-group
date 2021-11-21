const windowHeight = document.documentElement.clientHeight
const deviceWidth = document.documentElement.clientWidth

const $loadWrapper = document.querySelector('.articles__inner')
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

window.addEventListener('scroll', scrollLoader)

function scrollLoader() {
  const pos = $loadWrapper.getBoundingClientRect().top + pageYOffset
  const height = $loadWrapper.offsetHeight
  const condition = pageYOffset > (pos + height) - windowHeight && !$loadWrapper.classList.contains('loading')
  if (condition && postNumber <= 18) {
    $loadWrapper.classList.add('loading')
    if (deviceWidth < 980) {
      lazyLoading(1)
    }
    if (deviceWidth <= 1393) {
      lazyLoading(1)
    }
    if (deviceWidth > 1393) {
      lazyLoading(1)
    }
  }
}

function lazyLoading(count) {
  for (let i = 0; i < count; i++) {
    postNumber++
    if (url(postNumber) && postNumber <= 18) {
      axios.get(url(postNumber)).then((resp) => {
        $loadWrapper.insertAdjacentHTML('beforeend', resp.data.post)
        modalsList.insertAdjacentHTML('beforeend', resp.data.modal)
      })
    }
  }
  setTimeout(function() {
    $loadWrapper.classList.remove('loading')
  }, 3000);
}

function preloadLazy(count) {
  for (let i = 0; i < count; i++) {
    postNumber++

    const $el = $loadWrapper.querySelector(`[data-modal-loader="${i + 1}"]`)

    axios.get(url(i + 1)).then((resp) => {
      $el && $el.parentNode.removeChild($el)

      $loadWrapper.insertAdjacentHTML('beforeend', resp.data.post)
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
    $loadWrapper.insertAdjacentHTML('beforeend', preloadTemplate(i + 1))
  }

  preloadLazy(postsCount)
}

preloader('.service__inner')

// переписать выов модалки!!!!!