$(function () {
  $(document.body).addClass('visible')
    $('.header-mobile__burger').on('click', () => {
        $('.header-mobile__burger').toggleClass('open')
        $('.header-mobile__content').toggleClass('open')
    })
    
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
    stretch: 40,
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
