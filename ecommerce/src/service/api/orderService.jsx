export default async function loadOrderService(data) {
  // console.log("Data => ", data);

  const response = await fetch("http://localhost:3003/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  console.log("response order data is => ", res);
  return res;
}

export async function getOrderDetailsById(id) {
  const response = await fetch(`http://localhost:3003/api/order/${id}`);
  const res = await response.json();
  console.log("response orderdetails by id is => ", res);
  return res;
}
