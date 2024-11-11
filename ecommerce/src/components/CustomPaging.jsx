"use client";
import React from "react";
import Slider from "react-slick";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import Image from "next/image";

function CustomPaging() {
  const images = [image1, image2, image3, image4, image5];

  const settings = {
    customPaging: function (i) {
      return (
        <div className="thumbnail-container w-[60px] h-[60px]">
          <Image
            src={images[i]}
            alt={`Thumbnail ${i + 1}`}
            width={60}
            height={60}
            className="rounded-lg object-cover"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb flex justify-center gap-2 mt-4",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider-container max-w-[1280px] mx-auto">
      <Slider {...settings} className="w-1/2">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={300}
              height={200}
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
