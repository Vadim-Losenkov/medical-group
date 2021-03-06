const windowHeight = document.documentElement.clientHeight
const deviceWidth = document.documentElement.clientWidth

const $loadWrapper = document.querySelector('.service__inner')
const modalsList = document.querySelector('.modals-list')
let postNumber = 0

// https://vadim-losenkov.ru/hosp/
// const url = (id) => `https://61b3a14eaf5ff70017ca2023.mockapi.io/service-face/${id}`
const url = (id) => `../service-face/data/post-${id}.json`
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
  if (condition && postNumber <= 18) {
    $loadWrapper.classList.add('loading')
    if (deviceWidth < 980) {
      setTimeout(() => {
        lazyLoading(6)
      }, 100);
    } else if (deviceWidth <= 1200) {
      setTimeout(() => {
        lazyLoading(6)
      }, 100);
    } else if (deviceWidth > 1200) {
      setTimeout(() => {
        lazyLoading(18)
      }, 100);
    }
  }
}

const request = url => new Promise((resolve, reject) => {
  axios.get(url).then((resp) => {
    setTimeout(() => {
      resolve(resp)
    }, 10)
  })
})

function lazyLoading(count) {
  for (let i = 0, p = Promise.resolve(); i < count; i++) {
    postNumber++
    const postURL = url(postNumber)
    const condition = postURL && postNumber <= 18

    if (condition && $loadWrapper.classList.contains('loading')) {
      p = p.then(() => request(postURL))
         .then((resp) => {
             $loadWrapper.insertAdjacentHTML('beforeend', resp.data.post)
             modalsList.insertAdjacentHTML('beforeend', resp.data.modal)
         })
    }
  }
  $loadWrapper.classList.remove('loading')
}
function preloadLazy(count) {
  const $elements = $loadWrapper.querySelectorAll(`[data-modal-loader]`)
  $elements.forEach($el => {
    $el.parentNode.removeChild($el)
  })
  console.log(count);
  for (let i = 0, p = Promise.resolve(); i < count; i++) {
    postNumber++
    
    p = p.then(() => request(url(i + 1)))
         .then((resp) => {
             $loadWrapper.insertAdjacentHTML('beforeend', resp.data.post)
             modalsList.insertAdjacentHTML('beforeend', resp.data.modal)

             if (i === count - 1) {
              window.addEventListener('scroll', scrollLoader)
            }
         })
  }
}

function preloader(selector) {
  let postsCount = 6

  if (deviceWidth < 980) {
    postsCount = 6
  } else if (deviceWidth <= 1200) {
    postsCount = 6
  } else if (deviceWidth > 1200) {
    postsCount = 18
  }

  for (let i = 0; i < postsCount; i++) {
    $loadWrapper.insertAdjacentHTML('beforeend', preloadTemplate(i + 1))
  }
  preloadLazy(postsCount)
}
preloader('.faq__inner')

/* const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
for (let i = 0, p = Promise.resolve(); i < 12; i++) {
  p = p.then(() => delay(1000))
       .then(() => {
        axios.get(`http://localhost:8003/service-face/data/post-${i}.json`).then((resp) => {
          axios.post('https://61b3a14eaf5ff70017ca2023.mockapi.io/service-face', resp.data)
        })
       })
} */