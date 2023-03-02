export async function getProducts() {
  const request = await fetch('http://localhost:3000/api/products');
  const products = await request.json();
  return products;
}

export async function getProductById(id) {
  const products = await getProducts();
  const product = products.find((p) => String(p.id) === String(id));
  return product;
}
