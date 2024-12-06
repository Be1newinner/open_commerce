"use client";
import Image from "next/image";
// import React, { useEffect, useState } from "react";
import React, { useEffect } from "react";
// import image1 from "../../assets/1.png";
// import image2 from "../../assets/2.png";
// import image3 from "../../assets/3.png";
// import image4 from "../../assets/4.png";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductRequest } from "@/redux/reducers/productReducer";
import Link from "next/link";
// import ProductPopup from "./productPopup";

export default function TrendingProductCart() {
  const products = useSelector((state) => state.product.data);
  const dispatch = useDispatch();
  // const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(loadAllProductRequest());
  }, [dispatch]);

  // const handleShowPopup = () => {
  //   setShowPopup(true);
  // };

  return (
    <>
      {/* {showPopup && <ProductPopup />} */}
      {Array.isArray(products) &&
        products.map((product, index) => (
          <section key={index} className="group hover:shadow-lg hover:shadow-gray-400 duration-500 items-center gap-4 border-solid border-2 border-gray-300 rounded-xl w-[24%] max-xl:w-[48%] max-sm:w-full p-2 ">
            <div className="w-full h-[300px] overflow-hidden justify-center items-center flex group-hover:scale-110 duration-500 ease-in-out ">
              <Link href={`/product/${product.sku}`} key={product.id}>
                <Image src={products.image} alt="" width={150} height={150} />
              </Link>
              <h1
                // onClick={handleShowPopup}
                className="absolute bottom-[-40px] hover:bg-blue-800 w-[95%] flex gap-1 justify-center text-center py-2 left-1/2 transform -translate-x-1/2 text-white bg-black text-sm opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500"
              >
                <IoCartOutline size={20} />
                Select Options
              </h1>
            </div>
            {/* <hr /> */}

            <div className="p-2 border-t-2 top-1 border-gray-300">
              <span className="text-gray-500 text-xs ">Roberts Store</span>
              <h1 className="text-xl font-semibold line-clamp-1">
                {product.name}
              </h1>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      index < product.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                  
                ))}
              </div>
              <span className="text-xl font-semibold text-blue-800">
                ${product.price}
              </span>
            </div>
          </section>
        ))}

      {/* ----------Offer Section---------------- */}

      <section>
        <div className="w-[1280px] mx-auto max-xl:w-full max-sm:justify-center max-xl:justify-start max-xl:gap-4 flex flex-wrap justify-between items-center py-10">
          <div className="w-[68%] max-xl:w-full p-16 bgImg">
            <h1 className="text-base text-gray-800">Sale 20% Off all store</h1>
            <h1 className="text-3xl pt-2 font-semibold hover:text-blue-800 duration-300 ease-in-out">
              Smartphone <br />
              BLU G91 Pro 2022
            </h1>
            <button className="bg-blue-800 hover:bg-blue-600 duration-300 ease-in-out text-white py-2 px-4 mt-4">
              Shop Now
            </button>
          </div>
          <div className="w-[30%] max-md:w-full max-xl:w-1/2 p-16 bgImg2">
            <h1 className="text-base text-gray-800">Sale 35% Off </h1>
            <h1 className="text-3xl pt-2 font-semibold hover:text-blue-800 duration-300 ease-in-out">
              HyperX Cloud II Wireless
            </h1>
            <button className="bg-blue-800 hover:bg-blue-600 duration-300 ease-in-out text-white py-2 px-4 mt-4">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

// const products = [
//   {
//     name: "Asus Rog ",
//     img: image1,
//     price: "$999.00",
//     rating: 4,
//   },
//   {
//     name: "Asus Rog",
//     img: image2,
//     price: "$999.00",
//     rating: 4,
//   },
//   {
//     name: "Asus Rog",
//     img: image3,
//     price: "$999.00",
//     rating: 5,
//   },
//   {
//     name: "Asus Rog",
//     img: image4,
//     price: "$999.00",
//     rating: 2,
//   },
//   {
//     name: "Asus Rog",
//     img: image1,
//     price: "$999.00",
//     rating: 4,
//   },
//   {
//     name: "Asus Rog",
//     img: image2,
//     price: "$999.00",
//     rating: 4,
//   },
//   {
//     name: "Asus Rog",
//     img: image3,
//     price: "$999.00",
//     rating: 5,
//   },
//   {
//     name: "Asus Rog",
//     img: image4,
//     price: "$999.00",
//     rating: 2,
//   },
// ];
