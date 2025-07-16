document.addEventListener('DOMContentLoaded', function() {
  const burgerButton = document.querySelector('.burger__mobile-button');
  const burgerSidebar = document.querySelector('.burger__sidebar');
  const burgerClose = document.querySelector('.burger__close');
  const overlay = document.querySelector('.overlay');

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

  function showOverlay() {
    overlay.style.display = 'block';
    setTimeout(() => overlay.style.opacity = '1', 10);
  }

  function hideOverlay() {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 300);
  }

  burgerButton.addEventListener('click', function() {
    burgerSidebar.classList.add('active');
    showOverlay();
    toggleBodyScroll(true);
  });

  function closeBurger() {
    burgerSidebar.classList.remove('active');
    hideOverlay();
    toggleBodyScroll(false);
  }

  burgerClose.addEventListener('click', closeBurger);
  overlay.addEventListener('click', function() {
    if (burgerSidebar.classList.contains('active')) {
      closeBurger();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && burgerSidebar.classList.contains('active')) {
      closeBurger();
    }
  });
});