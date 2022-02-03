function postLoader(settings = {}) {
  const $modals = document.querySelector(settings.modalsSelector || '.modals-list')
  const $posts = document.querySelector(settings.postsSelector)
  
  const url = (type) => `../${settings.folder}/data/data-${type}.html`
  const preloadTemplate = (index) => `
    <div data-modal-loader="${index || '_'}" class="articles__item loading">
      <div class="articles__item-inner">
        <div class="articles__item-button"></div>
        <h4 class="articles__item-title"></h4>
        <p class="articles__item-text"></p>
      </div>
      <div class="articles__item-footer"></div>
    </div>
  `
  
  function getPosts(postsUrl) {
    for (let i = 0; i < 3; i++) {
      $posts.insertAdjacentHTML('beforeend', preloadTemplate())
    }
  
    axios.get(postsUrl).then((resp) => {
      $modals.innerHTML = resp.data
  
      axios.get(url('post')).then((response) => {
        document.querySelectorAll('[data-modal-loader="_"]').forEach($el => {
          $el.parentNode.removeChild($el);
        })
  
        $posts.innerHTML = response.data
      })
    })
  }
  
  getPosts(url('modal'))
}

postLoader({
  folder: 'articles',
  postsSelector: '.articles__inner'
})