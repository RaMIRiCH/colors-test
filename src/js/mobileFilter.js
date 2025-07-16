import { renderProducts } from './render.js';
import { sortProducts } from './logic/sorting.js';

export function setupMobileFilter(allProducts) {
  const filterButton = document.querySelector('.products__magazine-mobile');
  const filter = document.querySelector('.products__filter');
  const overlay = document.querySelector('.overlay');
  const checkboxes = document.querySelectorAll('.products__filter-switch input[type="checkbox"]');
  const sortOptions = document.querySelectorAll('.expanding__filter-option');

  let currentFilters = [];
  let currentSort = null;

  function toggleBodyScroll(lock) {
    if (lock) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }

  function applyFilterAndSort() {
    let result = currentFilters.length === 0
      ? allProducts
      : allProducts.filter(product =>
          currentFilters.every(filterName => product[filterName] === true)
        );

    if (currentSort) {
      result = sortProducts(result, currentSort);
    }

    renderProducts(result);
  }

  filterButton.addEventListener('click', () => {
    filter.classList.add('active');
    overlay.style.display = 'block';
    setTimeout(() => (overlay.style.opacity = '1'), 10);
    toggleBodyScroll(true);
  });

  overlay.addEventListener('click', () => {
    if (filter.classList.contains('active')) {
      filter.classList.remove('active');
      overlay.style.opacity = '0';
      setTimeout(() => (overlay.style.display = 'none'), 300);
      toggleBodyScroll(false);
    }
  });

  checkboxes.forEach(cb => cb.addEventListener('change', () => {
    currentFilters = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    applyFilterAndSort();
  }));

  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      sortOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      currentSort = option.dataset.sort;
      applyFilterAndSort();
    });
  });
}
