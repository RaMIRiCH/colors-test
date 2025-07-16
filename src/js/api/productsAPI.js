export async function fetchProducts(apiUrl) {
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
  return await response.json();
}
