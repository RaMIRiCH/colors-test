document.addEventListener('DOMContentLoaded', function () {
  const filter = document.querySelector('.expanding__filter');
  const closedState = filter.querySelector('.expanding__filter-closed');
  const options = filter.querySelectorAll('.expanding__filter-option');
  const overlay = document.querySelector('.overlay');
  
  let scrollPosition = 0;

  function toggleScroll(lock) {
    if (lock) {
      scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollPosition);
    }
  }

  closedState.addEventListener('click', function (e) {
    e.stopPropagation();
    filter.classList.add('expanded');
    overlay.style.display = 'block';
    toggleScroll(true);
  });

  options.forEach(option => {
    option.addEventListener('click', function (e) {
      e.stopPropagation();

      closedState.textContent = this.textContent;

      options.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');

      filter.classList.remove('expanded');
      overlay.style.display = 'none';
      toggleScroll(false);

      const sortType = this.dataset.sort;
      sortProducts(sortType);
    });
  });

  overlay.addEventListener('click', function () {
    if (filter.classList.contains('expanded')) {
      filter.classList.remove('expanded');
      overlay.style.display = 'none';
      toggleScroll(false);
    }
  });

  document.addEventListener('click', function (e) {
    if (!filter.contains(e.target) && filter.classList.contains('expanded')) {
      filter.classList.remove('expanded');
      overlay.style.display = 'none';
      toggleScroll(false);
    }
  });

  function sortProducts(type) {
    console.log('Сортировка по:', type);
  }
});