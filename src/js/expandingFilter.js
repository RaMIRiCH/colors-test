import { sortProducts } from './logic/sorting.js';
import { renderProducts } from './render.js';

export function setupExpandingFilter(allProducts) {
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

  closedState.addEventListener('click', (e) => {
    e.stopPropagation();
    filter.classList.add('expanded');
    overlay.style.display = 'block';
    requestAnimationFrame(() => overlay.style.opacity = '1');
    toggleScroll(true);
  });

  options.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      closedState.textContent = option.textContent;
      options.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');

      filter.classList.remove('expanded');
      overlay.style.opacity = '0';
      setTimeout(() => overlay.style.display = 'none', 300);
      toggleScroll(false);

      const sortType = option.dataset.sort;
      const sorted = sortProducts(allProducts, sortType);
      renderProducts(sorted);
    });
  });

  overlay.addEventListener('click', () => {
    filter.classList.remove('expanded');
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 300);
    toggleScroll(false);
  });

  document.addEventListener('click', (e) => {
    if (!filter.contains(e.target) && filter.classList.contains('expanded')) {
      filter.classList.remove('expanded');
      overlay.style.display = 'none';
      toggleScroll(false);
    }
  });
}
