export async function getProducts() {
  const request = await fetch('http://localhost:3000/api/products');
  const products = await request.json();
  return products;
}

export async function getProductById(id) {
  // console.log(id);
  const products = await getProducts();
  // console.log('1**', products);
  const product = products.find((p) => String(p.id) === String(id));
  // console.log('getProductById', product);
  return product;
}
