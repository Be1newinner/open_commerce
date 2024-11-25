"use client";
import React from "react";
import Image from "next/image";
import slider1 from "../../assets/slider-1.png";
import slider2 from "../../assets/slider-2.png";
import slider3 from "../../assets/slider-3.png";
import Slider from "react-slick";
import "./Hero.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute group -left-20 top-1/2 transform -translate-y-1/2 bg-transparent border border-white hover:bg-white hover:border-transparent duration-500 ease-in-out rounded-full p-2 cursor-pointer z-10"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-10 w-10 text-white group-hover:text-black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute group -right-20 none top-1/2 transform -translate-y-1/2 bg-transparent border border-white hover:bg-white hover:border-transparent duration-500 ease-in-out  rounded-full p-2 cursor-pointer z-10"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-10 w-10 text-white group-hover:text-black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

export default function Hero() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      className="bg-[#115061] relative h-[700px] overflow-hidden"
      id="hero-section"
    >
      <Slider
        {...settings}
        className="w-[1280px] mx-auto max-xl:w-full mt-32 max-md:mt-10 max-xl:mt-20 max-xl:mx-auto"
      >
        {/* Slide 1 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div className="w-1/2 max-md:w-[90%] mx-auto ">
              <h1 className="text-white text-xl font-semibold">
                Starting at <span>$999.00</span>
              </h1>
              <h1 className="text-white text-6xl pt-4 font-semibold">
                The best Tablet collection 2023
              </h1>
              <p className="text-white text-lg py-5">
                Exclusive offer <span className="text-yellow-400">-30%</span>
                off this week
              </p>
              <button className="bg-white text-black px-4 py-3 font-semibold rounded-lg mt-4 hover:bg-[#115061] hover:text-white border-2 hover:border-white">
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
              <h1 className="text-white text-xl font-semibold">
                Starting at <span>$999.00</span>
              </h1>
              <h1 className="text-white text-6xl pt-4 font-semibold">
                The best note book collection 2023
              </h1>
              <p className="text-white text-lg py-5">
                Exclusive offer <span className="text-yellow-400">-10%</span>
                off this week
              </p>
              <button className="bg-white text-black px-4 py-3 font-semibold rounded-lg mt-4 hover:bg-[#115061] hover:text-white border-2 hover:border-white">
                Shop Now
              </button>
            </div>
            <div className="max-md:hidden">
              <Image src={slider2} alt="Slider 1" width={1000} height={1000} />
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center ">
            <div className="w-1/2 max-md:w-[90%] mx-auto ">
              <h1 className="text-white text-xl font-semibold">
                Starting at <span>$999.00</span>
              </h1>
              <h1 className="text-white text-6xl pt-4 font-semibold">
                The best phone collection 2023
              </h1>
              <p className="text-white text-lg py-5">
                Exclusive offer <span className="text-yellow-400">-20%</span>
                off this week
              </p>
              <button className="bg-white text-black px-4 py-3 font-semibold rounded-lg mt-4 hover:bg-[#115061] hover:text-white border-2 hover:border-white">
                Shop Now
              </button>
            </div>
            <div className=" max-md:hidden">
              <Image src={slider3} alt="Slider 1" width={500} height={500} />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
