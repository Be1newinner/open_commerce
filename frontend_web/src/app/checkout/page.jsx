"use client";
// import React, { useEffect, useState } from "react";
import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrderRequest } from "@/redux/reducers/orderReducer";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.data);
  const subtotal = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.quantity);
  // const message = useSelector((state) => state.order.error);
  // console.log("message => ", message);
  const shipping = (subtotal * 5) / 100;
  const discount = (subtotal * 10) / 100;
  const total = subtotal + shipping - discount;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    pincode: "",
    cartItems: cartItems,
    quantity: quantity,
    subtotal: subtotal,
    shipping: shipping,
    discount: discount,
    total: total,
  });

  const Router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadOrderRequest(formData));
    Router.push("/orderconfirm");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* <p className="text-red-500">{cartItems.message}</p> */}
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                ✓
              </div>
              <span className="text-sm">Cart</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                ✓
              </div>
              <span className="text-sm">Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm">Checkout</span>
            </div>
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Checkout</h2>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4">Shipping Information</h3>
              <div className="flex gap-4 mb-4">
                <button className="flex-1 bg-blue-50 border border-gray-200 rounded-md py-2 px-4">
                  <span className="mr-2">🚚</span> Delivery
                </button>
                <button className="flex-1 border border-gray-200 rounded-md py-2 px-4">
                  <span className="mr-2">📦</span> Pick up
                </button>
              </div>
            </div>

            <form className="">
              <div className="mb-4">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full name"
                  className="w-full border hover:outline-none border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email address"
                  className="w-full border hover:outline-none border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex gap-2 mb-4">
                <select className="w-20 border border-gray-300 rounded-md p-2">
                  {/* <option>🇺🇸 +1</option> */}
                  <option>+91</option>
                </select>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone number"
                  className="flex-1 border hover:outline-none border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="choose">Choose state</option>
                  <option value="delhi">Delhi</option>
                  <option value="haryana">Haryana</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="City"
                  className="border hover:outline-none border-gray-300 rounded-md p-2"
                />
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  type="text"
                  placeholder="Pincode"
                  className="border hover:outline-none border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="border-gray-300 hover:outline-none"
                />
                <label htmlFor="terms" className="text-sm">
                  I have read and agree to the Terms and Conditions
                </label>
              </div>
            </form>
          </div>

          {/* Right Column - Cart Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Review your cart</h3>
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <Image
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm text-gray-600">
                          {quantity}x
                        </span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-1 border border-gray-300 rounded-md p-2"
                  />
                  <button className="border border-blue-600 text-blue-600 rounded-md py-2 px-4">
                    Apply
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-blue-600">
                    <span>Discount</span>
                    <span>${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2"
                >
                  Pay Now
                </button>

                <div className="flex items-center gap-2 justify-center mt-4 text-sm text-gray-600">
                  <Lock size={16} />
                  <span>Secure Checkout - SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
