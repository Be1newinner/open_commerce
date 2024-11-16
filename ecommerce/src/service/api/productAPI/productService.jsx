export default async function loadProductService() {
    const response = await fetch("http://localhost:3001/api/product");
    const data = await response.json();
    console.log("response data is => ", data);
  return data;
}
