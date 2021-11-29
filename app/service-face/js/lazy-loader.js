const windowHeight = document.documentElement.clientHeight
const deviceWidth = document.documentElement.clientWidth

const $loadWrapper = document.querySelector('.service__inner')
const modalsList = document.querySelector('.modals-list')
let postNumber = 0

const url = (id) => `https://vadim-losenkov.ru/hosp/service-face/data/post-${id}.json`
const preloadTemplate = (index, gradColor) => `
<div data-modal-loader="${index}" class="service__item onloading" data-effect="mfp-zoom-in" >
  <div style="background: ${gradColor ? gradColor : 'none'};" class="service__item-grad grad service-grad item-1"></div>
  <div class="service__item-image"></div>
  <div class="service__item-inner">
    <h4 class="service__item-title"></h4>
    <p class="service__item-text"></p>
    <h6 class="service__item-price"></h6>
  </div>
</div>
`

// https://vadim-losenkov.ru/hosp/
// http://localhost:5500/app

function scrollLoader() {
  const pos = $loadWrapper.getBoundingClientRect().top + pageYOffset
  const height = $loadWrapper.offsetHeight
  const condition = pageYOffset > (pos + height) - windowHeight && !$loadWrapper.classList.contains('loading')
  if (condition && postNumber <= 11) {
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
        lazyLoading(11)
      }, 100);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function lazyLoading(count) {
  for (let i = 0, p = Promise.resolve(); i < count; i++) {
    postNumber++
    const postURL = url(postNumber)
    const condition = postURL && postNumber <= 11

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
    postsCount = 11
  }

  for (let i = 0; i < postsCount; i++) {
    $loadWrapper.insertAdjacentHTML('beforeend', preloadTemplate(i + 1))
  }
  preloadLazy(postsCount)
}

preloader('.faq__inner')

