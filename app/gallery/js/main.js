$(function () {
  $(document.body).addClass('visible')
  $('.header-mobile__burger').on('click', () => {
    $('.header-mobile__burger').toggleClass('open')
    $('.header-mobile__content').toggleClass('open')
  })

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
})


var swiper = new Swiper(".mySwiper", {
  effect: 'coverflow',
  centeredSlides: true,
  slidesPerView: 'auto',
  spaceBetween: 200,
  autoplay: { delay: 3000, },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 30,
    modifier: 10,
  }
});


new WOW().init();
