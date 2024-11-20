import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loadAllProductRequest } from "@/redux/reducers/productReducer";
import Link from "next/link";

export default function ProductListGrid() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const ProductData = useSelector((state) => state.product.data);
  const products = ProductData.slice((page - 1) * limit, page * limit);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllProductRequest());
  }, [dispatch, page, limit]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

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
        <button
          className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

