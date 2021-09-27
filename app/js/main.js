$(function() {
  $('.header-mobile__burger').on('click', () => {
    $('.header-mobile__burger').toggleClass('open')
    $('.header-mobile__box').toggleClass('open')
    $('.header-mobile__content').toggleClass('open')
    $(document.body).toggleClass('open')
  })
})

new Swiper(".swiper-images", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
})