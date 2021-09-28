$(function() {
  $('.header-mobile__burger').on('click', () => {
    $('.header-mobile__burger').toggleClass('open')
    $('.header-mobile__box').toggleClass('open')
    $('.header-mobile__content').toggleClass('open')
    $(document.body).toggleClass('open')
  })
})

function initMap() {
  var coordinates = {lat: 47.212325, lng: 38.933663},

      map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates
      }),

      marker = new google.maps.Marker({
          position: coordinates,
          map: map,
          animation: google.maps.Animation.BOUNCE
      });
}

new Swiper(".swiper-images", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
})