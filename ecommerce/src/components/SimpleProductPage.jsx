"use client";
import React, { useEffect, useState } from "react";
import { BiHeart, BiMinus, BiPlus } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import Image from "next/image";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";

function SingleProductPage() {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const images = [image1, image2, image3, image4, image5];

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    const mockProduct = {
      name: "Sample Product",
      price: 29.99,
      description: "This is a sample product description.",
      category: "Category Name",
      image: image1,
    };
    setProduct(mockProduct);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden shadow-sm ${
                    activeImage === index ? "ring-2 ring-violet-500" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail view ${index + 1}`}
                    className="w-[100px] h-[80px] object-contain object-center p-2"
                  />
                </button>
              ))}
            </div>
            <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={images[activeImage]}
                alt={`Product view ${activeImage + 1}`}
                className="w-full h-[600px] object-contain object-center p-4"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {product.name}
            </h1>
            <p className="text-4xl font-bold text-violet-600">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description}
            </p>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <div className="flex items-center border-2 border-violet-300 rounded-lg shadow-md overflow-hidden w-40 bg-white">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3 text-violet-600 hover:bg-violet-100 focus:outline-none transition-colors duration-200 active:bg-violet-200"
                  >
                    <BiMinus className="h-5 w-5" />
                  </button>
                  <div className="w-full text-center border-x-2 border-violet-300 py-2 text-lg font-semibold text-violet-700">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    className="p-3 text-violet-600 hover:bg-violet-100 focus:outline-none transition-colors duration-200 active:bg-violet-200"
                  >
                    <BiPlus className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                <button className="flex-1 bg-violet-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out">
                  <CgShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </button>
                <button
                  type="button"
                  className="bg-gray-100 py-3 px-8 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out"
                >
                  <BiHeart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? "border-violet-500 text-violet-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8 prose prose-violet max-w-none">
            {activeTab === "description" && <p>{product.description}</p>}
            {activeTab === "specifications" && (
              <ul className="list-disc pl-5">
                <li>Category: {product.category}</li>
                <li>Material: Premium quality materials</li>
                <li>Care Instructions: Follow label instructions</li>
                <li>Origin: Imported</li>
              </ul>
            )}
            {activeTab === "reviews" && (
              <p>
                Customer reviews will be displayed here. This section can be
                expanded to include individual review cards, ratings breakdown,
                and an option to write a new review.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleProductPage;
