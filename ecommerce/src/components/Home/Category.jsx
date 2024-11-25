"use client";
import React from "react";
import image1 from "@/assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import image4 from "../../assets/4.png";
import image5 from "../../assets/5.png";
import Image from "next/image";
import { GrDeliver } from "react-icons/gr";
import { RiDiscountPercentLine, RiRefund2Line } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";

export default function Category() {
  return (
    <>
      <section className="w-[1280px] mx-auto max-xl:w-[90%] max-sm:justify-center max-xl:justify-start max-xl:gap-4 flex flex-wrap justify-between items-center py-10">
        {categories.map((category, index) => (
          <div key={index} className="group max-xl:mb-10">
            <div className="w-[200px] h-[200px] ovetflow-hidden rounded-full flex justify-center items-center p-4  bg-blue-300">
              <Image
                src={category.img}
                alt={category.name}
                width={100}
                height={100}
                className="group-hover:scale-110 duration-500 ease-in-out"
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
      <section>
        <div className="w-[1280px] mx-auto max-xl:w-[90%] max-sm:justify-center max-xl:justify-start max-xl:gap-4 flex flex-wrap justify-between items-center py-10">
          {Services.map((service) => (  
            <div className="flex items-center gap-4 bg-gray-100 w-[24%] max-xl:w-[48%] max-sm:w-full py-6 px-10">
              <span className="text-4xl text-blue-800">{service.icon}</span>
              <div>
                <h1 className="font-semibold">{service.title}</h1>
                <p className="text-gray-500">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

const categories = [
  {
    name: "Headphones",
    img: image1,
    products: 20,
  },
  {
    name: "Bluetooth",
    img: image2,
    products: 10,
  },
  {
    name: "Mobiles",
    img: image3,
    products: 15,
  },
  {
    name: "CPU Heat Pipes",
    img: image4,
    products: 5,
  },
  {
    name: "Smart Watches",
    img: image5,
    products: 8,
  },
];

const Services = [
  {
    title: "Free Delivery",
    description: "Order for all item",
    icon: <GrDeliver />,
  },
  {
    title: "Return & Refund",
    description: "Money-back guarantee",
    icon: <RiRefund2Line />,
  },
  {
    title: "Member Discount",
    description: "Every Order over $100",
    icon: <RiDiscountPercentLine />,
  },
  {
    title: "Support 24/7",
    description: "Order for all item",
    icon: <BiSupport />,
  },
];
