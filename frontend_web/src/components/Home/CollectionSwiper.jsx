"use client";
import React from "react";
// import dynamic from "next/dynamic";
import Image from "next/image";
import slider1 from "../../assets/slider-1 (1).png";
import slider2 from "../../assets/slider-2 (1).png";
import slider3 from "../../assets/slider-3 (1).png";
// import style from "./CollectionSwiper.module.css";
import "./CollectionSwiper.css";
import Slider from "react-slick";

// const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function CollectionSwiper() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
  };

  return (
    <div className="bg-blue-800 relative h-[600px] max-w-[1280px] mx-auto overflow-hidden"  id="collection-swiper">
      <Slider
        {...settings}
        className="w-[1280px] mx-auto max-xl:w-full mt-16 max-md:mt-10 max-xl:mt-20 max-xl:mx-auto"
      >
        {/* Slide 1 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div className="w-1/2 max-md:w-[90%] mx-auto ">
              <h1 className="text-gray-300 text-lg font-semibold">
                TABLET COLLECTION 2023
              </h1>
              <h1 className="text-white text-6xl pt-4 font-semibold">
                Samsung Galaxy Tab S6, Wifi Tablet
              </h1>
              <button className="bg-black text-white px-4 py-3 font-semibold rounded-lg mt-4 hover:bg-white hover:text-black ">
                Shop Now
              </button>
            </div>
            <div className="max-md:hidden">
              <Image src={slider1} alt="Slider 1" width={500} height={500} />
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div className="w-1/2 max-md:w-[90%] mx-auto ">
              <h1 className="text-gray-300 text-lg font-semibold">
                TABLET COLLECTION 2023
              </h1>
              <h1 className="text-white text-6xl pt-4 font-semibold">
                Samsung Galaxy Tab S6, Wifi Tablet
              </h1>
              <button className="bg-black text-white px-4 py-3 font-semibold rounded-lg mt-4 hover:bg-white hover:text-black ">
                Shop Now
              </button>
            </div>
            <div className="max-md:hidden">
              <Image src={slider2} alt="Slider 1" width={500} height={500} />
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div className="w-1/2 max-md:w-[90%] mx-auto ">
              <h1 className="text-gray-300 text-lg font-semibold">
                TABLET COLLECTION 2023
              </h1>
              <h1 className="text-white text-6xl pt-4 font-semibold">
                Samsung Galaxy Tab S6, Wifi Tablet
              </h1>
              <button className="bg-black text-white px-4 py-3 font-semibold rounded-lg mt-4 hover:bg-white hover:text-black ">
                Shop Now
              </button>
            </div>
            <div className="max-md:hidden">
              <Image src={slider3} alt="Slider 1" width={500} height={500} />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
