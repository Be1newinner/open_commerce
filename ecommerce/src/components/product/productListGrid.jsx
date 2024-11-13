import Image from "next/image";
import React from "react";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import image4 from "../../assets/4.png";
import { IoCartOutline } from "react-icons/io5";

export default function ProductListGrid() {
  return (
    <div className="flex flex-wrap max-w-5xl max-md:w-full mb-10 mx-auto gap-7 ">
      {products.map((product) => (
        <section className="group hover:shadow-lg hover:shadow hover:shadow-gray-400 duration-500 items-center gap-4 border-solid border-2 border-gray-300 rounded-xl w-[300px] max-md:w-full max-sm:w-full p-2 ">
          <div className="w-full h-[300px] overflow-hidden justify-center items-center flex group-hover:scale-110 duration-500 ease-in-out ">
            <Image src={product.img} alt="" width={150} height={150} />
            <h1 className="absolute bottom-[-40px] hover:bg-blue-800 w-[95%] flex gap-1 justify-center text-center py-2 left-1/2 transform -translate-x-1/2 text-white bg-black text-sm opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-500">
              <IoCartOutline size={20} />
              Select Options
            </h1>
          </div>

          {/* <hr /> */}

          <div className="p-2 border-t-2 top-1 border-gray-300">
            <span className="text-gray-500 text-xs ">Roberts Store</span>
            <h1 className="text-xl font-semibold line-clamp-1">Asus Rog</h1>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`text-xl ${
                    index < product.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xl font-semibold text-blue-800">$999.00</span>
          </div>
        </section>
      ))}

      
    </div>
  );
}

const products = [
  {
    name: "Asus Rog ",
    img: image1,
    price: "$999.00",
    rating: 4,
  },
  {
    name: "Asus Rog",
    img: image2,
    price: "$999.00",
    rating: 4,
  },
  {
    name: "Asus Rog",
    img: image3,
    price: "$999.00",
    rating: 5,
  },
  {
    name: "Asus Rog",
    img: image4,
    price: "$999.00",
    rating: 2,
  },
  {
    name: "Asus Rog",
    img: image1,
    price: "$999.00",
    rating: 4,
  },
  {
    name: "Asus Rog",
    img: image2,
    price: "$999.00",
    rating: 4,
  },
  {
    name: "Asus Rog",
    img: image3,
    price: "$999.00",
    rating: 5,
  },
  {
    name: "Asus Rog",
    img: image4,
    price: "$999.00",
    rating: 2,
  },
];
