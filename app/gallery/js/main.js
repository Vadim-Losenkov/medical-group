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
        // top: `${setTop(Number.parseInt($(this).css('top')))}px`,
        // filter: `${$(this).css('filter') ? $(this).css('filter') : `blur(${$(window).width() * 0.1}px)`}`
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


const $buttons = document.querySelectorAll('[data-wave]')
$buttons.forEach($button => $button.addEventListener('click', addElement))

function addElement(e) {
    let addDiv  = document.createElement('div'),
        mValue  = Math.max(this.clientWidth, this.clientHeight),
        rect    = this.getBoundingClientRect();
        sDiv    = addDiv.style,
        px      = 'px';

    sDiv.width  = sDiv.height = mValue + px;
    sDiv.left  = e.clientX - rect.left - (mValue / 2) + px;
    sDiv.top   = e.clientY - rect.top - (mValue / 2) + px;

    addDiv.classList.add('pulse');
    this.appendChild(addDiv);
}

var swiper = new Swiper(".mySwiper", {
  direction: "vertical",
      effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: 'auto',
      autoplay: { delay: 3000, },
      coverflowEffect: {
        rotate: 0,
        stretch: 33,
        depth: 30,
        modifier: 10,
        slideShadows: true
      }
  /* breakpoints: {
    320: {
      direction: "vertical",
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      autoplay: { delay: 3000, },
      coverflowEffect: {
        rotate: 0,
        stretch: 52,
        depth: 20,
        modifier: 10,
        slideShadows: true,
      },
    },
    769: {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      autoplay: { delay: 3000, },
      spaceBetween: 100,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 52,
        depth: 20,
        modifier: 10,
        slideShadows: true,
      },
    }
  } */
});


new WOW().init();
