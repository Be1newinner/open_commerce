import React from 'react'
import { FaStar } from "react-icons/fa";
import assets from '../src/assets/image1.jpg'
import Image from 'next/image'
const App = () => {
  return (
    <>
    <div className='flex justify-between w-[1280px] mx-auto  my-7'>
      <h1 className='text-3xl font-semibold text-black'>On Sale</h1>
      <h1 className='text-3xl font-semibold text-black'>Trending Product</h1>
      <h1 className='text-3xl font-semibold text-black'>Top Rated</h1>
    </div>
      <div className='flex flex-wrap w-[1280px] mx-auto gap-16'>
        {
          product.map((data, index) => (
            <div key={index} className='flex w-[30%]'>
              <Image 
                width={100}
                height={100}
                src="https://shofy.botble.com/storage/main/products/product-1-150x150.jpg" 
                alt="prductimg" 
              />
              <div className=''>
                <h3 className=' text-slate-500'>{data.company}</h3>
                <h1 className='font-semibold '>{data.product}</h1>
                <div className='flex gap-2 '><FaStar className='mt-1' color='orange' /><span>(7 reviews)</span></div>
                <div className='flex gap-2'>
                  <span className='font-semibold text-blue-500'>${data.price}</span>
                  <span className='line-through text-slate-500'>$7800
                  </span>
                </div>
              
              </div>
              
            </div>
            
          ))
        }
      </div>

    </>
  )
}

export default App

const product = [
  {
    Image: assets,
    company: "Old El Paso",
    product: "BenQ EW3280U 32-Inch 4K HDR Entertainment Monitor(Digital)",
    rating: 3,
    reviews: 7,
    price: 879
  },

  {
    Image: assets,
    company: "Stouffer",
    product: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    rating: 2,
    reviews: 9,
    price: 2396
  },

  {
    Image: assets,
    company: "Global Office",
    product: "HP Z27k G3 4K USB-C Monitor",
    rating: 4,
    reviews: 6,
    price: 934
  },

  {
    Image: assets,
    company: "Global Store",
    product: "Dell UltraSharp U2720Q 27-Inch 4K USB-C Monitor",
    rating: 3,
    reviews: 10,
    price: 238
  },

  {
    Image: assets,
    company: "GoPro",
    product: "Apple TV 4K (2nd Generation) (Digital)",
    rating: 4,
    reviews: 9,
    price: 1054
  },
  {
    Image: assets,
    company: "Stouffer",
    product: "Sony WH-1000XM4 Wireless Noise-Canceling Headphones",
    rating: 2,
    reviews: 9,
    price: 2396
  },

  {
    Image: assets,
    company: "Global Office",
    product: "HP Z27k G3 4K USB-C Monitor",
    rating: 4,
    reviews: 6,
    price: 934
  },

  {
    Image: assets,
    company: "Roberts Store",
    product: "Sony A90J 4K OLED Smart TV",
    rating: 4,
    reviews: 8,
    price: 45
  },

  {
    Image: assets,
    company: "Yound Shop",
    product: "Samsung QN90A Neo QLED 4K Smart TV (Digital)",
    rating: 4,
    reviews: 4,
    price: 1420
  }
]