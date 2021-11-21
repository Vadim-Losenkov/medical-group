// нужно написать функцию, 
// которая позволяет получать текущий блок 
// и грузить контент в него

// эти 3 блока должны ьыть в хтмл
// и последние 2 блока с дисплей нон,
// но когда приходит ответ с сервера мы
// рендерим эти блоки вмесие с контентом

// ПЕРЕПИСАТЬ JSON НА ХТМЛ И РЕНДЕРИТЬ ЕГО ВМЕСТО JSON ШАБЛОНА!!!!!!!!!!

const firstArticlesBlock = document.querySelector('.service__inner')
const modalsList = document.querySelector('.modals-list')
let postNumber = 0

const url = (id) => `http://localhost:1234/service-lazyloading/js/post-${id}.json`
const textLoader = (text) => text.map(t => `<p class="service-popup__text">${t}</p>`).join('')
const template = (obj, index) => `
  <div id="service-modal-${index}" class="service-popup mfp-with-anim mfp-hide">
      <img src="${obj.image}" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ${obj.title}
          </h5>
          <div class="service-popup__price">
            ${obj.price} <span>დოლარიდან</span>
          </div>
        </div>
        ${textLoader(obj.text)}
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
`

const postTemplate = (obj, index) => `
   <a href="#service-modal-${index}" data-modal-loader="1"  class="service__item" data-effect="mfp-zoom-in" >
    <div style="background-color: #855aff;" class="service__item-grad grad service-grad item-1"></div>
    <div class="service__item-image">
      <img src="${obj.image}" alt="">
    </div>
    <div class="service__item-inner">
      <h4 class="service__item-title">
        ${obj.title}
      </h4>
      <p class="service__item-text">
        ${obj.text}
      </p>
      <h6 class="service__item-price">
        ${obj.price} <span>დოლარიდან</span>
      </h6>
    </div>
  </a>
`

const preloadTemplate = (index, gradColor) => `
<div data-modal-loader="${index}" class="service__item onloading" data-effect="mfp-zoom-in" >
  <div style="background: ${gradColor ? gradColor : 'none'};" class="service__item-grad grad service-grad item-1"></div>
  <div class="service__item-image"></div>
  <div class="service__item-inner">
    <h4 class="service__item-title"></h4>
    <p class="service__item-text"></p>
    <h6 class="service__item-price"></h6>
  </div>
</div>
`

function preloadLazy(count) {
  for (let i = 0; i < count; i++) {
    postNumber++
    
    const $el = firstArticlesBlock.querySelector(`[data-modal-loader="${i + 1}"]`)
    
    axios.get(url(i + 1)).then((resp) => {
      $el.parentNode.removeChild($el)
      
      firstArticlesBlock.insertAdjacentHTML('beforeend', postTemplate(resp.data.post, (i + 1)))
      modalsList.insertAdjacentHTML('beforeend', template(resp.data.modal, (i + 1)))
    })
  }
}

// грузим заглушки в 1й блок articles__inner
function preloader(selector) {
  const deviceWidth = document.documentElement.clientWidth
  
  if (deviceWidth < 980) {
    for (let i = 0; i < 3; i++) {
      // нужна функция которая подгружает определенное кол-в
      firstArticlesBlock.insertAdjacentHTML('beforeend', preloadTemplate(i + 1))
    }
    preloadLazy(3)
  } else if (deviceWidth <= 1393) {
    for (let i = 0; i < 4; i++) {
      firstArticlesBlock.insertAdjacentHTML('beforeend', preloadTemplate())
    }
    
    preloadLazy(4)
  } else if (deviceWidth > 1393) {
    for (let i = 0; i < 6; i++) {
      firstArticlesBlock.insertAdjacentHTML('beforeend', preloadTemplate())
    }
    
    preloadLazy(6)
  }
}

// грузим модалки
function modalsLoader(wrapperSelector, articlesSelector) {
  const $wrapper = document.querySelector(wrapperSelector)
  const $service = document.querySelector(articlesSelector)

  axios.get(url(1)).then(function (resp) {
    $wrapper.innerHTML = template(resp.data)
  })

  /* const $target = event.target.closest('[data-modal-loader]')
  if ($target) {
    const $id = $target.dataset.modalLoader
    axios.get(url($id)).then(function(resp) {
      $wrapper.innerHTML = template(resp.data)
    })
  }
  $service.addEventListener('click', (event) => {
  }) */
}


preloader('.service__inner')
// modalsLoader('.modals-list', '.service')

// нужна функция, которая получает объект 
// со статьей и модалкой 
// и грузит это вместо заглушки
/* setTimeout(() => {
modalsLoader('.modals-list', `
    <div id="service-modal-1" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            პლაზმოლიფტინგი
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          პროცედურა გულისხმობს საკუთარი სისხლისაგან მიღებული, თრომბოციტებით მდიდარი პლაზმის შეყვანას კანქვეშ, ანუ  სასურველი ეფექტის მიღწევა ( კანის გაახალგაზრდავება და გალამაზება) ხდება საკუთარი  ფერმენტების ხარჯზე.
        </p>
        <p class="service-popup__text">
          კანქვეშ პლაზმის შეყვანის შედეგად ხდება ჰიალურონის მჟავის და კოლაგენის გამომუშავების, ტროფიკის და ნივთიერებათა ცვლის გააქტიურება, ადგილობრივად რეზისტენტობის და იმუნიტეტის ზრდა. შედეგად ვღებულობთ ელასტიურ, ჯანსაღი ფერის და ნორმალური ტენიანობის, გაახალგაზრდავებულ კანს. მცირდება ან სრულიად ქრება ნაოჭების რაოდენობა.
        </p>

        <p class="service-popup__text">
          აკნეს ( გამონაყრების) შემთხვევაში პლაზმის შეყვანა ხდება გამონაყრის ადგილებში, რის შემდეგაც გამონაყარი ლაგდება სწრაფად და უკვალოდ (არ რჩება ლაქები).
        </p>

        <p class="service-popup__text">
          ღრმა ნაოჭების შემთხვევაში პლაზმის გამოყენება შესაძლებელია ფილერის სახით ( შემავსებელი ჟელეს) ნაოჭების ამოსავსებად.
        </p>

        <p class="service-popup__text">
          თმის ცვენის შემთხვევაში პროცედურა ააქტიურებს თმის ძირების კვებას, შედეგად მცირდება თმის ცვენის ინტენსივობა და იმატებს ახალი ღერების ამოსვლის ინტენსივობა.
        </p>

        <p class="service-popup__text">
          მისი გამოყენება მიზანშეწონილია ასევე კანის უსიამოვნო ფერის, დაღლილი კანის ( განსაკუთრებით მწეველებში), მოდუნებული კანის, ნაწიბურების, ფოტოდაბერების ( ლაქები და გამომშრალი კანი), შემთხვევაში. პლაზმოლიფტინგი ეფექტურია ნაოჭებთან საბრძოლველად, რაც მთავარია აქვს ხანგრძლივმომქმედი კანის ლიფტინგის ეფექტი (1.5-2 წელი).
        </p>

        <p class="service-popup__text">
          პლაზმოლიფგინგი შესაძლებელია ჩატარდეს სახის, ყელის, გულმკერდის, ზურგის მიდამოში, თავის თმიან ნაწილში, ხელის მტევნებზე.
        </p>

        <p class="service-popup__text">
          მისი უპირატესობებია:
        </p>

        <p class="service-popup__text">
          - აბსოლუტურად უსაფრთხოა, გამორიცხულია ალერგიული რეაქციები და ინფექციური გართულებები, რადგან კანქვეშ მხოლოდ საკუთრი პალაზმის შეყვანა ხდება.
        </p>

        <p class="service-popup__text">
          - ახასიათებს მაღალი ეფექტურობა, რადგან ორგანიზმი ყველაზე აქტიურად რეაგირებს საკუთარ პლაზმაზე.
        </p>

        <p class="service-popup__text">
          - არ ახდენს კუნთების ბლოკირებას მოქმედების არეში.
        </p>

        <p class="service-popup__text">
          პროცედურა ტარდება მეზოთერაპიის მსგავსად ატრავმული მიკროინექციებით, ადგილობრივი გაუტკივარებით. არ აქვს ასაკობრივი შეზღუდვა.
        </p>

        <p class="service-popup__text">
          უკუჩვენებებია: ორსულობა და ლაქტაციის პერიოდი, მწვავე, ცხელებით მიმდინარე  დაავადებები, ჰემოფილია, ნეფროპათია.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-2" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ბიორევიტალიზაცია
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          ბიორევიტალიზაცია კანის ბუნებრივი გზით გაახალგაზრდავების მეთოდია. იგი წარმოადგენს ინექციურ მეთოდს, რომლის დროსაც კანქვეშ ხდება ბიოლოგიურად აქტიური კომპონენტების შეყვანა. ძირითადად, ბიორევიტალიზაციისთვის გამოიყენება ჰიალურონის მჟავას (რომელსაც ბუნებრივადაც შეიცავს კანი) შემცველი პრეპარატები.
          მისი საშუალებით შესაძლებელია კანის სტრუქტურის აღდგენა, იგი ხდება გლუვი, ელასტიური. პარალელურად, ხორციელდება ფიბრობლასტების ფუნქციონირების ბუნებრივი სტიმულირება( ძლიერდება კოლაგენისა და ელასტინის სითეზი, რაც განაპირობებს კანის ელასტიურობისა და სიმკრივის აღდგენას).
        </p>
        <p class="service-popup__text">
          მეთოდი აუმჯობესებს კანის ფერს, მის რელიეფს, ალაგებს ნაოჭებს, ამცირებს ჰიპერპიგმენტაციის ინტენსივობას. შესაძლებელია მისი გამოყენება ნაწიბურებისა და სტრიების ასალაგებლად.
        </p>

        <p class="service-popup__text">
          ბიორევიტალიზაცია ნაჩვენებია შემდეგი ნოზოლოგიების დროს:
        </p>

        <p class="service-popup__text">
          -მოდულებული და გამომშრალი კანი,
          <br>
          -კანის ელასტიურობისა და ტურგორის შემცირება,
          <br>
          -კანის ნაადრევი დაბერების სიმპტომები, გამოწვეული თამბაქოს, სტრესის, მზის სხივების და სხვა ფაქტორების ზემოქმედებით.
          <br>
          -სხვადასხვა სახის პლასტიკური ოპერაციის შემდგომი რეაბილიტაციის პერიოდი,
          <br>
          -პიგმენტაცია.
        </p>

        <p class="service-popup__text">
          პროცედურა უმტკივნეულოა, ახასიათებს მაღალი ეფექტურობა და სწრაფი ეფექტი, არ საჭიროებს რეაბილიტაციის პერიოდს.
        </p>

        <p class="service-popup__text">
          გთხოვთ გაითვალისწინოთ, რომ ამ მეთოდის გამოყენება უკუნაჩვენებია შემდეგი ნოზოლოგიების დროს:
        </p>
        <p class="service-popup__text">
          -ანთებითი პროცესების არსებობა იმ მონაკვეთზე, სადაც სასურველია პროცედურის ჩატარება,
          - მძიმე ქრონიკული დაავადებები,
          <br>
          -ორსულობა და ლაქტაციის პერიოდი,
          <br>
          - პრეპარატის კომპონენტების მიმართ ინდივიდუალური მგრძნობელობა,
          <br>
          -ავტოიმუნური დაავადებები,
          <br>
          -ანტიკოაგულანტების მიღება,
          <br>
          - კელოიდური ნაწიბურების წარმოქმნის მიმართ მიდრეკილება,
          <br>
          -მწვავე ჰერპესული ინფექცია.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-3" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            მეზოთერაპია
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          მეზოთერაპია მთელს მსოფლიოში ფართოდ გამოიყენება სამკურნალო და ესთეტიურ მედიცინაში. როგორც მეთოდის ავტორი, მიშელ პისტორი განმარტავს (მან პროცედურა 1952 წელს დანერგა), ეს არის პროცედურა რომელიც ლაკონურად შესაძლებელია დაახასიათო სამი მაჩვენებლით : იშვიათად, მცირე დოზებით და საჭირო ადგილზე... ამ შემთხვევაში, იშვიათი ნიშნავს პროცედურის  ჩატარების შესაძლებლობას საშუალებას დროის ხანგრძლივი ინტერვალებით, მცირედ - პრეპარატის შეყვანას მიკროდოზებით და რა თქმა უნდა, საჭირო ადგილას  პრეპარატის დეპოს შექმნის მიზნით, რაც ქმნის მეთოდის გახანგრძლივებულ ეფექტს.
        </p>
        <p class="service-popup__text">
          პრეპარატი შეყვანა ხდება კანის სხვადასხვა ფენაში ან კანქვეშ, არსებული პრობლემიდან გამომდინარე.
        </p>

        <p class="service-popup__text">
          ჩატარებული პროცედურის შედეგი და მისი შემგომი ეფექტურობა დამოკიდებულია გამოყენებული პრეპარატის ხარისხზე და რა თქმა უნდა, სპეციალისტის პროფესიონალიზმზე.
        </p>

        <p class="service-popup__text">
          ჩვენი კლინიკის  არსენალშია როგორც ტრადიციული ფარმაკოლოგიური ( ალოპათიური) მსოფლიოში ცნობილი მწარმოებლების მიერ მოწოდებული პრეპარატები ვიტამინების, ამინომჟავების, მიკროელემენტების შემცველობით,   ასევე ფიტოთერაპიული, ქიმიოთერაპიული და ცხოველური წარმოშობის პრეპარატები, მზა კოქტეილები და  ჰომეოპათიური საშუალებები.
        </p>

        <p class="service-popup__text">
          მეზოთერაპიის გამოყენება მიზანშეწონილია კუპეროზის ( კანზე გამოხატული კაპილარული ქსელი), ცხიმიანი და ფოროვანი კანის, პიგმენტური ლაქების, კანის ასაკობრივი ცვლილებების - გრავიტაციული ფტოზი, ნაოჭები, მოდუნებული და გამომშრალი კანი, ნაწიბურების, აკნეს და პოსტაკნეს, სტრიების, ზედმეტი ცხიმის და ცელულიტის, თმის ცვენის ( მიზეზის მიხედვით), პილინგის შემდგომი პერიოდის, მეორე ნიკაბის (ღაბაბის), დაღლილი თვალის სინდრომის დროს.
        </p>

        <p class="service-popup__text">
          კოქტეილის შეყვანისთანავე, შესაბამის უბანში, იწყება უჯრედების და კანის კვების, კანში მიკროცირკულაციის აღდგენა, აქტიურდება ნივთიერებათა ცვლა, უმჯობესდება ლიმფის მიმოქცევა, მცირდება შეშუპება, ქსოვილში მატულობს ჰიალურონის მჟავასა და კოლაგენის გამომუშავება, ხდება კანის მექანიკური სტიმულაცია, ასევე, ცელულიტის დროს ხდება პრეპარატის ზემოქმედებით ცხიმოვანი უჯრედების დაშლა. შედეგად ხდება კანის ფერის გაუმჯობესება, იგი ხდება გლუვი, მკვრივი და ელასტიური, სახეზეა ლაქების გაქრობა, სახის ოვალის აღდგენა, ცელულიტის ალაგება, თმის ცვენის შეჩერება, ნაწიბურების და ნაოჭების, აკნეს და როზაცეას ალაგება, სტრიების შემცირება/ალაგება.
        </p>

        <p class="service-popup__text">
          პრეპარატი შეირჩევა ინდივიდუალურად,ასევე პაციენტის სურვილის მიხედვით. პროცედურა ტარდება მიკროინექციებით; პაციენტის სურვილით შესაძლებელია ადგილობრივი ანესთეზია.
        </p>

        <p class="service-popup__text">
          პროცედურა უკუნაჩვენებია: ორსულობის, მწვავე ცხელებითი დაავადებების, ჰემოფილიის, ნეფროპათიის, პრეპარატების კომპონენტების მიმართ ინდივიდუალური მგრძნობელობის დროს.
        </p>

        <p class="service-popup__text">
          პროცედურა არ საჭიროებს წინასწარ მომზადებას, არ აქვს ასაკობრივი ცენზი.
        </p>

        <p class="service-popup__text">
          შესაძლებელია ჩატარდეს სახის, ყელის, გულმკერდის, თავის თმიან ნაწილში, ხელის მტევნებზე, სახსრების მიდამოში.
        </p>

        <p class="service-popup__text">
          პროცედურების რაოდენობა დამოკიდებულია საწყის მდგომარეობასა და სასურველ შედეგზე.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-4" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ფოტონოთერაპია
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          ფოტონოთერაპია  კანის აღმდგენი, ერთ-ერთი ყველაზე ეფექტური მეთოდია.
        </p>
        <p class="service-popup__text">
          იგი არაპოერაციული, აბსოუტურად უმტკივნეულო პროცედურაა, არ გამოყოფს სითბურ ენერიას და აბსოლუტურად არ აზიანებს კანს. ფოტონები, რომლებიც გამოიტყორცნებიან პროცედურის ჩატარებისას, ურთიერთქმედებენ კანის უჯრედებთან, იწვევენ მათ რეგენერაციას და ზოგადად, კანის სტრუქტურის გაუმჯობესებას და გაახალგაზრდავებას.
        </p>

        <p class="service-popup__text">
          ფოტონოთერაპია ერთ-ერთი ყველაზე უსაფრთხო და ეფექტური მეთოდია ნებისმიერი ტიპის კანისთვის როგორც სამკურნალო, ისე პროფილაქტიკური მიზნებისთვის. გამოიყენება როგორც მონოთერაპიის, ისე  სხვა პროცედურებთან კომპლექსშიც ( სახის წმენდის დროს, ფრაქციული ლაზერით მკურნალობის დროს, აკნეს მკურნალობის დროს და ა.შ.).
        </p>

        <p class="service-popup__text">
          მეთოდს აქვს 7 ტიპის რეჟიმი, რომლებიც კანზე ახდენენ განსხვავებული ტიპის ზემოქმედებას და მდგომარეობიდან გამომდინარე, შეირჩევიან ექიმის მიერ. ესენია:
        </p>

        <p class="service-popup__text">
          1. წითელი ნათება- სხივის სიგრძე 600-680 ნმ .
          <br>
          დანიშნულება: აძლიერებს სისხლძარღვოვან ტონუსს, ამცირებს შეშუპებით პროცესებს. მცირდება ნაოჭების სიღრმე და მათი რაოდენობა, ადგილი აქვს ფიბრობლასტების აქტივაციის პროცესს, რაც აძლიერებს კანში კოლაგენის სინთეზს, ამცირებს ფორებს.
        </p>

        <p class="service-popup__text">
          2. ლურჯი ნათება - სხივის სიგრძე 415-490 ნმ.
          <br>
          დანიშნულება: აუმჯობესებს სახის კუნთოვან ტონუსს. ახასიათებს ანტიბაქტერიული მოქმედება, შესაბამისად აქვს ანთების საწინააღმდეგო, აკნეს საწინააღმდეგო მოქმედება. აქვს კანის აღმდგენი ეფექტი, ამცირებს კანის სიწითლეს და გაღიზიანებას, აძლიერებს იმუნიტეტს. გამოიყენება კომპლექსურ თერაპიაში ნაწიბურების მკურნალობისას.
        </p>

        <p class="service-popup__text">
          3. იასამნისფერი ნათება -სხივის სიგრძე 380-430 ნმ.
          <br>
          დანიშნულება: ასტიმულირებს ფიბრობლასტებს და აძლიერებს კოლაგენის სინთეზს, რაც განაპირობებს კანის სტრუქტურის გაახალგაზრდავებას, გაუმჯობესებას და ნაოჭების შემცირებას. ხელს უშლის პიგმენტაციების, მათ შორის, ჭორფლის განვითარებას (დაკავშირებულს ორსულობასთან და ასაკთან). ხელს უწყობს ნაწიბურების შეხორცებას, ასევე სიწითლის შემცირებას.
        </p>

        <p class="service-popup__text">
          4. თეთრი ნათებადანიშნულება:
          <br>
          სახეზე ასაკობრივი ლაქების მკურნალობა, ასევე კანის ასაკობრივი ცვლილებების პროფილაქტიკა.
        </p>

        <p class="service-popup__text">
          5. მწვანე ნათება-სხივის სიგრძე 520 ნმ.
          <br>
          დანიშნულება: კანის მდგომარეობის გაუმჯობესება, მისი დატენიანება, ლიმფური შეშუპების პროფილაქტიკა. მწეველთა, ასევე  მშრალი კანისათვის დამატენიანებელი ეფექტით. ხელს უწყობს კანიდან შლაკების გამოდევნის პროცესს.
        </p>

        <p class="service-popup__text">
          6. ყვითელი ნათება -სხივის სიგრძე 590 ნმ.
          <br>
          დანიშნულება: ამაღლებს იმუნიტეტს, გამოიყენება გაუხეშებული კანის, ნაოჭების არსებობისას. ასევე სიწითლის, გაღიზიანების მკურნალობისას.
        </p>

        <p class="service-popup__text">
          7. ცისფერი ნათება-სხივის სიგრძე 405 ნმ.
          <br>
          დანიშნულება: მეტაბოლიზმის (ანუ ნივთიერებათა ცვლის) და  კანის ტონუსის ამაღლება, კანის სტრუქტურის გაუმჯობესება.
        </p>
        <p class="service-popup__text">
          პროცესი უმტკივნეულოა, არ საჭიროებს რეაბილიტაციის პერიოდს და პროცედურის დასრულებისთანავე ვუბრუდებით ჩვეულ რეჟიმს.
        </p>

        <p class="service-popup__text">
          უკუჩვენებები ( დაავადებები ან მდგომარეობა, როცა არ არის რეკომენდებული პროცედურის ჩატარება):
        </p>

        <p class="service-popup__text">
          სიმსივნური დაავადებები, ჰიპერტონია, სისხლის დაავადებები, ორგანიზმის  მწვავე ანთებითი დაავადებები, ან ქრონიკული დაავადებები გამწვავების დროს, მათ შორის მაღალი ტემპერატურით და ცხელებით მიმდინარე, ალერგიული კერები კანზე, 16 წლამდე ასაკი, ფსიქიკური დაავადებები, ეპილეფსია, შაქრიანი დიაბეტი, კარდიოსტიმულატორი, ფარისებრი ჯირკვლის დაავადებები, კატარაქტა და გლაუკომა, ტრანქვილიზატორების, ნარკოტიკების და ძლიერი ანტიბიოტიკების მიღება, ორსულობა
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-5" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            RF-ლიფტინგი
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          RF ლიფტინგი- ეს არის ელექტრული ველის მოქმედება კანსა და კანქვეშა ქსოვილებზე რადიოტალღების სიხშირის დიაპაზონში.
        </p>
        <p class="service-popup__text">
          პროცედურა აბსოლუტურად უმტკივნეულო და უსაფრთხოა. პირველი შედეგი ვლინდება მომენტალურად და იგი თანდათან ძლიერდება. საბოლოო შედეგი დგება მკრუნალობის დაწყებიდან 6 თვის შემდეგ და ეფექტურობას ინარჩუნებს მინიმუმ 2 წლის განმავლობაში.
        </p>

        <p class="service-popup__text">
          პროცედურის საშუალებით ხდება კანის გაახალგაზრდავება და გადაჭიმვა (ლიფტინგი) უოპერაციოდ ხანგრძლივმომქმედი ეფექტით.
        </p>

        <p class="service-popup__text">
          კანის გაახალგაზრდავება ხდება უჯრედების ბუნებრივი სტიმულაციის გზით, რადიოტალღები მოქმედებს კანის ღრმა ფენებზეც, ახდენს კოლაგენის სინთეზის გააქტიურებას და კანის საერთო ფართობის მნიშვნელოვან შემცირებას, შემაერთებელი ქსოვილის მოდუნებული ბოჭკოების დაჭიმვას, ფიბროზული ქსოვილის ალაგებას. შედეგად, იმატებს კანის ტონუსი, იგი ხდება უფრო მკვრივი და ელასტიური( ოპერაციული გადაჭიმვის შედეგად კანი პირიქით, თხელდება).
        </p>

        <p class="service-popup__text">
          ალაგებს მცირე და საშუალო ზომის ნაოჭებს (თვალის გარშემო, ტუჩის ნაოჭები), ასწორებს „ფორთოხლის“ და მოდუნებულ კანს ( სახე, „დეკოლტეს“ მიდამო, მხრის შიდა ზედაპირი, მუცელი, ბარძაყები, დუნდულოები); ამცირებს/ალაგებს სტრიებს, აუმჯობესებს კანის ფერს და სტრუქტურას, ასწორებს გრავიტაციულ ფტოზს და  ლიპოსაქციის შემდგომ დეფექტებს;
        </p>

        <p class="service-popup__text">
          ეს მეთოდიკა მნიშვნელოვანია ცელულიტის კომპლექსურ მკურნალობაში.
        </p>

        <p class="service-popup__text">
          RF-ლიფტინგის ჩვენებებია: მოშვებული, დაბერებული, გამომშრალი კანი. სტრიები, ნაოჭები, ცელულიტი.
        </p>

        <p class="service-popup__text">
          უკუნაჩვენებია:
        </p>

        <p class="service-popup__text">
          -ელექტროსტიმულატორის და მეტალის იმპლანტის არსებობა ზემოქმედების არეში.
        </p>

        <p class="service-popup__text">
          -სიმსივნე,
        </p>

        <p class="service-popup__text">
          -მწვავე ინფექციური და ანთბითი დაავადებები,
        </p>

        <p class="service-popup__text">
          -ორსულობა, ლაქტაცია, მენსტრუალური ციკლი,
        </p>

        <p class="service-popup__text">
          -სისტემური დეგენერაციული დაავადებები,
        </p>

        <p class="service-popup__text">
          -არაა მიზანშეწონილი მისი ჩატარება როზაცეის დროს.
        </p>

        <p class="service-popup__text">
          პროცედურის ხანგრძლივობა 30-40 წუთია, პროცედურების რაოდენობა საწყისი მდგომარეობიდან გამომდინარე ინდივიდუალურია, პროცედურებს შორის ინტერვალი 7-10 დღეა.
        </p>

        <p class="service-popup__text">
          მისი ჩატარება არ საჭიროებს მოსამზადებელ ან რეაბილიტაციის პერიოდს, არის აბსოლუტურად უმტკივნეულო და არ საჭიროებს ანესთეზიას.
        </p>

        <p class="service-popup__text">
          ჩვენს კლინიკაში დანერგილია როგორც მონოპოლარული, ასევე ბი-და ტრიპოლარული თერმოლიფტინგი, რაც საშუალებას იძლევა მოვიცვათ საჭიროებისამებრ, კანის ფენები სხვადასხვა სიღრმეზე და საგრძნობლად გავზარდოთ მეთოდის ეფექტურობის ხარისხი.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-6" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ელექტროკოაგულაცია
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          ესაა მაღალი სიხშირის ელექტრული ველით მოქმედება საჭირო უბანზე. ზედაპირულად იწვევს უჯრედების კოაგულაციას (ნეკროზს).
        </p>
        <p class="service-popup__text">
          მიზანშეწონილია მისი გამოყენება პაპილომების, ხალების, მეჭეჭების, ლაქების, პოლიპების, კონტაგიოზური მოლუსკის დროს. აგრეთვე სისხძარღვოვანი კაპილარული ვარსკვლავების ასალაგებლად.
        </p>

        <p class="service-popup__text">
          პროცედურის ჩატარება შესაძლებელია სახესა და მთელს სხეულზე.
        </p>

        <p class="service-popup__text">
          არ საჭიროებს გაუტკივარებას, აღდგენით პერიოდს,  ცხოვრების წესის შეცვლას და წინასწარ მომზადებას.
        </p>

        <p class="service-popup__text">
          პროცედურის ხანგრძლივობა და რაოდენობა დამოკიდებულია კანზე არსებული ელემენტების რაოდენობაზე.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-7" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            სახის კანის აპარატული, ღრმა წმენდა
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          მოიცავს შემდეგ ეტაპებს:
        </p>
        <p class="service-popup__text">
          1. დემაკიაჟი - კანის ზედაპირიდან მკვდარი უჯრედების მოშორება,
        </p>

        <p class="service-popup__text">
          2. ზედაპირული პილინგი ან მიკროდერმაბრაზია ( კანის მდგომარეობიდან გამომდინარე),
        </p>

        <p class="service-popup__text">
          3. კანის დამარბილებელი ლოსიონი,
        </p>

        <p class="service-popup__text">
          4. სახის წმენდა ულტრაბგერითი სკრაბერით ან მექანიკურად (კანის მდგომარეობიდან გამომდინარე),
        </p>

        <p class="service-popup__text">
          5. დარსონვალი,
        </p>

        <p class="service-popup__text">
          6. დამაშვიდებელი ნიღაბი,
        </p>

        <p class="service-popup__text">
          7. ჰიალურონის მჟავას შეყვანა კანში აპარატული მეთოდით (ასაკის და კანის მდგომარეობის მიხედვით),
        </p>

        <p class="service-popup__text">
          8. საცხი კანის ტიპის მიხედვით.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-8" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            აპარატურული მიკდროდერმაბრაზია
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          მეთოდის საშუალებით შესაძლებელია  კანის ზედაპირიდან მისი გარქოვანებული, დანეკროზებული ზედაპირული შრეები მოშორება და გასუფთავებული ზედაპირის "გაპრიალება" სპეციალური აპარატის დახმარებით. პროცედურა ტარდება ალმასის მტვერით დაფარული მეტალის თავებისა და ვაკუუმის გამოყენებით. აპარატი საშუალებას იძლევა საჭიროების მიხედვით ვარეგულიროთ მიკროდერმაბრაზიის მოქმედების სიღმე.
        </p>
        <p class="service-popup__text">
          მკვდარი უჯრედების მოშორების გარდა, პროცედურა ხელს უწყობს  ელასტიური ბოჭკოების გამომუშავების გააქტიურებასა და მიკროცირკულაციის გაუმჯობესებას კანსა და კანქვეშა ქსოვილში.
        </p>

        <p class="service-popup__text">
          პროცედურა მიზანშეწონილია მოდუნებული, დაღლილი, უსიამოვნო ფერის, ზედმეტად ცხიმიანი და ფორებიანი კანის სამკურნალოდ, ასევე ნაწიბურების, სტრიების, პიგმენტური ლაქების არსებობისას, პოსტაკნეს შემთხვევაში,  ჩაკირული ფორების გასახსნელად.
        </p>

        <p class="service-popup__text">
          დაუშვებელია ამ მეთოდის გამოყენება ქრონიკული დერმატოზების და ჰერპესის გამწვავებისას, მწვავე ანთებითი დაავადებების დროს, კელოიდოზისკენ მიდრეკილებისას.
        </p>

        <p class="service-popup__text">
          მიკროდერმაბრაზია საშუალებას იძლევა ვაქციოთ კანი აბრეშუმივით ნაზი და გლუვი, ჯანმრთელი ფერის, პიგმენტაციების გარეშე, მივანიჭოთ მას ჩვეული ელასტიურობა და ახალგაზრდული იერი.
        </p>

        <p class="service-popup__text">
          პროცედურის ჩატარება შესაძლებელია  სახის, კისრის, გულმკერდის არეში, ხელის მტევნებსა და სხეულის სხვა მიდამოებში. პროცედურა სახეზე გრძელდება 20-25 წუთს და ვლინდება მომენტალური ეფექტი.
        </p>

        <p class="service-popup__text">
          პროცედურა არ საჭიროებს მოსამზადებელ ან რეაბილიტაციის პერიოდს (არც რაიმე შეზღუდვას ცხოვრების წესში), სეანსის შემდგომ პაციენტს შეუძლია ჩვეული მაკიაჟის გამოყენება
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-9" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ულტრაბგერითი სკრაბერი
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          ულტრაბგერის სიხშირე იწვევს აპარატის მეტალის ბრტყელი ზედაპირის თვალით უხილავ რხევებს, რომელიც მოქმედებს კანზე ზედმეტი ზეწოლის და ტრავმის გარეშე. აპარატს აქვს შესაძლებლობა იმუშაოს მუდმივ და იმპულსურ რეჟიმში, ასევე შესაძლებელია შეიცვალოს ულტრაბგერის სიმძლავრე.
        </p>
        <p class="service-popup__text">
          ულტრაბგერის მოქმედებით ხდება მაღალი წნევით სითხის შესტყორცნა ფორებში და იქიდან ჭუჭყის გამოდევნა, კანიდან გარქოვანებული უჯრედების დელიკატური მოცილება, კანის ჟანგბადით გაჯერება და მისი ღრმა ფენების მიკრომასაჟი, რაც ხელს უწყობს ელასტიურობის აღდგენას. იმპულსურ რეჟიმში აპარატი საშუალებას იძლევა ჩავატაროთ ლიმფოდრენაჟი და ლიფტინგი.
        </p>

        <p class="service-popup__text">
          გარეგნულად აპარატის მოქმედება ვლინდება ორთქლის და წვრილი წვეთების ზედაპირიდან ამოფრვევით.
        </p>

        <p class="service-popup__text">
          პროცედურის შემდგომ მატულობს კანის ტონუსი, ტენიანობა, ელასტიურობა, მცირება ან სრულიად ქრება შეშუპება; ხდება კანის გაწმენდა-პილინგი და ნორმალური, ჯანსაღი ფერის აღდგენა, კუნთოვანი სპაზმის მოხსნა ( იგი მიმიკური ნაოჭების გამომწვევი მიზეზია), კანსა და კუნთებში ნივთიერებათა ცვლის გააქტიურება.
        </p>

        <p class="service-popup__text">
          ნაჩვენებია:
        </p>

        <p class="service-popup__text">
          -სებორეის,
        </p>

        <p class="service-popup__text">
          -ცხიმიანი, ან პირიქით გამომშრალი, გარქოვანებული უხეში კანის (აპარატის რეჟიმის მიხედვით),
        </p>

        <p class="service-popup__text">
          -კამედონების,
        </p>

        <p class="service-popup__text">
          -აკნეს არსებობისას,
        </p>

        <p class="service-popup__text">
          -პიგმენტური ლაქების,
        </p>

        <p class="service-popup__text">
          -ლიმფოსტაზის დროს,
        </p>

        <p class="service-popup__text">
          -აგრეთვე ასაკობრივად მოდუნებული კანის შემთხვევაში.
        </p>

        <p class="service-popup__text">
          უკუნაჩვენებია: კანის ანთებით-ვირუსული დაავადებების, სახის ნერვის დამბლის, სამწვერა ან თვალის ნერვის პათოლოგიის დროს, მრავლობითი ტელეანგიექტაზიების არსებობისას მოქმედების არეში, ”ოქროს ძაფების” არსებობისას, მოკლე პერიოდში ჩატარებული ქიმიური პილინგის შემდეგ.
        </p>

        <p class="service-popup__text">
          მისი ჩატარება შესაძლებელია სახის, ყელის, დეკოლტეს და ზურგის მიდამოში.
        </p>

        <p class="service-popup__text">
          პროცედურა აბსოლუტურად უმტკივნეულოა არ საჭიროებს წინასწარ მოსამზადებელ ან რეაბილიტაციის პერიოდს, გაუტკივარებას. პროცედურის შემდეგ პაციენტი უბრუნდება ცხოვრების ჩვეულ რიტმს.
        </p>

        <p class="service-popup__text">
          პროცედურის ხანგრძლივობა 20-30 წუთია.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-10" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ფილერები
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          კონტურული პლასტიკა გულისხმობს სპეციალური შემავსებლის, ფილერის (filler- შემავსებელი) შეყვანას კანქვეშ.
        </p>
        <p class="service-popup__text">
          პროცედურის განვითარების  სხვადასხვა პერიოდში ფილერებად  სხვადასხვა ნაერთებს იყენებდნენ.
        </p>

        <p class="service-popup__text">
          დღეისთვის არსებობს შემდეგი სახის ფილერები:
        </p>

        <p class="service-popup__text">
          პერმანენტული ფილერი - თხევადი სილიკონი, ან ბიოპოლიმერული გელი. დღეს ამ პრეპარატებს იყენებენ მხოლოდ ტრავმის შემდგომი დეფექტის შესავსებად;
        </p>

        <p class="service-popup__text">
          ხანგრძლივმომქმედი ფილერი - სინთეზურ-ბიოლოგიური ნაერთი, რომელიც დღეს თითქმის აღარ გამოიყენება.
        </p>

        <p class="service-popup__text">
          დროებითი მოქმედების ფილერი - ბიოდეგრადირებადი ნივთიერებების ნაერთი. მას ნაკლები გვერდითი ეფექტი აქვს, ვიდრე ზემოთჩამოტვლილებს, მაგრამ მისი მოქმედების ხანგრლივობა შეზღუდულია; ასეთ ფილერებს განეკუთვნება საკუთარი ორგანიზმიდან სპეციალური ლაბორატორიული მეთოდებით მიღებული ცხიმი, კოლაგენის გელი; დღეს მსგავსი პრეპარატებიც შეღუდულად გამოიყენება.
        </p>

        <p class="service-popup__text">
          ჰიალურონის მჟავის პრეპარატები, რომელიც ორ კლასად იყოფა, ცხოველური წარმოშობის, რომლებიც ხშირად იძლევა ალერგიულ რეაქციებს, მოქმედების ხანგრძლივობა  6 თვემდეა  და დღეს ყველაზე ეფექტური, უსაფრთხო და  პოპულარული - არაცხოველური წარმოშობის ჰიალურონის მჟავის პრეპარატები;
        </p>

        <p class="service-popup__text">
          ჰიალურონის მჟავა არის კანის ბუნებრივი კომპონენტი, რომელიც განაპირობებს კანის ტენიანობას და ელასტიურობას.
        </p>

        <p class="service-popup__text">
          არაცხოველური წარმოშობის ჰიალურონის მჟავის პრეპარატები  არ იწვევენ ალერგიულ რეაქციებს და გვერდით მოვლენებს, მათი მოქმედების ეფექტი გრძელდება ქსოვილში პრეპარატის კონცენტრაციიდან და გელის სიბლანტიდან გამომდინარე 6 თვიდან 2 წლამდე.
        </p>

        <p class="service-popup__text">
          გამოიყენება:
        </p>

        <p class="service-popup__text">
          ნაოჭების შესავსებად და ვიზუალურად მათ გასაქრობად ( მსხვილი, საშუალო და წვრილი ნაოჭები) ტუჩების, თვალის გარშემო, ცხვირ-ტუჩის, შუბლის არეში;
        </p>

        <p class="service-popup__text">
          როგორც შემავსებელი-მოცულობითი ეფექტის მისაღებად ტუჩის, ყვრიმალის, ნიკაპის მიდამოში, სახის ოვალის კორექციისთვის, ტუჩის კუთხის, თვალის კუთხის და წარბის ასაწევად; ქვედა ქუთუთოს კორექციისთვის.
        </p>

        <p class="service-popup__text">
          გარდა შემავსებლის ფუნქციისა, ჰიალურონის მჟავა იწვევს წყლის შეკავებს და კოლაგენის  გამომუშავების გააქტიურებას, შესაბამისად კანი დროთა განმავლობაში ხდება უფრო ტენიანი და ელასტიური, ხოლო პრეპარატის გაწოვის შემდეგ  ნაკლები ინტენსივობის ნაოჭი რჩება.
        </p>

        <p class="service-popup__text">
          პროცედურა ტარდება წინასწარ მომზადებულ (დამუშავებულ) კანზე,  პრეპარატის შერჩევა ხდება ინდივიდუალურად. პრეპარატი შეგვყავს  სპეციალური კანულით, ქსოვილის ნაკლები ტრამვატიზაციის მიზნით, თუმცა შესაძლებელია მისი შეყვანა მიკროინექციებითაც.
        </p>

        <p class="service-popup__text">
          პროცედურის გამოყენება შესაძლებელია ნებისმიერ ასაკში და არ საჭიროებს აღდგენით პერიოდს.
        </p>

        <p class="service-popup__text">
          ეფექტი დგება მომენტალურად და დროთა განმვლობაში  შესაძლებელია პრეპარატის დამატება ეფექტის გაძლიერების მიზნით.
        </p>

        <p class="service-popup__text">
          უკუჩვენებებია: ორსულობა, მწვავე ცხელებითი დაავადებები, ჰემოფილია, ნეფროპათია.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-11" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ბოტოქსი
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          მისი გამოყენება 1980 წლიდან დაიწყო, დასწყისში ოფთალმოლოგიასა და ნევროლოგიაში გამოიყენებოდა. სწორედ ამ პერიოდში გამოვლინდა მისი უნიკალური გვერდითი ეფექტი - პაციენტებში დაფიქსირდა თვალის გარშემო, ტუჩებისა და შუბლის მიდამოში ნაოჭების ალაგება. მომდევნო წლებში ბოტოქსის ინექციები არაჩვეულებრივად პოპულარული გახდა კოსმეტოლოგიასა და ესტეთიკურ მედიცინაში და აქტუალურობას არც დღეს კარგავს.
        </p>
        <p class="service-popup__text">
          ინექციები გამოიყენება სახის მიდამოში შემდეგი ტიპის ნაოჭების ასალაგებლად:
        </p>
        <p class="service-popup__text">
          -ვერტიკალური (რომელიც ძირითადად განლაგებულია ხოლმე წარბებს შორის)
          <br>
          -ჰორიზონტალური( განლაგდება ხოლმე შუბლის მიდამოში)
          <br>
          -ვერტიკალური ნაოჭები ზემო თუჩის და ცხვირ-ტუჩის მიდამოში, ასევე, თვალის გარშემო არის ნაოჭები.
        </p>

        <p class="service-popup__text">
          ეფექტი ვლინდება ინექციიდან 24-48 საათში და პირველი ორი-ოთხი კვირის განმავლობაში თანდათან ძლიერდება. ეფექტის ხანგრძლივობაა 4-6 თვეა.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-12" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            HIFU ტექნოლოგია - High Intensity Focused Ultrasound
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          High Intensity Focused Ultrasound, ( HIFU ტექნოლოგია) - არის უახლესი ტექნოლოგია, რომელიც მეცნირებმა 2012 წელს შეიმუშავეს. აპარატულ მეთოდებს შორის დღეს ერთ-ერთ ყველაზე ეფექტურ მეთოდადაა მიჩნეული ცელულიტთან და ჭარბ ცხიმთან ბრძოლის კუთხით.
        </p>
        <p class="service-popup__text">
          მეთოდის არსი დაფუძნებულია  ფოკუსირებული ულტრაბგერის ზემოქმედებით გარკვეულ უბნებზე, რომელიც მოქმედებს  0.8-1.3 სიღრმემდე განლაგებულ ადიპოციტებზე ( ცხიმოვან უჯრედებზე), არღვევს მემბრანას და იწვევს მათ დაშლას. უჯრედების აღდენა აღარ ხდება. დაშლილი ცხიმის გამოდევნა ორგანიზმიდან თნდათნობით,  თირკმელების საშუალებით ხორციელდება.
        </p>

        <p class="service-popup__text">
          პროცედურის დროს გარკვეულ  ზემოქმედებას კანიც განიცდის, ადგილი აქვს კოლაგენისა და ელასტინის სინთეზის გაძლიერებას,  კოლაგენური ბოჭკოების გამომუშავების გააქტიურებას კანის ღრმა შრეებში. შედეგად, ადგილი აქვს კანის ელასტიურობის მატებას, რაც მის გადაჭიმვას იწვევს, ამიტომ სხეულის გარშემოწერილობის  შემცირება არ გამოიწვევს კანის მკვეთრ ჩამოკიდებას.
        </p>

        <p class="service-popup__text">
          პროცედურის ხანგრძლივობა 45-60 წუთია. ერთი პროცედურის საშუალებით შესალებელია გარშემოწერილობის 2-3 სანტიმეტრით შემცირება, რაც საშუალოდ ტანისამოსის ერთი ზომით შემცირების ტოლფასია. უფრო მკვეთრი შედეგის მიღებად შესაძლებელია განმეორებითი სეანსის ჩატარება ერთ თვეში.
        </p>

        <p class="service-popup__text">
          პროცედურა არ არის მტკივნეული,  არ საჭიროებს განსაკუთრებულ მოვლას და აღგენით პერიოდს და შესაძლებელია ჩატარდეს შემდეგ ზონებზე:
        </p>

        <p class="service-popup__text">
          მუცელი, თეძოები, გალიფეს ზონა, ბარძაყების შიდა და გარე ზედაპირი, მხღის შიდა ზედაპირი, დუნდულები, მუხლის  ზონა. ამ ზონებში ცხიმოვანი ნაკეცის ზომა უნდა იყოს  არანაკლებ 25 მმ.
        </p>

        <p class="service-popup__text">
          შედეგი ვლინდება თანდათანობით, ხოლო საბოლოო შედეგი დგება 8-12 კვირაში. პროცედურის შემდეგ შესაძლებელია აღინიშნებოდეს კანის გარდამავალი შეწითლება და მსუბუქი სიმძიმის შეგრძნება ზემოქმედების არეში.
        </p>

        <p class="service-popup__text">
          ტარდება 17 წლის ასაკიდან.
        </p>

        <p class="service-popup__text">
          პროცედურის შემდეგ არ შეიძლება საუნით და სოლარიუმით სარგებლობა შემდგომი 2 კვირის განმავლობაში.
        </p>

        <p class="service-popup__text">
          უკუჩვენებები:
        </p>

        <p class="service-popup__text">
          ანთებითი დაავადებები, ორსულობა და ლაქტაციის პერიოდი, თიაქარი, ნაწიბურები მოქმედების არეში, სისტემური დაავადებები, მეტალის საგნები მოქმედების არეში, ეპილეფსია, სისხლის შედედების დაღღვევა და სისხლის გამათხიერებლების მიღება.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-13" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ულტრაბგერითი კავიტაცია (უოპერაციო ლიპოსაქცია)
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          ესაა ზედმეტი ცხიმის და ცელულიტის  ალაგება უოპერაციოდ, მას ასევე  უოპერაციო ლიპოსაქციას უწოდებენ.
        </p>
        <p class="service-popup__text">
          პრობლემურ უბანზე ზემოქმედება ხორციელდება დაბალი სიხშირის რადიოტალღებით.  რადიოტალღები მოქმედებს ადიპოციტების (ცხიმოვანი უჯრედების) მემბრანაზე, იწვევს მათ ძლიერ რეზონანსულ რხევებს, გარდა ამისა ამ ტალღების მოქმედებით ცხიმოვან უჯრედებში ჩნდება მიკრობუშტუკები. ბუშტუკები შემდგომში იზრდება ზომაში და იწვევს უჯრედის  დაშლას. შედეგად უჯრედის შიგთავსი გადადის თხევად მდგომარეობაში და გამოიდევნება ორგანიზმიდან ბუნებრივი გზით.
        </p>

        <p class="service-popup__text">
          ულტრაბგერითი კავიტაციის მეთოდის საშუალებით შესაძლებელია ცელულიტის მკურნალობა კომპლექსში, ცხიმოვანი ზონების მიზნობრივი ალაგება და პრობლემური ზონების კორექცია ( ღაბაბი, ხელები, მუცელი, დუნდულოები, კიდურები).
        </p>

        <p class="service-popup__text">
          ერთ პროცედურაზე  შესაძლებელია 15 გრამამდე ცხიმის დაშლა, რაც შეესაბამება სხეულის გარშემოწერილობის  დაახლოვებით 2-3 სანტიმეტრით შემცირებას. ეფექტი ვლინდება მომენტალურად და თანდათან ძლიერდება. პიკს მკურნალობის დაწყებიდან მეექვსე თვეს აღწევს, იძლევა მყარ ეფექტს, რომელიც მინიმუმ 2 წელს გრძელდება.
        </p>

        <p class="service-popup__text">
          არის აბსოლუტურად უმტკივნეულო, საჭიროებს წინასწარ, მოსამზადებელ პერიოდს. არ საჭიროებს რეაბილიტაციის პერიოდს. პროცედურები ტარდება 7-12 დღეში ერთხელ. პროცედურების რაოდენობა, საწყისი მდგომარეობიდან გამომდინარე, ინდივიდუალურია.
        </p>

        <p class="service-popup__text">
          ჩვენებები: ცელულიტი, ფიგურის კორექცია, ლიპომები, ლიპოსაქციის შემდგომი დეფექტების გასწორება.
        </p>

        <p class="service-popup__text">
          უკუნაჩვენებია ღვიძლის და თირკმელების უკმარისობის, ოსტეოპოროზის,  ორსულობის და ლაქტაციის, მენსტრუალური ციკლის დროს, ზემოქმედების არეში ღია ჭრილობის ან მეტალის იმპლანტანტის არსებობისას.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-14" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            პრესოთერაპია(გარდამავალი პნევმოკომპრესია)
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          ესაა ქსოვილებზე შეკუმშული ჰაერით პულსირებული, გარდამავალი და დოზირებული (კონტროლირებადი) ზეწოლა, რომელიც სპეციალური სამოსით გადაეცემა კანს, კუნთებს, ვენურ და ლიმფურ სადინარებს. კომპიუტერულად წინასწარ განსაზღვრული წნევა გადადევნის სისხლს და ლიმფას ჩვენთვის სასურველი მიმართულებით და სიჩქარით (აპარატს აქვს მიმართულების 8 შესაძლებელი რეჟიმი და 12 სექცია თითოეულ უბანზე), აუმჯობესებს არტერიული და ვენური სისხლის და ლიმფის მიკროცირკულაციას (საჭიროების მიხედვით), მცირდება ვენების თრომბოზის ალბათობა, აქტიურდება სარეზერვო კაპილარების ფუნქციონირება და ნივთიერებათა ცვლა კანსა და ცხიმოვან უჯრედებში; მოქმედებს ცელულიტის ჩამოყალიბების ძირითად მიზეზზე - ამცირებს ჰიპოქსიას და უჯრედშორისი სითხის შეგუბებას კანქვეშა ქსოვილებში, აგრეთვე მოქმედებს უკვე არსებულ ცელულიტზე - ხდება ფიბროზული ქსოვილის და ცხიმოვანი უჯრედების დაშლა, ალაგება და ამ ადგილებში ნივთიერებათა ცვლის აღდგენა;  შეგუბებითი - ჟელესებური კონსისტენციის ლიმფა გადაყავს თხევად მდგომარეობაში, რითაც აადვილებს მის გამოდევნას შეგუბების უბნიდან.
        </p>
        <p class="service-popup__text">
          ჩვენებები:
        </p>

        <p class="service-popup__text">
          -ცელულიტის კომპლექსური თერაპია,
        </p>

        <p class="service-popup__text">
          -მოდუნებული, სტრიებიანი კანი,
        </p>

        <p class="service-popup__text">
          -ქრონიკული დაღლილობის და „დაღლილი ფეხების“ სიმპტომი,
        </p>

        <p class="service-popup__text">
          -ადგილობრივად წარბი ცხიმის ჩალაგება,
        </p>

        <p class="service-popup__text">
          -ჭარბი წონა,
        </p>

        <p class="service-popup__text">
          -კიდურების პოსტტრავმული და პოსტოპერაციული შეშუპება,
        </p>

        <p class="service-popup__text">
          -ვენური და ლიმფური მიმოქცევის უკმარისობა,
        </p>

        <p class="service-popup__text">
          -რეინოს დაავადება,
        </p>

        <p class="service-popup__text">
          -სტრესული მდგომარეობა,
        </p>

        <p class="service-popup__text">
          - პროდეცურის ჩატარება შესაძლებელია იმ პაციენტებზეც, რომელთაც გარკვეული მიზეზების გამო ვერ უტარდება ელექტროპროცედურები და ხელით მასაჟი.
        </p>

        <p class="service-popup__text">
          უკუნაჩვენებია პროცედურის ჩატარება  ორსულთათვის, მენსტრუალური ციკლის დროს, ასევე, თირკმელების უკმარისობის, ავთვისებიანი სიმსივნის, ჰემოფილიის, მწვავე ინფექციებისას.
        </p>

        <p class="service-popup__text">
          პრესოთერაპის ჩატარება შესაძლებელია კიდურების, დუნდულოების, მუცლის, თეძოების მიდამოებში.
        </p>

        <p class="service-popup__text">
          პროცედურა კომფორტულია, არ საჭიროებს წინასწარ მომზადებას და ცხოვრების წესის შეცვლას,
        </p>

        <p class="service-popup__text">
          ხანგრძლივობა 15-45 წუთია.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-15" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ფრაქციული ლაზერული თერმოლიზი და XPL სისტემა
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          პროცედურა ტარდება უახლესი თაობის ამერიკული აპარატით. იგი წარმოადგენს უახლესი ტექნოლოგიის მულტიფუნქციურ სისტემას, რომელსაც აქვს ფრაქციული ლაზერის და XPL ( გაუმჯობესებული ფოტოთერაპია) კომბინაცია, რაც მრავალფეროვანს ხდის მის გამოყენებას.
        </p>
        <p class="service-popup__text">
          აპარატის უპირატესობა სხვა ფრაქციულ ლაზერებთან შედარებით იმაში მდგომარეობს, რომ ერთდროულად ხდება ლაზერის ორი სიგრძის ტალღით ზემოქმედება (CAP ტექნოლოგია). ასე, რომ კანი ერთდროულად მუშავდება სხვადასხვა სიღრმეზე; 1 440 ნმ ლაზერის სხივით 0.1-0.3 მმ სიღრმემდე, ხოლო 1 320 ნმ ლაზერის სხივით 0.5-2 მმ სიღრმემდე. ეს კი უფრო მდგრადი, ხანგრძლივად შენარჩუნებადი შედეგის გარანტია. გარდა ამისა, კომპლექსური ზემოდმედება (ორი ტალღის ერთდროული მოქმედება) შესაძლებელს ხდის  კანზე ვიმოქმედოთ 2-5-ჯერ დაბალი ენერგიით, რის გამოც ნაკლებია მტკივნეულობა და გართულებების რისკი.
        </p>

        <p class="service-popup__text">
          ლაზერი არ აზიანებს კანის მთლიანობას ( არა აბლაციურია), ამიტომ აღდგენითი პერიოდიც მინიმალური ხანგრძლივობისაა.
        </p>

        <p class="service-popup__text">
          ფრაქციული ლაზერით ზემოქმედების შედეგად ხდება კოლაგენის და ელასტინის სინთეზის გააქტიურება, რემოდელირდება კოლაგენის ბოჭკოები, შედეგად ხდება კანის გაახალგაზრდავება, ელასტიურობის გაზრდა, მისი ზოგადი სტრუქტურის გაუმჯობესება, ფართობის შემცირება.
        </p>

        <p class="service-popup__text">
          გამოყენება:
        </p>

        <p class="service-popup__text">
          <span>- სტრიების მკურნალობა</span>
        </p>
        <p class="service-popup__text">
          <span>ნაწიბურების მკურნალობა</span>
        </p>
        <p class="service-popup__text">
          <span>წვრილი და საშუალო სიღრმის მიმიკური ნაოჭების მკურნალობა</span>
        </p>
        <p class="service-popup__text">
          <span>წვრილი და საშუალო ზომის ერთეული კაპილარებისა და სისხლძარღვოვანი ბადის ალაგება, მათ შორის როზაცეის დროს</span>
        </p>
        <p class="service-popup__text">
          <span>რბილი ქსოვილების ლიფტინგი - მოჭიმვა ( ყელის მიდამო,  მხრის და ბარძაყების შიდა ზედაპირი,გულმკერდის მიდამო, მკერდის მიდამო)</span>
        </p>
        <p class="service-popup__text">
          <span>კანის ფრაქციული გაახალგაზრდავება, ფერის და სტრუქტურის გაუმჯობესება ( სახე, ყელის მიდამო,მხრის და ბარძაყების შიდა ზედაპირი, გულმკერდის მიდამო, მკერდის მიდამო)</span>
        </p>
        <p class="service-popup__text">
          <span>კანის ფოტოგაახალგაზრდავება ( სახე, ყელის მიდამო,  მხრის და ბარძაყების შიდა ზედაპირი,   გულმკერდის მიდამო, მკერდის მიდამო)</span>
        </p>
        <p class="service-popup__text">
          <span>პიგმენტური ლაქების კორექცია ( სახე, გულმკერდი, ზურგის მიდამო, ხელის მტევანი)</span>
        </p>
        <p class="service-popup__text">
          <span>პოსტაკნეს მკურნალობა - ნაწიბურები,პიგმენტაცია</span>
        </p>
        <p class="service-popup__text">
          <span>ფოროვანი   და ცხიმიანი კანის მკურნალობა ( ფორების დახურვა, ცხიმიანობის შემცირება)</span>
        </p>
        <p class="service-popup__text">
          <span>ფოტოდაბერების მკურნალობა</span>
        </p>

        <p class="service-popup__text">
          შედეგი შესამჩნევია პირველივე სეანსიდან. ეფექტი აქტიურად პროგრესირებს პროცედურიდან გარკვეული პერიოდის განმავლობაში ( მას შემდეგ, რაც ახალი ბოჭკოების გამომუშავება პიკს აღწევს) და შენარჩუნდება რამდენიმე წლის განმავლობაში.
        </p>


        <p class="service-popup__text">
          უკუჩვენებები:
        </p>

        <p class="service-popup__text">
          - 3 კვირის რუჯი,
        </p>

        <p class="service-popup__text">
          - გარკვეული მედიკამენტების მიღება( ტეტრაციკლინი, დოქსიციკლინი და სხვა),
        </p>

        <p class="service-popup__text">
          - ორსულობა და ლაქტაცია,
        </p>

        <p class="service-popup__text">
          - მიდრეკილება კელოიდური ნაწიბურებისკენ,
        </p>

        <p class="service-popup__text">
          - დეკომპენსირებული შაქრიანი დიაბეტი,
        </p>

        <p class="service-popup__text">
          - მწვავე ანთბითი დაავადებები,
        </p>

        <p class="service-popup__text">
          - ონკოლოგიური დაავადებები,
        </p>

        <p class="service-popup__text">
          - ეპილეფსია.
        </p>

        <p class="service-popup__text">
          გაფრთხილება:
        </p>

        <p class="service-popup__text">
          - შესაძლებელია აღინიშნებოდეს გარდამავალი სიწითლე  და შეშუპება ერთი-სამი დღის განმავლობაში,
        </p>

        <p class="service-popup__text">
          - არ შეიძლება ცხელი შხაპის მიღება სამი-ხუთი დღის განმავლობაში,
        </p>

        <p class="service-popup__text">
          - არ საჭიროებს გაუტკივარებას,
        </p>

        <p class="service-popup__text">
          - პროცედურის შემდეგ მალევე უბრუნდებით ჩვეულ რითმს.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-16" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            კაპილარებისა და წვრილი ვენების ალაგება
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          კაპილარების ქსელი ( კუპეროზი) და წვრილი ვენების გაგანიერება  სხეულის ცალკეულ უბნებზე სისხლის მიმოქცევის დარღვევის შედეგია - ამ დროს სისხლძარღვის  სანათური ფართოვდება და კედელი სქელდება, შედეგად  კაპილარი/წვრილი ვენა ვიზუალურად შესამჩნევი ხდება. ამ ტიპის სისხლძარღვებში სისხლის მიმოქცევა ძალზედ შენელებულია და ფუნქცია თითქმის დაკარგული აქვთ.
        </p>
        <p class="service-popup__text">
          იმ შემთხვევაში, თუ მოხდა კაპილარის კედლის დაზიანება, მისი მთლიანობის დარღვევა და სისხლის ჩაქცევა ქსოვილებში, ვითარდება სისხლძარღვოვანი ვარსკვლავი.
        </p>

        <p class="service-popup__text">
          პრობლემა უფრო ხშირად ლოკალიზებულია  ცხვირისა და ლოყების, ყვრიმალების, ქვემო კიდურების და გულ-მკერდის ზონებზე.
        </p>

        <p class="service-popup__text">
          გამომწვევი მიზეზი სხვადასხვა შეიძლება იყოს:
        </p>

        <p class="service-popup__text">
          არასწორი გარუჯვა, ჰორმონული დარღვევები, ზედმეტი ფიზიკური დატვირთვა ან უმოძრაობა, ოსტეოქონდროზი, საშარდე  და ჰეპატობილიარული სისტემების პათოლოგია, კანის ტურგორის ცვლილება, დემოდეკოზი.
        </p>

        <p class="service-popup__text">
          ამ პრობლემის მოგვარება დღეს ძალზედ იოლადაა შესაძლებელი ახალი თაობის გრძელტალღოვანი Nd:yag ლაზერით ( მწარმოებელი cynosure USA).
        </p>

        <p class="service-popup__text">
          ლაზერის ტალღა შთაინთმება ჰემოგლობინით და ოქსიჰემოგლობინით, კაპილარის სანათურშივე ხდება ენერგიის გარდაქმნა სითბურ ენერგიად და შიგნიდან ხდება სისხლძარღვის კედლის შეწებება. ამიტომაც ეს მეთოდი დღეს ყველაზე უსაფრთხო და ეფექტურ მეთოდად ითვლება.
        </p>

        <p class="service-popup__text">
          შედეგი დგება მომენტალურად, უხშირესად კაპილარი მაშინვე ქრება, იშვიათად კი იცვლის ფერს და ქრება 2-3 კვირის განმავლობაში.
        </p>

        <p class="service-popup__text">
          პროცედურის ხანგრძლივობა დამოკიდებულია კაპილარების/ვენების კოლატერალების(განშტოებების) რაოდენობაზე, ფორმაზე, მდებარეობაზე. კურსი 1-3 სეანსისგან შედგება 1 თვის ინტერვალით (ერთზე მეტი სეანსის შემთხვევაში).
        </p>

        <p class="service-popup__text">
          ჩვენებები:
        </p>

        <p class="service-popup__text">
          კაპილარული ბადე ( კაპილარის დიამეტრი 0.1მმ და მეტი) სახეზე, გულმკერდზე, კიდურებზე.
        </p>

        <p class="service-popup__text">
          ტელეანგიექტაზია, ჰემანიომა - ღვინის ლაქები.
        </p>

        <p class="service-popup__text">
          უკუჩვენებები:
        </p>

        <p class="service-popup__text">
          3 კვირის რუჯი
        </p>

        <p class="service-popup__text">
          გარკვეული მედიკამენტების მიღება( მაგ. : ტეტრაციკლინი)
        </p>

        <p class="service-popup__text">
          ორსულობა და ლაქტაცია
        </p>

        <p class="service-popup__text">
          მიდრეკილება კელოიდური ნაწიბურებისკენ
        </p>

        <p class="service-popup__text">
          დეკომპენსირებული შაქრიანი დიაბეტი
        </p>

        <p class="service-popup__text">
          მწვავე ანთბითი დაავადებები
        </p>

        <p class="service-popup__text">
          ონკოლოგიური დაავადებები
        </p>

        <p class="service-popup__text">
          ეპილეფსია
        </p>

        <p class="service-popup__text">
          გთხოვთ გაითვალიწსინოთ, რომ პროცედურის შემდეგ:
        </p>

        <p class="service-popup__text">
          შესაძლებელია გარდამავალი სიწითლე ( 1-3 დღე) და კანის შეშუპება,
        </p>

        <p class="service-popup__text">
          უნდა იხმაროთ მზისგან დამცავი  4 კვირის განმავლობაში,
        </p>

        <p class="service-popup__text">
          არ შეიძლება ცხელი შხაპის მიღება 3-5 დღე.
        </p>

        <p class="service-popup__text">
          მომენტალურად უბრუნდებით ჩვეულ რითმს.
        </p>

        <p class="service-popup__text">
          არ საჭიროებს პროცედურის შემდგომ სპეციალურ დამწოლ ნახვევს.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-17" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ეპილაცია ალექსანდრიტის ლაზერით
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          ალექსანდრიტის ლაზერის (ტალღის სიგრძე 755 ნმ) მოქმედება დამოკიდებულია პიგმენტ მელანინის არსებობაზე თმის ღერში, ის ახდენს  ამ პიგმენტის იდენტიფიცირებას და იწვევს თმის ფოლიკულის დაშლას. აქედან გამომდინარე, ამ ტიპის ლაზერები მოქმედებს მხოლოდ ღია ფერის კანზე არსებულ მუქ თმაზე. ალექსანდრიტის ლაზერით ეპილაცია შესაძლებებლია ჩატარდეს I, II და III ტიპის კანზე, თუ მათ აქვთ მუქი ფერის თმა. სხვა ყველა დანარჩენ შემთხვევაში ნაკლებ ეფექტურია, ან საერთოდ უეფექტოა.
        </p>
        <p class="service-popup__text">
          ჩვენი აპარატი აღჭურვილია სპეციალური კრიოსისტემით, რაც პროცედურის ჩატარებას აბსოლუტურად უმტკივნეულოს და კომფორტულს ხდის.
        </p>

        <p class="service-popup__text">
          ჩვენება: ღია ფერის კანზე მუქი ფერის თმის არსებობა სხეულის ნებისმიერ ადგილას.
        </p>

        <p class="service-popup__text">
          უკუჩვენებები: თმისა და კანის ფერში მცირე ან არ არსებული სხვაობა, გარუჯული კანი, 16 წლამდე ასაკი, კრიტიკული დღეები, ორსულობა-ლაქტაცია, ეპილეფსია, ავთვისებიანი სიმსივნე.
        </p>

        <p class="service-popup__text">
          წინასწარი მომზადება: არ შეიძლება გარუჯვა პროცედურამდე 3 კვირით ადრე ( მათ შორის ავტორუჯი), არ გაიპარსოთ პროცედურამდე ბოლო 24 საათის განმავლობაში, თმის სასურველი სიგრძე - 1-3 მილიმეტრი.
        </p>

        <p class="service-popup__text">
          პროცედურის შემდგომი მოვლა:ექიმის მითითებით შესაბამისი მალამოს ხმარება; არ შეიძლება - გარუჯვა შემდგომი 3- 4 კვირის განმავლობაში, ცხელი აბაზანის მიღება 2 დღე, მექანიკური გაღიზიანება.
        </p>

        <p class="service-popup__text">
          შესაძლო გართულებები: გარდამავალი ჰიპერემია (შეწითლება), კანის გაღიზიანება, ზედაპირული დამწვრობა, რომელიც თავისით გაივლის უმოკლეს ვადაში. აგრეთვე კანის პიგმენტაციის დარღვევა, თუ სწორად არ არის ლაზერის ტიპი შერჩეული.
        </p>

        <p class="service-popup__text">
          სეანსის ხანგრძლივობა დამოკიდებულია საეპილაციო უბნის ზომაზე.
        </p>

        <p class="service-popup__text">
          პროცედურის შემდეგ მომენტალურად უბრუნდებით ცხოვრების ჩვეულ რითმს.
        </p>
        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="service-modal-18" class="service-popup mfp-with-anim mfp-hide">
      <img src="../images/content/articles-7.jpg" alt="">
      <button title="close" type="button" class="mfp-close">&#215;</button>
      <div class="service-popup__inner">
        <div class="service-popup__head">
          <h5 class="service-popup__title">
            ეპილაცია Nd:yag (ნეოდიმური) ლაზერით
          </h5>
          <div class="service-popup__price">
            900$ <span>დოლარიდან</span>
          </div>
        </div>
        <p class="service-popup__text">
          Nd:yag (ნეოდიმური) ლაზერი საეპილაციო ლაზერებს შორის ყველაზე გრძელი, 1064 nm. სიგრძის ტალღის გენერირებას ახდენს (ცნობისთვის: ალექსანდრიტის 755 nm, ხოლო დიოდის 810 nm), რაც მას ყველა სხვა ტიპისა და გენერაციის ლაზერებთან შედარებით მნიშვნელოვან უპირატესობას ანიჭებს:  სხივი ფაქტიურად არ შთაინთქმება კანის ზედა ფენაში, ამიტომ გამორიცხულია კანის დამწვრობის და სხვა ზედაპირული დაზიანებების ( კანის პიგმენტაციის შეცვლა) განვითარება. ამოტომაც Nd:yag ლაზერი დღეს ყველაზე უვნებელ და ეფექტურ ლაზერადაა მიჩნეული.
        </p>
        <p class="service-popup__text">
          ზოგადად, საქართველოში წარმოდგენილია შემდეგი ტიპის ლაზერები: ალექსანდრიტის (ლაზერის სიგრძე 755 nm), დიოდის ( ლაზერის სიგრძე 810 nm) და ნეოდიმური, ანუ  Nd:yag ლაზერი (ტალღის სიგრძით 1064 nm).
        </p>

        <p class="service-popup__text">
          ჩამოთვლილთაგან განსხვავებით Nd:yag ლაზერის სხივი აღწევს ღრმად, მოქმედებს ოქსიჰემოგლობინზე (და არა მელანინზე, როგორც ალექსანდრიტი და დიოდი) და აზიანებს თმის ბოლქვის მკვებავ კაპილარს, შედეგად თმა კვდება. ჯერ კიდევ პირველი პროცედურის შემდეგ უკვალოდ ქრება თმის საფარის  30-40%.
        </p>

        <p class="service-popup__text">
          სწორედ იმის გამო, რომ ლაზერი მოქმედებს ოქსიჰემოგლობინზე და არა მელანინზე, ანუ სხივი არ შთაინთქმება მელანინით,  არ აქვს შეზღუდვები კანის და თმის ფერის მიხედვით და ითვლება ოქროს სტანტარტად შედარებით მუქი, III-VI ტიპის (მათ შორის კავკასიური) და გარუჯული კანისთვის. ასევე, გამომდინარე იქიდან, რომ ლაზერი არ მოქნედებს მელანინზე, თმის პიგმენტაციის ხარისხს მისთვის მნიშვნელობა არ აქვს, ამიტომაც ლაზერის გამოყენება შესაძლებელია ქერა და უპიგმენტო თმაზე.
        </p>

        <p class="service-popup__text">
          აპარატი აღჭურვილია სპეციალური სისტემით, რომელიც პროცედურის ჩატარებას აბსოლუტურად უმტკივნეულოს და კომფორტულს ხდის.
        </p>

        <p class="service-popup__text">
          <span>
            ჩვენება:  თმის მოშორება ყველა ტიპის კაზე, განსაკუთრებით მუქი ფერის - III-VI ტიპის (მათ შორის კავკასიური), გარუჯული კანისთვის, შესაძლებელია ეპილაციის ჩატარება ზაფხულშიც.
          </span>
        </p>

        <p class="service-popup__text">
          უკუჩვენებები: კანის ქრონიკული ან მწვავე დაავადებები, დეკომპენსირებული დიაბეტი, 16 წლამდე ასაკი, კრიტიკული დღეები, ორსულობა-ლაქტაცია, ეპილეფსია, ავთვისებიანი სიმსივნე.
        </p>

        <p class="service-popup__text">
          წინასწარი მომზადება: არაა რეკომენდებული გარუჯვა პროცედურამდე 3 დღით ადრე ( მათ შორის ავტორუჯი).
        </p>

        <p class="service-popup__text">
          პროცედურის შემდგომ პერიოდში კანის მოვლა არ საჭიროებს განსაკუთრებულ მოვლას: საჭიროების შემთხვევაში, ექიმის მითითებით, შესაბამისი მალამოს ხმარება; არაა რეკომენდებული გარუჯვა შემდგომი 3 დღის და ცხელი აბაზანის მიღება შემდგომი 2 დღის განმავლობაში, ასევე მოსარიდებელია კანის მექანიკური გაღიზიანება.
        </p>

        <p class="service-popup__text">
          სეანსის ხანგრძლივობა დამოკიდებულია საეპილაციო უბნის ზომაზე.
        </p>

        <p class="service-popup__text">
          პროცედურის შემდეგ მომენტალურად უბრუნდებით ცხოვრების ჩვეულ რითმს.
        </p>

        <div class="service-popup__footer">
          <a href="#" class="service-popup__link">
            ზარის განხორციელება
          </a>
          <div class="service-popup__mail">
            <span>
              E-mail:
            </span>
            <a href="mailto:info@medicalgroup.ge">
              info@medicalgroup.ge
            </a>
          </div>
        </div>
      </div>
    </div>
`)
}, 10); */
