
const windowHeight = document.documentElement.clientHeight
const deviceWidth = document.documentElement.clientWidth

const $loadWrapper = document.querySelector('.articles__inner')
const modalsList = document.querySelector('.modals-list')
let postNumber = 0
// https://vadim-losenkov.ru/hosp
const url = (id) => `https://vadim-losenkov.ru/hosp/articles/data/post-${id}.json`
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

function scrollLoader() {
  const pos = $loadWrapper.getBoundingClientRect().top + pageYOffset
  const height = $loadWrapper.offsetHeight
  const condition = pageYOffset > (pos + height) - windowHeight && !$loadWrapper.classList.contains('loading')
  if (condition && postNumber <= 18) {
    $loadWrapper.classList.add('loading')
    if (deviceWidth < 980) {
      setTimeout(() => {
        lazyLoading(3)
      }, 100);
    } else if (deviceWidth <= 1393) {
      setTimeout(() => {
        lazyLoading(4)
      }, 100);
    } else if (deviceWidth > 1393) {
      setTimeout(() => {
        lazyLoading(18)
      }, 100);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function lazyLoading(count) {
  for (let i = 0, p = Promise.resolve(); i < count; i++) {
    postNumber++
    const postURL = url(postNumber)
    const condition = postURL && postNumber <= 18

    if (condition && $loadWrapper.classList.contains('loading')) {
      p = p.then(() => delay(10))
           .then(() => axios.get(postURL).then((resp) => {
             $loadWrapper.insertAdjacentHTML('beforeend', resp.data.post)
             modalsList.insertAdjacentHTML('beforeend', resp.data.modal)
           }))
    }
  }
  $loadWrapper.classList.remove('loading')
}

function preloadLazy(count) {
  const $elements = $loadWrapper.querySelectorAll(`[data-modal-loader]`)
  $elements.forEach($el => {
    $el.parentNode.removeChild($el)
  })

  for (let i = 0, p = Promise.resolve(); i < count; i++) {
    postNumber++
    
    p = p.then(() => delay(10))
         .then(() => axios.get(url(i + 1)).then((resp) => {
          // $el && $el.parentNode.removeChild($el)
    
          $loadWrapper.insertAdjacentHTML('beforeend', resp.data.post)
          modalsList.insertAdjacentHTML('beforeend', resp.data.modal)

          if (i === count - 1) {
            window.addEventListener('scroll', scrollLoader)
          }
        }))
  }
}

function preloader(selector) {
  let postsCount = 6

  if (deviceWidth < 980) {
    postsCount = 3
  } else if (deviceWidth <= 1393) {
    postsCount = 4
  } else if (deviceWidth > 1393) {
    postsCount = 18
  }

  for (let i = 0; i < postsCount; i++) {
    $loadWrapper.insertAdjacentHTML('beforeend', preloadTemplate(i + 1))
  }
  preloadLazy(postsCount)
}

preloader('.articles__inner')
