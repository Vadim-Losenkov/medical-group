const items = [
  { 
    coord: [ 55.751244, 37.618423 ],
    obj: {},
    obj2: {
      // Опции
      // Своё изображение иконки метки.
      iconLayout: 'default#image',
      iconImageHref: './map-marker.svg',
      // Размеры метки.
      iconImageSize: [480, 480],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-260, -200],
    },
    text: `Vaja-Pshavela 78a (at the exit of Vazha-Pshavela metro station)`
  },
  { 
    coord: [ 48.864716, 2.349014 ],
    obj: {},
    obj2: {
      // Опции
      // Своё изображение иконки метки.
      iconLayout: 'default#image',
      iconImageHref: './map-marker.svg',
      // Размеры метки.
      iconImageSize: [480, 480],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-260, -200],
    },
    text: 'город 1'
  },
  { 
    coord: [ 34.052235, -118.243683 ],
    obj: {},
    obj2: {
      // Опции
      // Своё изображение иконки метки.
      iconLayout: 'default#image',
      iconImageHref: './map-marker.svg',
      // Размеры метки.
      iconImageSize: [480, 480],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-260, -200],
    },
    text: 'город 2'
  },
  { 
    coord: [ 59.9386, 30.3141 ],
    obj: {},
    obj2: {
      // Опции
      // Своё изображение иконки метки.
      iconLayout: 'default#image',
      iconImageHref: './map-marker.svg',
      // Размеры метки.
      iconImageSize: [480, 480],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-260, -200],
    },
    text: 'город 3'
  },
];

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

    $('[data-index]').click(function () {
      const destination = $('#map').offset().top;
      $('html, body').animate({ scrollTop: destination }, 200)
    });
    
    
    
    
    if (ymaps) {
      
      let inter
      let promise = new Promise((resolve, reject) => {
          inter = setInterval(() => {
              const $marker = $('[class*="ymaps-2"][class*="-image"]')
              if ($marker[0]) {
                  resolve($marker);
              }
          }, 100);
    
      });
    
      promise
          .then(
              $mapMarker => {
                  clearInterval(inter)
    
                  $($mapMarker).each(function(index) {
                    console.log(items[index]);
                    $(this).append(`<div class="info">
                                      ${items[index].text}
                                      <div id="player">
                                        <div id="outer">
                                          <div id="inner"></div>
                                        </div>
                                      </div>
                                    </div>`)
                  })
                  console.log($mapMarker)
              },
              error => {
                  console.log(error.message);
              }
          );
      }
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

if (ymaps) {
  
  ymaps.ready(init)
  function init() {
  // 2edcc8c3-2f38-48da-8de9-95e6078163c0
  // https://vc.ru/design/117708-delaem-cherno-beluyu-kartu-yandeks-dlya-sayta-i-marker-lyuboy-kartinkoy
  var myMap = new ymaps.Map("map", {
      center: [55.751244, 37.618423],
      zoom: 12
    })
  
  
  // Добавляем все метки на карту.
  items.forEach(n => {
      myMap.geoObjects.add(new ymaps.Placemark(n.coord, n.obj1, n.obj2))
    });
    myMap.behaviors.disable('scrollZoom')
    
    const buttons = document.querySelector('#buttons');
  
    buttons.addEventListener('click', (event) => {
      const $target = event.target.closest('[data-index]')
      if ($target) {
        myMap.setCenter(items[$target.dataset.index].coord);
      }
    });
    
  }
}
