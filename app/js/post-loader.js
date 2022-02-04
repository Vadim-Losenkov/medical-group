function postLoader(settings = {}) {
  const openPopup = window.location.hash.startsWith(`#${settings.folder[0]}-modal-`)

  const $modals = document.querySelector(settings.modalsSelector || '.modals-list')
  const $posts = document.querySelector(settings.postsSelector)
  
  const url = (type) => `../${
    settings.folder.length > 1
      ? settings.folder.join('-')
      : settings.folder
  }/data/data-${type}.html`
  const preloadTemplate = (index) => {
    switch (settings.folder[0]) {
      case 'articles':
        return `
          <div data-modal-loader="${index || '_'}" class="articles__item loading">
            <div class="articles__item-inner">
              <div class="articles__item-button"></div>
              <h4 class="articles__item-title"></h4>
              <p class="articles__item-text"></p>
            </div>
            <div class="articles__item-footer"></div>
          </div>
        `
      case 'service':
        return `
        <div class="service__item onloading">
          <div class="service__item-image"></div>
          <div class="service__item-inner">
            <h4 class="service__item-title"></h4>
            <p class="service__item-text"></p>
            <h6 class="service__item-price"> </h6>
          </div>
        </div>
        `
      case 'faq':
        return `
          <div class="faq__item faq__item--520 faq__item--blur wow slideInLeft" data-wow-duration="1.2s">
            <div style="background-color: #855aff;" class="faq__item-grad grad faq-grad item-1"></div> <a href="#"
              class="faq__item-button faq__item-button--lightpurple"> FAQ </a>
            <h3 class="faq__item-title"> რა სხვაობაა ალექსანდრიტის, დიოდის და ნეოდიმურ ლაზერებს შორის? </h3>
            <p class="faq__item-text faq__item-text--lightpurple"> ზოგადად, ეპილაცია ორ ტიპად შეიძლება დავყოთ, ესენია: ლაზერული <a
                class="faq-popup-btn" data-effect="mfp-zoom-in" href="#faq-modal-1"> სრული პასუხის ჩვენება </a> </p>
          </div>
        `
    }
  }
  
  function getPosts(postsUrl) {
    for (let i = 0; i < 3; i++) {
      $posts.insertAdjacentHTML('beforeend', preloadTemplate())
    }
  
    axios.get(postsUrl).then((resp) => {
      $modals.innerHTML = resp.data
      
      axios.get(url('post')).then((response) => {
        // document.querySelectorAll('[data-modal-loader="_"]').forEach($el => {
        //   $el.parentNode.removeChild($el)
        // })
        
        // $posts.innerHTML = response.data
        
        // if (openPopup) {
        //   document.querySelector(`[href="${window.location.hash}"]`).click()
        // }
      })
    })
  }
  
  getPosts(url('modal'))
}
