$(function () {
  $(document.body).addClass('visible')
    const $grad = $('.grad')
    const $grad2 = $('.grad2')
    
    $grad.each(function() {
      // console.log($(this).css('filter') ? $(this).css('filter') : `blur(${$(window).width() * 0.1}px)`)
      $(this).css({
        transition: 'opacity .3s',
        opacity: 1,
      })
    })
    $grad2.each(function() {
      $(this).css({
        transition: 'opacity .3s',
        opacity: 1,
        filter: `blur(${$(window).width() * 0.3}px)`
      })
    })
    $('.header-mobile__nav-link.vis').on('click', () => {
      $('.header-mobile__nav-link.vis').toggleClass('open')
      $('.header-mobile__dropdown').slideToggle(300)
    })
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

var swiper = new Swiper(".mySwiper", {
  direction: "vertical", 
  effect: 'coverflow', 
  grabCursor: true, 
  centeredSlides: true, 
  slidesPerView: 'auto', 
  autoplay: { delay: 3000, }, 
  coverflowEffect: { 
    rotate: 0, 
    stretch: 32, 
    depth: 20, 
    modifier: 10, 
    slideShadows: true, 
  }, 
  breakpoints: { 
    700: { 
      coverflowEffect: { 
        rotate: 0, 
        stretch: 52, 
        depth: 20, 
        modifier: 10, 
        slideShadows: true, 
      } 
    } 
  },
});

new WOW().init();
