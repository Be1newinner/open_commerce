import React from "react";
import Image from "next/image";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";

const categories = [
  {
    name: "Headphones",
    img: image1,
    products: 20,
  },
  {
    name: "Mobiles",
    img: image2,
    products: 15,
  },
  {
    name: "CPU Heat Pipes",
    img: image3,
    products: 5,
  },
  {
    name: "Smart Watches",
    img: image4,
    products: 8,
  },
  {
    name: "Bluetooth",
    img: image5,
    products: 10,
  },
];

export default function Category2() {
  return (
    <div>
      <section className="w-[1280px] mx-auto max-xl:w-[90%] max-sm:justify-center max-xl:justify-start max-xl:gap-4 flex flex-wrap justify-between items-center py-10">
        {categories.map((category, index) => (
          <div key={index} className="group max-xl:mb-10">
            <div className="w-[150px] h-[150px] ovetflow-hidden rounded-full flex justify-center items-center p-4  bg-blue-300">
              <Image
                src={category.img}
                alt={category.name}
                width={100}
                height={100}
                className="w-[50%] group-hover:scale-125 duration-500 ease-in-out"
              />
            </div>
            <p className="text-center mt-4 font-semibold text-xl">
              {category.name}
            </p>
            <p className="text-center text-gray-500">
              {category.products} products
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

