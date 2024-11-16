"use client";
import React, { useEffect, useState } from "react";
import Category2 from "../../components/Category2";
import Image from "next/image";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import SidebarFilter from "../../components/product/SidebarFilter";
import { IoGridOutline } from "react-icons/io5";
import { CiGrid2H } from "react-icons/ci";
import ProductListGrid from "../../components/product/productListGrid";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductRequest } from "@/redux/reducers/productReducer";

export default function ProductList() {
  const [grid, setGrid] = useState(true);

  const productData = useSelector((state) => state.product.data);
  const products = productData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProductRequest());
  }, [dispatch]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

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

  const handleGrid = () => {
    setGrid(false);
  };

  const handleList = () => {
    setGrid(true);
  };

  return (
    <div className=" ">
      <div className="bg-gray-100  ">
        <div className="py-10 max-w-7xl mx-auto ">
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
            className="w-[300px] py-3 px-4 focus:outline-none border-2 border-gray-300 "
          />
          <IoGridOutline
            onClick={handleGrid}
            size={50}
            color="#000"
            className={`ml-8 cursor-pointer border-2 p-2 ${
              grid == false ? "border-gray-800" : "border-gray-300"
            }`}
          />
          <CiGrid2H
            onClick={handleList}
            size={50}
            color="#000"
            className={`ml-3 cursor-pointer border-2 p-2 ${
              grid ? "border-gray-800" : "border-gray-300"
            }`}
          />
          <span className="ml-3 text-gray-500">56 Products found</span>
          <div className="border-2 border-gray-300 ml-auto w-[200px]">
            <select
              className="py-3 w-full px-2 focus:outline-none "
              name="sort"
              id="sort"
            >
              <option value="newest" className="">
                Default
              </option>
              <option value="oldest">Oldest</option>
              <option value="most-popular">Most Popular</option>
            </select>
          </div>
          <div className="border-2 border-gray-300 ml-3 w-[100px]">
            <select
              className="py-3 w-full px-2 focus:outline-none "
              name="sort"
              id="sort"
              defaultValue={"24"}
            >
              <option value="newest" className="">
                12
              </option>
              <option value="oldest">24</option>
              <option value="most-popular">36</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] max-xl:mx-4 sm:grid-cols-2 max-w-7xl mx-auto justify-between mt-10">
        <SidebarFilter />
        <section className="max-w-5xl max-xl:mx-auto max-xl:px-4 ">
          {grid ? (
            products.map((product) => (
              <Link key={product.sku} href={`/product/${product.sku}`}>
                <div className=" mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3">
                        <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt="Product Image"
                            className="object-contain w-full h-full p-4"
                          />
                        </div>
                      </div>

                      <div className="w-full md:w-2/3">
                        <div className="text-sm text-gray-600 mb-2">
                          {product.store}
                        </div>

                        <h1 className="text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h1>

                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">{renderStars(3.5)}</div>
                          <span className="text-sm text-gray-600">
                            ({product.reviews} reviews)
                          </span>
                        </div>

                        <div className="text-xl font-bold text-blue-600 mb-4">
                          ${product.price}.00
                        </div>

                        <p className="text-gray-700 mb-6">
                          {product.description}
                        </p>

                        {/* Add to Cart Button */}
                        <button className="bg-gray-900 text-white hover:bg-gray-800 px-6 py-2 rounded">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <ProductListGrid />
          )}
        </section>
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    store: "Robert's Store",
    name: "ASUS ROG Swift PG279QM 27-Inch Gaming Monitor",
    rating: 3.5,
    reviews: 9,
    price: 1175.0,
    description:
      "We can provide exceptional noise isolation and the best all-day comfort by mixing firm foam for the outer with soft foam for the interior of the ear cushions.",
    image: image1,
  },
  {
    id: 2,
    store: "Tech Haven",
    name: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    rating: 4.8,
    reviews: 1256,
    price: 348.0,
    description:
      "Industry-leading noise canceling with Dual Noise Sensor technology and exceptional sound quality with Edge-AI.",
    image: image2,
  },
  {
    id: 3,
    store: "Gaming Paradise",
    name: "Logitech G Pro X Mechanical Gaming Keyboard",
    rating: 4.2,
    reviews: 487,
    price: 129.99,
    description:
      "Tournament-ready pro-grade mechanical gaming keyboard with swappable switches and RGB lighting.",
    image: image3,
  },
  {
    id: 4,
    store: "Elite Electronics",
    name: 'Samsung 49" Odyssey G9 Gaming Monitor',
    rating: 4.6,
    reviews: 325,
    price: 1299.99,
    description:
      "49-inch QLED gaming monitor with Dual QHD resolution and 240Hz refresh rate for immersive gaming.",
    image: image4,
  },
  {
    id: 5,
    store: "AudioPhile",
    name: "Bose QuietComfort 35 II Wireless Headphones",
    rating: 4.7,
    reviews: 2891,
    price: 299.0,
    description:
      "World-class noise cancellation headphones with balanced audio performance at any volume.",
    image: image5,
  },
  {
    id: 6,
    store: "PC Master",
    name: "NVIDIA GeForce RTX 4080 Graphics Card",
    rating: 4.9,
    reviews: 156,
    price: 1199.99,
    description:
      "Next-gen ray tracing performance with DLSS 3.0 for incredible gaming experiences.",
    image: image1,
  },
  {
    id: 7,
    store: "Smart Home Hub",
    name: "Amazon Echo Studio Smart Speaker",
    rating: 4.4,
    reviews: 892,
    price: 199.99,
    description:
      "High-fidelity smart speaker with 3D audio and Alexa built-in for immersive sound.",
    image: image2,
  },
  {
    id: 8,
    store: "Mobile Zone",
    name: "iPhone 15 Pro Max - 256GB",
    rating: 4.8,
    reviews: 1543,
    price: 1199.0,
    description:
      "Latest Pro iPhone featuring A17 Pro chip, titanium design, and advanced camera system.",
    image: image3,
  },
  {
    id: 9,
    store: "Gadget World",
    name: "DJI Mini 3 Pro Drone",
    rating: 4.5,
    reviews: 367,
    price: 759.0,
    description:
      "Lightweight sub-249g drone with 4K video, obstacle sensing, and extended flight time.",
    image: image4,
  },
  {
    id: 10,
    store: "Computer Hub",
    name: 'MacBook Pro 16" M3 Max',
    rating: 4.9,
    reviews: 428,
    price: 2499.0,
    description:
      "Professional laptop with M3 Max chip, up to 128GB unified memory, and stunning Liquid Retina XDR display.",
    image: image5,
  },
];
