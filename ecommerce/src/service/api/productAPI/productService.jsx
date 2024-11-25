export default async function loadProductService() {
  const response = await fetch("http://localhost:3001/api/product");
  const data = await response.json();
  console.log("response all data is => ", data);
  return data;
}

export async function loadSingleProductService(sku) {
  const response = await fetch(`http://localhost:3001/api/product/${sku}`);
  const data = await response.json();
  console.log("response single data is => ", data);
  return data;
}

