export function sortProducts(products, type) {
  const sorted = [...products];
  if (type === 'cheap') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (type === 'expensive') {
    sorted.sort((a, b) => b.price - a.price);
  }
  return sorted;
}
