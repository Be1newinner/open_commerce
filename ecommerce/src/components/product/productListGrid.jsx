import Image from "next/image";
import React, { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductRequest } from "@/redux/reducers/productReducer";
import Link from "next/link";

export default function ProductListGrid() {
  const ProductData = useSelector((state) => state.product.data);
  const products = ProductData;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProductRequest());
  }, [dispatch]);

  return (
    <div className="flex flex-wrap max-w-5xl max-md:w-full mb-10 mx-auto gap-7 ">
      {products?.map((product) => (
        <Link href={`/product/${product.sku}`} key={product.id}>
          <section className="group hover:shadow-lg hover:shadow-gray-400 duration-500 items-center gap-4 border-solid border-2 border-gray-300 rounded-xl w-[300px] max-md:w-full max-sm:w-full p-2 ">
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
        </Link>
      ))}

      <div className="flex justify-between gap-2 w-full cursor-pointer">
        <h1>page previous </h1>
        <h1>page next </h1>
      </div>
    </div>
  );
}
