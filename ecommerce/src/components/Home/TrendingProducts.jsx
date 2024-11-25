"use client";
import React, { useState } from "react";
import TrendingProductCart from "./TrendingProductCart";

export default function TrendingProducts() {
  const [active, setActive] = useState("All");

  const handleActive = (item) => {
    setActive(item);
  };  

  return (
    <section className="w-[1280px] mx-auto  max-xl:w-[90%] max-sm:justify-center max-xl:justify-start max-xl:gap-4 flex flex-wrap justify-between items-center py-10">
      <div className="flex flex-wrap justify-between w-full items-center">
        <h1 className="text-4xl font-bold text-blue-800 ">
          Trending <span className="text-black">Products</span>
        </h1>
        
        <ul className="flex flex-wrap max-lg:mt-10 gap-10 font-semibold text-xl text-gray-800">
          {["All", "Featured", "On Sale", "Trending", "Top Rated"].map(
            (item) => (
              <li
                key={item}
                className={`cursor-pointer ${
                  active === item ? "text-blue-800 underline duration-300 ease-in-out" : ""
                }`}
                onClick={() => handleActive(item)}
              >
                {item}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="w-full flex justify-between flex-wrap my-10 gap-4">
        <TrendingProductCart />
      </div>
    </section>
  );
}
