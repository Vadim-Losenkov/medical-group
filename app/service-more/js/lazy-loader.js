const windowHeight = document.documentElement.clientHeight
const deviceWidth = document.documentElement.clientWidth

const $loadWrapper = document.querySelector('.service__inner')
const modalsList = document.querySelector('.modals-list')
let postNumber = 0

const url = (id) => `https://vadim-losenkov.ru/hosp/service-more/data/post-${id}.json`
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

window.addEventListener('scroll', scrollLoader)

function scrollLoader() {
  const pos = $loadWrapper.getBoundingClientRect().top + pageYOffset
  const height = $loadWrapper.offsetHeight
  const condition = pageYOffset > (pos + height) - windowHeight && !$loadWrapper.classList.contains('loading')
  if (condition && postNumber <= 6) {
    $loadWrapper.classList.add('loading')
    if (deviceWidth < 980) {
      lazyLoading(3)
    } else if (deviceWidth <= 1393) {
      lazyLoading(4)
    } else if (deviceWidth > 1393) {
      lazyLoading(6)
    }
  }
}

function lazyLoading(count) {
  for (let i = 0; i < count; i++) {
    postNumber++
    const postURL = url(postNumber)
    
    const condition = postURL && postNumber <= 6

    if (condition && $loadWrapper.classList.contains('loading')) {
      axios.get(postURL).then((resp) => {
        console.log(postURL);
        $loadWrapper.insertAdjacentHTML('beforeend', resp.data.post)
        modalsList.insertAdjacentHTML('beforeend', resp.data.modal)
      })
    }
  }
  $loadWrapper.classList.remove('loading')
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

preloader('.articles__inner')
