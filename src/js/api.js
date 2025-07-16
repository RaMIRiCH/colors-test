document.addEventListener('DOMContentLoaded', async function () {
  let products = [];
  const API_URL = 'https://6874bcdcdd06792b9c94ff8f.mockapi.io/api/colors/products';
  const gallery = document.querySelector('.products__magazine-gallery');
  const template = document.getElementById('product__card-template').content;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    products = await response.json();

    if (!products || products.length === 0) {
      gallery.innerHTML = '<div style="padding: 20px; text-align: center;">Товары не найдены</div>';
      return;
    }

    renderProducts(products);

  } catch (error) {
    console.error('Ошибка:', error);
    gallery.innerHTML = `
      <div style="padding: 20px; text-align: center; color: red;">
        <p>Ошибка при загрузке товаров</p>
        <p><small>${error.message}</small></p>
        <button onclick="location.reload()" style="padding: 5px 10px; margin-top: 10px;">Обновить</button>
      </div>
    `;
  }

  function renderProducts(productList) {
    gallery.innerHTML = '';
    productList.forEach(product => {
      const clone = document.importNode(template, true);
      const imgElement = clone.querySelector('.product__card-image img');
      imgElement.src = `/images/${product.image}`;
      imgElement.alt = product.title;
      imgElement.onerror = function () {
        this.style.display = 'none';
      };
      clone.querySelector('.product__card-title').textContent = product.title;
      clone.querySelector('.product__card-price').textContent = `${product.price} ₽`;
      gallery.appendChild(clone);
    });

    document.querySelector('.products__magazine-header-counter').textContent = `${productList.length} товаров`;
  }

  function sortProducts(type) {
    let sorted = [...products];
    if (type === 'cheap') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === 'expensive') {
      sorted.sort((a, b) => b.price - a.price);
    }
    renderProducts(sorted);
  }

  document.querySelectorAll('.expanding__filter-option').forEach(option => {
    option.addEventListener('click', function () {
      const sortType = this.getAttribute('data-sort');
      sortProducts(sortType);
    });
  });
});
