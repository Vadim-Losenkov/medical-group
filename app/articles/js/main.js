$(function () {
  $(document.body).addClass('visible')

  const $grad = $('.grad')
  const $grad2 = $('.grad2')

  $grad.each(function () {
    // console.log($(this).css('filter') ? $(this).css('filter') : `blur(${$(window).width() * 0.1}px)`)
    $(this).css({
      transition: 'opacity .3s',
      opacity: 1,
      // top: `${setTop(Number.parseInt($(this).css('top')))}px`,
      // filter: `${$(this).css('filter') ? $(this).css('filter') : `blur(${$(window).width() * 0.1}px)`}`
    })
  })
  $grad2.each(function () {
    $(this).css({
      transition: 'opacity .3s',
      opacity: 1,
      // top: `${setTop(Number.parseInt($(this).css('top')))}px`,
      filter: `blur(${$(window).width() * 0.3}px)`
    })
  })
  $('.articles__inner').magnificPopup({
    delegate: '.articles__item',
    type: 'inline',

    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });
})

const headerButton = document.querySelector('.header-mobile__burger')
const headerContent = document.querySelector('.header-mobile__content')
headerButton.addEventListener('click', () => {
  headerButton.classList.toggle('open')
  headerContent.classList.toggle('open')
})

const serviceButton = document.querySelector('#service-button')
const serviceContent = document.querySelector('#service-dropdown')
serviceButton.addEventListener('click', () => {
  serviceContent.classList.toggle('active')
})


const $buttons = document.querySelectorAll('[data-wave]')
$buttons.forEach($button => $button.addEventListener('click', addElement))

function addElement(e) {
  let addDiv = document.createElement('div'),
    mValue = Math.max(this.clientWidth, this.clientHeight),
    rect = this.getBoundingClientRect();
  sDiv = addDiv.style,
    px = 'px';

  sDiv.width = sDiv.height = mValue + px;
  sDiv.left = e.clientX - rect.left - (mValue / 2) + px;
  sDiv.top = e.clientY - rect.top - (mValue / 2) + px;

  addDiv.classList.add('pulse');
  this.appendChild(addDiv);
}

// new WOW().init();

//1
//2
// в файле post-10 лежит пост с айдишником 11, так надо!!!!
