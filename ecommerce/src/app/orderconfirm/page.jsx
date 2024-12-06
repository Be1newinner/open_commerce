"use client";
import { orderDetailsRequest } from "@/redux/reducers/cartReducer";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
// import { useParams } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderConfirmation = () => {

  // const { id } = useSearchParams();
  const searchParams = useSearchParams();
  console.log("Search : ", searchParams);
  const id = searchParams.get("id");


  const { data, orderSuccess, quantity, totalPrice } = useSelector(
    (state) => state.cart
  );
  console.log("order data is  => ", data);
  console.log("order success => ", orderSuccess);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderDetailsRequest(id));
  }, [dispatch, id]);

  const orderData = {
    orderNumber: "#10000053",
    quantity: quantity,
    customer: {
      fullName: "",
      phone: "",
      email: "",
      paymentMethod: "",
      paymentStatus: "",
    },
    pricing: {
      subtotal: totalPrice,
      shippingFee: "Local Pickup - Free",
      tax: (totalPrice * 5) / 100,
      discount: (totalPrice * 10) / 100,
      couponCode: "OR7FWQLKWOAO",
    },
  };

  const { orderNumber, customer, pricing } = orderData;

  return (
    <div className="bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-green-600">
            Your order is successfully placed
          </h2>
          <p className="text-gray-600">
            Thank you for purchasing our products!
          </p>
        </div>

        <div className="md:flex md:space-x-6">
          <div className="flex-1 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4">Customer Information</h3>
            <div className="text-sm space-y-2">
              <p>
                <span className="font-bold">Full name:</span>
                {customer.fullName}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {customer.phone}
              </p>
              <p>
                <span className="font-bold">Email:</span> {customer.email}
              </p>
              <p>
                <span className="font-bold">Payment method:</span>
                {customer.paymentMethod}
              </p>
              <p>
                <span className="font-bold">Payment status:</span>
                <span className="text-yellow-500">
                  {customer.paymentStatus}
                </span>
              </p>
            </div>
            <button className="mt-6 bg-blue-800 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
              Continue shopping
            </button>
          </div>

          {/* Order Summary */}
          {data.map((product, index) => (
            <div key={index} className="flex-1">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="bg-gray-50 border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-bold">Order number:</p>
                  <p>{orderNumber}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Image
                    width={100}
                    height={100}
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {quantity}
                    </p>
                    <p>${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p>${pricing.subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping fee:</p>
                    <p>{pricing.shippingFee}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Tax:</p>
                    <p>${pricing.tax.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>
                      Discount:
                      <span className="text-gray-500 text-sm">
                        (Using coupon code: {pricing.couponCode})
                      </span>
                    </p>
                    <p className="text-green-500">
                      -${pricing.discount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <p>Total:</p>
                  <p>${pricing.subtotal + pricing.tax - pricing.discount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
