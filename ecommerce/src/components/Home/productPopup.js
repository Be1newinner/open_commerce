// import { AddCart } from "@/redux/reducers/cartReducer";
import { loadSingleProductRequest } from "@/redux/reducers/productReducer";
import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductPopup = () => {
  const slug = useParams.slug;
  // const ProductDetails = useSelector((state) => state.product.data);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleProductRequest(slug));
  }, [dispatch, slug]); 

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10">
          <div className="bg-white shadow-md rounded-md p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <span className="text-gray-500 line-through">
                ${product.price}.00
              </span>
            </div>
            <p className="text-2xl font-bold mb-4">$878.85</p>
            <div className="mb-4">
              <p className="font-medium mb-2">Weight:</p>
              <div className="flex space-x-4">
                <div className="bg-gray-200 rounded-md px-4 py-2">3KG</div>
                <div className="bg-gray-200 rounded-md px-4 py-2">5KG</div>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-medium mb-2">Boxes:</p>
              <div className="flex space-x-4">
                <div className="bg-gray-200 rounded-md px-4 py-2">1 Box</div>
                <div className="bg-gray-200 rounded-md px-4 py-2">2 Boxes</div>
                <div className="bg-gray-200 rounded-md px-4 py-2">3 Boxes</div>
              </div>
            </div>
            <p className="mb-4">12 products available</p>
            <div className="flex items-center mb-4">
              <button className="bg-gray-200 rounded-l-md px-4 py-2 hover:bg-gray-300">
                -
              </button>
              <input
                type="text"
                className="bg-gray-200 px-4 py-2 w-16 text-center"
                value={quantity}
                readOnly
              />
              <button className="bg-gray-200 rounded-r-md px-4 py-2 hover:bg-gray-300">
                +
              </button>
              <button className="bg-blue-500 text-white rounded-md px-6 py-2 ml-4 hover:bg-blue-600">
                Add To Cart
              </button>
            </div>
            <a href="#" className="text-blue-500 hover:underline">
              View full details
            </a>
          </div>
      
    </div>
  );
};

export default ProductPopup;
