export function renderProducts(productList, gallerySelector = '.products__magazine-gallery') {
  const gallery = document.querySelector(gallerySelector);
  const template = document.getElementById('product__card-template').content;

  gallery.innerHTML = '';

  productList.forEach(product => {
  const clone = document.importNode(template, true);
  const img = clone.querySelector('.product__card-image');

  console.log('product.image:', product.image);

  if (product.image && product.image.trim() !== '') {
  img.src = `/colors-test/images/${product.image}`;
  img.alt = product.title;
} else {
  img.style.display = 'none';
}

  clone.querySelector('.product__card-title').textContent = product.title;
  clone.querySelector('.product__card-price').textContent = `${product.price} ₽`;

  gallery.appendChild(clone);
});


  document.querySelector('.products__magazine-header-counter').textContent = `${productList.length} товаров`;
}
