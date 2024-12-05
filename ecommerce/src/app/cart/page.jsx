"use client";
import { FaMinus, FaPlus } from "react-icons/fa";
import image1 from "@/assets/1.png";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCart,
  decreaseQuantity,
  increaseQuantity,
  RemoveCart,
} from "@/redux/reducers/cartReducer";

export default function Cart() {
  const { data, tax, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (sku) => {
    dispatch(RemoveCart(sku));
  };

  return (
    <div className="max-w-7xl my-20 mx-auto justify-between max-xl:w-[90%]">
      <div className="flex gap-10 max-xl:flex-wrap max-md:w-full max-md:h-full max-md:p-0 max-md:flex-wrap min-md:w-4/5 ">
        <div className="w-4/6 max-md:w-full lg:w-full md:w-full">
          <div className="flex justify-between max-md:hidden p-4 bg-gray-200 ">
            <h1 className="font-semibold">Product</h1>
            <h1 className="font-semibold">Price</h1>
            <h1 className="font-semibold">Quantity</h1>
            <h1 className="font-semibold">Total</h1>
          </div>
          {data.map((item) => (
            <div key={item.sku} className="flex items-center max-md:hidden">
              <div className="flex max-sm:flex-wrap">
                <Image src={image1} className="p-4" width={100} height={100} />
                <div className="font-medium w-[200px] p-4 max-md:w-1/4">
                  <h1>{item.name}</h1>
                  {item.stock === 0 ? (
                    <p className="text-red-800 text-sm mt-2">Out of stock</p>
                  ) : (
                    <p className="text-green-800 text-sm mt-2">In stock</p>
                  )}
                  <h6 className="text-sm mt-1">
                    Vendor: {item.vendor ? item.vendor : "Shofy"}
                  </h6>
                  <h6 className="text-sm mt-1">(Color: Black, Size: XL)</h6>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-between ">
                <div className="p-4 font-medium max-md:w-1/4">
                  <p>${item.price}</p>
                </div>
                <div className="flex gap-4 items-center border-2 h-8 p-3 rounded-full ">
                  <button
                    type="button"
                    onClick={() => dispatch(increaseQuantity({ sku: item.sku }))}
                  >
                    <FaPlus className="md:text-sm" />
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center focus:outline-none border-x-2"
                  />
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQuantity({ sku: item.sku }))}
                  >
                    <FaMinus className="md:text-sm" />
                  </button>
                </div>
                <div className="p-4 font-medium max-md:ml-1 max-md:w-1/4">
                  <p>${(item.price * item.quantity).toFixed(2)}</p> {/* Total for this item */}
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(item.sku)}
                  className="p-4 font-medium max-md:ml-1 max-md:w-1/4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Code Section */}
          <hr />
          <div className="mt-8 max-md:px-10 md:px-4">
            <span>Coupon Code:</span>
            <div className="flex gap-2 ">
              <input
                type="text"
                id="couponCode"
                name="couponCode"
                className="border border-black h-12 w-2/5 max-md:w-full p-2 outline-none"
                placeholder="Enter Coupon Code"
              />
              <button className="h-full w-full bg-black text-white flex justify-center items-center hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-2/6 shadow-2xl p-10 max-md:flex-wrap max-md:w-full">
          <div>
            <div className="flex justify-between font-medium text-xl ">
              <h1>Subtotal</h1>
              <p>${totalPrice.toFixed(2)}</p> {/* Display subtotal */}
            </div>
            <br />
            <hr />

            {/* Tax Section */}
            <div className="flex justify-between mt-4">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span> {/* Display tax */}
            </div>

            {/* Total Section */}
            <div className="flex justify-between font-medium text-xl mt-4 ">
              <h1>Total</h1>
              <p>${(totalPrice + tax).toFixed(2)}</p> {/* Display total */}
            </div>
            <p className="text-sm mt-2">(Shipping fees not included)</p>
          </div>

          {/* Checkout Button */}
          <Link href="/checkout">
            <button className="bg-black text-white w-full h-12 mt-4 hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </Link>

          {/* Continue Shopping Link */}
          <Link href="/" className="flex justify-center hover:text-blue-700 mt-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}