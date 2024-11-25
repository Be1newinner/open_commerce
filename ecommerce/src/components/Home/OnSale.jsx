import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import assets from "../../assets/product.jpg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductRequest } from "@/redux/reducers/productReducer";
import Link from "next/link";

const OnSale = () => {
  const product = useSelector((state) => state.product.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProductRequest());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between w-[1280px] mx-auto  my-10">
        <h1 className="text-3xl font-semibold text-black">On Sale</h1>
        {/* <h1 className="text-3xl font-semibold text-black">Trending Product</h1>
        <h1 className="text-3xl font-semibold text-black">Top Rated</h1> */}
      </div>
      <div className=" flex flex-wrap w-[1280px] mx-auto gap-10 mb-16">
        {Array.isArray(product) &&
          product.map((data, index) => (
            <div
              key={index}
              className="group flex w-[30%] max-lg:w-[48%] max-sm:w-full overflow-hidden"
            >
              <Link href={`/product/${data.sku}`}>
                <Image
                  src={data.image}
                  alt="prductimg"
                  className="group-hover:scale-105 duration-500"
                  width={100}
                  height={100}
                />
              </Link>
              <div className="">
                <h3 className=" text-slate-500">shofy</h3>
                <h1 className="font-semibold ">{data.name}</h1>
                <div className="flex gap-2 ">
                  <FaStar className="mt-1" color="orange" />
                  <span>(7 reviews)</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-blue-500">
                    ${data.price}
                  </span>
                  <span className="line-through text-slate-500">$7800</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default OnSale;

const product = [
  {
    image: assets,
    company: "Old El Paso",
    product: "BenQ EW3280U 32-Inch 4K HDR Entertainment Monitor(Digital)",
    rating: 3,
    reviews: 7,
    price: 879,
  },

  {
    image: assets,
    company: "Stouffer",
    product: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    rating: 2,
    reviews: 9,
    price: 2396,
  },

  {
    image: assets,
    company: "Global Office",
    product: "HP Z27k G3 4K USB-C Monitor",
    rating: 4,
    reviews: 6,
    price: 934,
  },

  {
    image: assets,
    company: "Global Store",
    product: "Dell UltraSharp U2720Q 27-Inch 4K USB-C Monitor",
    rating: 3,
    reviews: 10,
    price: 238,
  },

  {
    image: assets,
    company: "GoPro",
    product: "Apple TV 4K (2nd Generation) (Digital)",
    rating: 4,
    reviews: 9,
    price: 1054,
  },
  {
    image: assets,
    company: "Stouffer",
    product: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    rating: 2,
    reviews: 9,
    price: 2396,
  },

  {
    image: assets,
    company: "Global Office",
    product: "HP Z27k G3 4K USB-C Monitor",
    rating: 4,
    reviews: 6,
    price: 934,
  },

  {
    image: assets,
    company: "Roberts Store",
    product: "Sony A90J 4K OLED Smart TV",
    rating: 4,
    reviews: 8,
    price: 45,
  },

  {
    image: assets,
    company: "Yound Shop",
    product: "Samsung QN90A Neo QLED 4K Smart TV (Digital)",
    rating: 4,
    reviews: 4,
    price: 1420,
  },
];
