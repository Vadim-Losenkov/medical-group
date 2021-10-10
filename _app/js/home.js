$(function () {
  $(document.body).addClass('visible')
    $('.header-mobile__burger').on('click', () => {
        $('.header-mobile__burger').toggleClass('open')
        $('.header-mobile__box').toggleClass('open')
        $('.header-mobile__content').toggleClass('open')
        $(document.body).toggleClass('open')
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
        // top: `${setTop(Number.parseInt($(this).css('top')))}px`,
        filter: `blur(${$(window).width() * 0.3}px)`
      })
    })
})


new Swiper(".swiper-images", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: { delay: 3000, }
})

new WOW().init();
