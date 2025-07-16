import './fonts/stylesheet.scss';
import './scss/styles.scss';

import SwiperInit from './js/swiper.js';
import './js/toggle.js';
import './js/basket.js';
import './js/burger.js';

import { fetchProducts } from './js/api/productsAPI.js';
import { sortProducts } from './js/logic/sorting.js';

import { setupExpandingFilter } from './js/expandingFilter.js';
import { setupMobileFilter } from './js/mobileFilter.js';
import { renderProducts } from './js/render.js';

const API_URL = 'https://6874bcdcdd06792b9c94ff8f.mockapi.io/api/colors/products';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const products = await fetchProducts(API_URL);

    if (!products.length) {
      document.querySelector('.products__magazine-gallery').innerHTML = '<p>Товары не найдены</p>';
      return;
    }

    renderProducts(products);
    setupExpandingFilter(products);
    setupMobileFilter(products);
    SwiperInit.init();

  } catch (error) {
    console.error('Ошибка загрузки данных:', error.message);
    document.querySelector('.products__magazine-gallery').innerHTML = `
      <div style="padding: 20px; text-align: center; color: red;">
        <p>Ошибка при загрузке товаров</p>
        <p><small>${error.message}</small></p>
        <button onclick="location.reload()">Обновить</button>
      </div>
    `;
  }
});
