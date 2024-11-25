import React, { useState } from "react";
import { CiGift } from "react-icons/ci";
import { FiSmartphone, FiTv } from "react-icons/fi";
import { GrPersonalComputer } from "react-icons/gr";
import { IoHomeOutline } from "react-icons/io5";

const SidebarFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 2474]);

  const categories = [
    { icon: <IoHomeOutline />, name: "New Arrivals" },
    { icon: <FiTv />, name: "Electronics" },
    { icon: <CiGift />, name: "Gifts" },
    { icon: <GrPersonalComputer />, name: "Computers" },
    { icon: <FiSmartphone />, name: "Smartphones & Tablets" },
    // { icon: "", name: "TV, Video & Music" },
    // { icon: "", name: "Cameras" },
    // { icon: "", name: "Cooking" },
    // { icon: "", name: "Accessories" },
    // { icon: "", name: "Sports" },
    // { icon: "", name: "Electronics Gadgets" },
  ];

  const brands = ["FoodPound", "iTea JSC", "Soda Brand", "Shofy", "Soda Brand"];

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="max-w-[300px] max-md:w-[90%] max-md:mx-auto">
      <div className="w-full mb-6 ">
        <h3 className="font-semibold">Price Filter</h3>
        <input
          type="range"
          min="100"
          max="10000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full"
        />
        <div className="price-range-text">
          Price: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
        </div>
      </div>

      {/* Categories */}
      <div className=" mb-6">
        <h3 className="font-semibold">Categories</h3>
        <hr className="my-2" />
        <ul className="w-full">
          {categories.map((category) => (
            <li key={category.name} className="gap-2 flex items-center ">
              <span className="">{category.icon}</span>
              <button
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                onClick={() => toggleCategory(category.name)}
              >
                <span>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Brands */}
      <div className="">
        <h3 className="font-semibold mb-2">Brands</h3>
        <hr className="my-2" />
        <ul className="">
          {brands.map((brand) => (
            <li key={brand} className="gap-2 flex items-center">
              <input type="checkbox" id={brand} className="checkbox" />
              <label
                htmlFor={brand}
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarFilter;
