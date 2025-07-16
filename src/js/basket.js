document.addEventListener('DOMContentLoaded', function () {
  const basketButton = document.querySelector('.header__basket');
  const overlay = document.querySelector('.overlay');
  const cartSidebar = document.querySelector('.basket__sidebar');
  const cartClose = document.querySelector('.basket__close');
  const clearButton = document.querySelector('.basket__clear');

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

  basketButton.addEventListener('click', function () {
    overlay.style.display = 'block';
    cartSidebar.classList.add('active');
    toggleBodyScroll(true);
  });

  function closeCart() {
    overlay.style.display = 'none';
    cartSidebar.classList.remove('active');
    toggleBodyScroll(false);
  }

  cartClose.addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);

  clearButton.addEventListener('click', () => {
    document.querySelector('.basket__items').innerHTML = '';
    updateCartTotal();
  });

  function addToCart(product) {
  const template = document.getElementById('cart__item-template');
  const clone = template.content.cloneNode(true);

  const itemElement = clone.querySelector('.cart__item');

  const img = clone.querySelector('.cart__item-image');
  img.src = `/colors-test/images/${product.image}`;
  img.alt = product.title;

  clone.querySelector('.cart__item-title').textContent = product.title;
  const priceElement = clone.querySelector('.cart__item-price');
  const quantityElement = clone.querySelector('.cart__item-quantity');
  const increaseBtn = clone.querySelector('.cart__item-increase');
  const decreaseBtn = clone.querySelector('.cart__item-decrease');

  let quantity = 1;
  itemElement.dataset.quantity = quantity;

  const updateItemPrice = () => {
    const totalPrice = product.price * quantity;
    priceElement.textContent = totalPrice.toLocaleString() + ' ₽';
    quantityElement.textContent = quantity;
    itemElement.dataset.quantity = quantity;
    updateCartTotal();
  };

  increaseBtn.addEventListener('click', () => {
    quantity++;
    updateItemPrice();
  });

  decreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity--;
      updateItemPrice();
    }
  });

  clone.querySelector('.cart__item-remove').addEventListener('click', function () {
    this.closest('.cart__item').remove();
    updateCartTotal();
  });

  document.querySelector('.basket__items').appendChild(clone);
  updateItemPrice();
}

  function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart__item');
    let total = 0;
    let itemCount = 0;

    cartItems.forEach(item => {
      const priceText = item.querySelector('.cart__item-price').textContent;
      const quantity = parseInt(item.dataset.quantity || '1');
      const itemPrice = parseInt(priceText.replace(/[^\d]/g, '')) || 0;

      total += itemPrice;
      itemCount += quantity;
    });

    document.querySelector('.basket__total-price').textContent = total.toLocaleString() + ' ₽';
    document.querySelector('.header__basket-counter').textContent = itemCount;
    document.querySelector('.basket__body-counter').textContent = `${itemCount} ${getPluralForm(itemCount, ['товар', 'товара', 'товаров'])}`;
  }

  function getPluralForm(n, forms) {
    return (n % 10 === 1 && n % 100 !== 11) ? forms[0]
      : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? forms[1]
      : forms[2];
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.product__card-add-to-basket')) {
      const productCard = e.target.closest('.product__card');

      const imgElement = productCard.querySelector('.product__image');
      let image = '';

      if (imgElement) {
        const src = imgElement.getAttribute('src');
        if (src && src.trim() !== '') {
          image = src.replace(/^\/?colors-test\/?images\//, '');
        }
      }

      const product = {
        title: productCard.querySelector('.product__card-title').textContent,
        price: parseInt(productCard.querySelector('.product__card-price').textContent.replace(' ₽', '')),
        image: image
      };

      addToCart(product);
    }
  });
});
