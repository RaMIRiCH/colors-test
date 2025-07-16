export function setupMobileToggle() {
  const filterButton = document.querySelector('.products__magazine-mobile');
  const filter = document.querySelector('.products__filter');
  const overlay = document.querySelector('.overlay');
  const cartSidebar = document.querySelector('.basket__sidebar');

  function toggleBodyScroll(lock) {
    document.body.style.overflow = lock ? 'hidden' : '';
    document.body.style.position = lock ? 'fixed' : '';
    document.body.style.width = lock ? '100%' : '';
  }

  filterButton.addEventListener('click', () => {
    if (cartSidebar?.classList.contains('active')) {
      cartSidebar.classList.remove('active');
    }

    filter.classList.add('active');
    overlay.style.display = 'block';
    setTimeout(() => overlay.style.opacity = '1', 10);
    toggleBodyScroll(true);
  });

  overlay.addEventListener('click', () => {
    if (filter.classList.contains('active')) {
      filter.classList.remove('active');
      overlay.style.opacity = '0';
      setTimeout(() => overlay.style.display = 'none', 300);
      toggleBodyScroll(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filter.classList.contains('active')) {
      filter.classList.remove('active');
      overlay.style.opacity = '0';
      setTimeout(() => overlay.style.display = 'none', 300);
      toggleBodyScroll(false);
    }
  });
}
