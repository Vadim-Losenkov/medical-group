$(function () {
    $('.header-mobile__burger').on('click', () => {
        $('.header-mobile__burger').toggleClass('open')
        $('.header-mobile__box').toggleClass('open')
        $('.header-mobile__content').toggleClass('open')
        $(document.body).toggleClass('open')
    })
    let inter
    let promise = new Promise((resolve, reject) => {
        inter = setInterval(() => {
            const $marker = $('[class*="ymaps-2"][class*="-places-pane"]')[0]
            if ($marker) {
                resolve($marker);
            }
        }, 100);

    });

    promise
        .then(
            $mapMarker => {
                clearInterval(inter)

                $($mapMarker).append('<div class="info"></div>')
                console.log($mapMarker)
            },
            error => {
                console.log(error.message);
            }
        );

})

// ymapsInit.then(res => console.log(res))

// console.log($marker);

// if ($marker) {

// }

// setTimeout(() => {
//     console.log($marker);
//     clearInterval(ymapsInit)
// }, 2000);

/*
ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 100
        }),

        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.8, 37.8]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Метка',
                balloonContent: 'Меня можно перемещать'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'twirl#redStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        }),

        // Создаем метку с помощью вспомогательного класса.
        myPlacemark1 = new ymaps.Placemark([55.8, 37.6], {
            // Свойства.
            // Содержимое иконки, балуна и хинта.
            iconContent: '1',
            balloonContent: 'Балун',
            hintContent: 'Стандартный значок метки'
        }, {
            // Опции.
            // Стандартная фиолетовая иконка.
            preset: 'twirl#violetIcon'
        }),

        myPlacemark2 = new ymaps.Placemark([55.76, 37.56], {
            // Свойства.
            hintContent: 'Собственный значок метки'
        }, {
            // Опции.
            // Своё изображение иконки метки.
            iconImageHref: '/maps/doc/jsapi/2.x/examples/images/myIcon.gif',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-3, -42]
        });
    
    myMap.controls.add('smallZoomControl');
    // Добавляем все метки на карту.
    myMap.geoObjects
        .add(myPlacemark1)
        .add(myPlacemark2)
        .add(myGeoObject);
} */

new Swiper(".swiper-images", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
})