/** @format */

import React from 'react';
import LineSvg from '@/assets/lineSvg.svg'; // adjust the path as needed
import Image from 'next/image';
import shapeImage1 from '@/assets/shape-1.png';
import shapeImage4 from '@/assets/shape-4.png';

const NewsLetter = () => {
  return (
    <div className="bg-[#0C55AA] relative h-[200px] overflow-hidden">
      {/* Background images with lower z-index */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src={shapeImage1}
          alt="shape"
          className="w-[500px] h-auto absolute top-0 left-0"
        />
        <Image
          src={LineSvg}
          alt="line"
          className="w-[500px] h-full absolute top-0 right-0"
        />
      </div>

      {/* Content above images */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="flex lg:justify-between justify-center lg:items-center items-start lg:flex-row flex-col h-full p-4 container">
          <div className="absolute right-[100px] -z-10">
            <Image src={shapeImage4} alt="shape image" />
          </div>
          <div>
            <h3 className="text-white text-lg font-[500]">
              Sale 20% off all store
            </h3>

            <h2 className="text-white text-[28px] font-[800]">
              Subscribe to our Newsletter
            </h2>
          </div>

          <div>
            <form action="" className="flex  items-center ">
              <input
                type="text"
                placeholder="Enter your email"
                className="text-sm p-3 rounded-l-md outline-none md:w-[300px] w-full"
              />
              <button
                type="submit"
                className="bg-black text-white font-[500] text-sm p-3 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
