"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { CiGrid2H } from "react-icons/ci";
import SidebarFilter from "../../components/product/SidebarFilter";
import ProductListGrid from "../../components/product/productListGrid";
import Category2 from "../../components/Category2";
import { loadAllProductRequest } from "@/redux/reducers/productReducer";
import { AddCart } from "@/redux/reducers/cartReducer";
import image1 from "@/assets/1.png";

export default function ProductList() {
  const [grid, setGrid] = useState(true);

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.data);
  
  // console.log("product :",productData);

  useEffect(() => {
    dispatch(loadAllProductRequest());
  }, [dispatch]);

  // Add to cart handler
  const handleAddToCart = (product) => {
    dispatch(AddCart(product));
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`star-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }
    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half-star"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }
    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-star-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  // Toggle grid/list view
  const handleGrid = () => setGrid(false);
  const handleList = () => setGrid(true);

  return (
    <div>
      <div className="bg-gray-100">
        <div className="py-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold">Products</h1>
          <h1 className="text-base mt-1 text-gray-500">Home / Products</h1>
        </div>
      </div>
      <Category2 />

      <div>
        <div className="max-w-7xl mx-auto flex items-center py-10">
          <input
            type="search"
            placeholder="Search..."
            className="w-[300px] py-3 px-4 focus:outline-none border-2 border-gray-300"
          />
          <IoGridOutline
            onClick={handleGrid}
            size={50}
            color="#000"
            className={`ml-8 cursor-pointer border-2 p-2 ${grid == false ? "border-gray-800" : "border-gray-300"}
            `}
          />
          <CiGrid2H
            onClick={handleList}
            size={50}
            color="#000"
            className={`ml-3 cursor-pointer border-2 p-2 ${grid ? "border-gray-800" : "border-gray-300"}
            `}
          />
          <span className="ml-3 text-gray-500">
            {productData?.length || 0} Products found
          </span>
          <div className="border-2 border-gray-300 ml-auto w-[200px]">
            <select
              className="py-3 w-full px-2 focus:outline-none"
              name="sort"
              id="sort"
            >
              <option value="newest">Default</option>
              <option value="oldest">Oldest</option>
              <option value="most-popular">Most Popular</option>
            </select>
          </div>
          <div className="border-2 border-gray-300 ml-3 w-[100px]">
            <select
              className="py-3 w-full px-2 focus:outline-none"
              name="sort"
              id="sort"
              defaultValue={"12"}
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] max-xl:mx-4 sm:grid-cols-2 max-w-7xl mx-auto justify-between mt-10">
        <SidebarFilter />
        <section className="max-w-5xl max-xl:mx-auto max-xl:px-4">
          {grid ? (
            Array.isArray(productData) && productData?.map((product) => (
              <div
                key={product.sku}
                className="mb-4 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                      <div className="w-full h-auto aspect-square flex justify-center items-center bg-gray-50 rounded-lg overflow-hidden">
                        <Link href={`/product/${product.sku}`}>
                          <Image
                            src={product.image || image1}
                            alt={product.name || "Product Image"}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <div className="text-sm text-gray-600 mb-2">
                        {product.store}
                      </div>
                      <Link href={`/product/${product.sku}`}>
                        <h1 className="text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h1>
                      </Link>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product.rating} rating)
                        </span>
                      </div>
                      <div className="text-xl font-bold text-blue-600 mb-4">
                        ${product.price}.00
                      </div>
                      <p className="text-gray-700 mb-6">
                        {product.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-2 rounded"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <ProductListGrid />
          )}
        </section>
      </div>
    </div>
  );
}
