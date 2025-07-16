document.addEventListener('DOMContentLoaded', function() {
  const filterButton = document.querySelector('.products__magazine-mobile');
  const filter = document.querySelector('.products__filter');
  const overlay = document.createElement('div');
  overlay.className = 'filter-overlay';
  document.body.appendChild(overlay);

  function toggleBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
    document.body.style.position = lock ? 'fixed' : '';
    document.body.style.width = lock ? '100%' : '';
  }

  filterButton.addEventListener('click', function() {
    filter.classList.add('active');
    overlay.classList.add('active');
    toggleBodyScroll(true);
  });

  function closeFilter() {
    filter.classList.remove('active');
    overlay.classList.remove('active');
    toggleBodyScroll(false);
  }

  overlay.addEventListener('click', closeFilter);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && filter.classList.contains('active')) {
      closeFilter();
    }
  });

  const switches = document.querySelectorAll('.products__filter-switch input');
  switches.forEach(switchEl => {
    switchEl.addEventListener('change', function() {
      console.log('Фильтр изменен:', this.checked);
    });
  });
});