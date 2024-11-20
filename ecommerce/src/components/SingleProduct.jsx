"use client";
import React, { useEffect, useState } from "react";
import { BiHeart, BiMinus, BiPlus } from "react-icons/bi";
import { CgShoppingCart } from "react-icons/cg";
import Image from "next/image";
import image1 from "@/assets/1.png";
import image2 from "@/assets/2.png";
import image3 from "@/assets/3.png";
import image4 from "@/assets/4.png";
import image5 from "@/assets/5.png";
import paypal from "@/assets/paypal.png";
import visa from "@/assets/visa.png";
import productImg from "@/assets/product-details-desc-1.jpg";
import {
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import { LuCheckCircle } from "react-icons/lu";
import { useDispatch } from "react-redux";
import {
  AddCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/redux/reducers/cartReducer";
import Link from "next/link";

function SingleProduct({ product, quantity }) {
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  console.log("product => ", product);

  const reviewStats = {
    averageRating: 3.1,
    totalReviews: 10,
    distribution: [
      { stars: 5, percentage: 10 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 50 },
      { stars: 2, percentage: 10 },
      { stars: 1, percentage: 10 },
    ],
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log({ rating: selectedRating, review: reviewText });
  };

  const images = [image1, image2, image3, image4, image5];

  // useEffect(() => {
  //   getProductDetails();
  // }, []);

  // const getProductDetails = async () => {
  //   const mockProduct = {
  //     name: "Dell UltraSharp U2720Q 27-Inch 4K USB-C Monitor",
  //     price: 1299,
  //     description:
  //       "With this intelligent headset, you can stay connected and productive from the first call of the day to the last train home. With an ergonomic earcup design, this headset invented a brand-new dual-foam technology. You will be comfortable from the first call to the last thanks to the re-engineered leatherette ear cushion design that allows for better airflow.",
  //     category: "Category Name",
  //     image: image1,
  //     rating: 4,
  //     reviews: 10,
  //     sku: "ABC123",
  //     tags: "Tag Name",
  //   };
  //   setProduct(mockProduct);
  // };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
      </div>
    );
  }

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(AddCart(product));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col-reverse lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Thumbnails section */}
            <div className="flex flex-row mt-6 lg:flex-col lg:space-y-4 space-x-4 lg:space-x-0 overflow-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden shadow-sm ${
                    activeImage === index ? "ring-2 ring-blue-800" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail view ${index + 1}`}
                    className="w-20 h-16 md:w-24 md:h-20 object-contain object-center p-2"
                  />
                </button>
              ))}
            </div>

            {/* Main image display section */}
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={images[activeImage]}
                alt={`Product view ${activeImage + 1}`}
                className="w-full h-full object-contain object-center p-4"
              />
            </div>
          </div>

          <div className="space-y-2">
            <span>Shofy</span>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center">
              <p className="text-sm text-blue-800 bg-blue-100 py-1 px-2 mr-2">
                Global Store
              </p>
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={`text-xl ${
                    index < product.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-gray-500 ml-2">
                ({product.reviews} Reviews)
              </span>
            </div>
            <p className="text-sm font-bold text-gray-500 leading-relaxed">
              {product.description}
            </p>
            <p className="text-2xl flex font-semibold items-center ">
              ${product.price}
              <p className="line-through text-gray-500 ml-2 text-lg">
                ${product.price}
              </p>
            </p>

            <p className="text-sm text-green-500">
              {product.stock} products avaliable
            </p>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-base font-semibold text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <div className="flex gap-2">
                  {quantity === 0 ? (
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="flex-1  bg-white border-2 border-black  border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out"
                    >
                      <CgShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </button>
                  ) : (
                    <>
                      <div className="flex items-center overflow-hidden w-28 bg-gray-100">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              decreaseQuantity({ ...quantity, quantity: -1 })
                            )
                          }
                          className="p-3 text-blue-800 hover:bg-violet-100 focus:outline-none transition-colors duration-200 active:bg-blue-200"
                        >
                          <BiMinus className="h-5 w-5" />
                        </button>
                        <div className="w-full text-center border-blue-300 py-2 text-lg font-semibold text-blue-800">
                          {quantity}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              increaseQuantity({ ...quantity, quantity: +1 })
                            )
                          }
                          className="p-3 text-blue-800 hover:bg-violet-100 focus:outline-none transition-colors duration-200 active:bg-blue-200"
                        >
                          <BiPlus className="h-5 w-5" />
                        </button>
                      </div>
                      <Link
                        href="/cart"
                        className="flex-1  bg-white border-2 border-black  border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out"
                      >
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          className=" flex"
                        >
                          <CgShoppingCart className="mr-2 h-5 w-5" /> View Cart
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <button className="w-full bg-blue-800 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition duration-150 ease-in-out">
                <CgShoppingCart className="mr-2 h-5 w-5" /> Buy Now
              </button>
              <hr />
              <div>
                <p>
                  SKU:
                  <span className="capitalize text-gray-500">
                    {product.sku}
                  </span>
                </p>
                <p>
                  Category:
                  <span className="capitalize text-gray-500">
                    {product.category}
                  </span>
                </p>
                <p>
                  Tags:
                  <span className="capitalize text-gray-500">
                    {product.tags}
                  </span>
                </p>
                <p className="flex items-center py-4">
                  Share:
                  <ul className="flex gap-2 ml-2 cursor-pointer">
                    <li className="hover:text-blue-800 hover:scale-110 duration-300 ease-linear">
                      <FaFacebook className="h-5 w-5" />
                    </li>
                    <li className="hover:text-blue-800 hover:scale-110 duration-300 ease-linear">
                      <FaTwitter className="h-5 w-5" />
                    </li>
                    <li className="hover:text-blue-800 hover:scale-110 duration-300 ease-linear">
                      <FaLinkedin className="h-5 w-5" />
                    </li>
                    <li className="hover:text-blue-800 hover:scale-110 duration-300 ease-linear">
                      <FaPinterest className="h-5 w-5" />
                    </li>
                  </ul>
                </p>
                <p className="flex items-center pt-4 gap-2 text-gray-500">
                  <LuCheckCircle />
                  30 days easy returns
                </p>
                <p className="flex items-center gap-2 text-gray-500">
                  <LuCheckCircle />
                  Order yours before 2.30pm for same day dispatch
                </p>
                <div className="flex flex-wrap mt-4 items-center justify-between gap-2 text-gray-500 bg-gray-200 p-3 ">
                  <p className="">Guaranteed safe & secure checkout</p>
                  <div className="flex gap-2 cursor-pointer">
                    <Image
                      src={paypal}
                      alt="paypal"
                      width={100}
                      height={50}
                      className="bg-white p-2"
                    />
                    <Image
                      src={visa}
                      alt="visa"
                      width={100}
                      height={50}
                      className="bg-white p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}

        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? "border-violet-500 text-violet-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition duration-150 ease-in-out`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8 prose prose-violet max-w-none">
            {activeTab === "description" && (
              <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h1 className="text-sm text-gray-500 font-bold mb-4">
                      Galaxy A8 tablet
                    </h1>
                    <h2 className="text-2xl font-bold mb-4">
                      Your world at a glance
                    </h2>
                    <p className="mb-8">
                      With a slim design, a vibrant entertainment system, and
                      outstanding performance, the new Galaxy Tab A8 is a
                      stylish new companion for your life.Dive head-first into
                      the things you love, and easily share your favorite
                      moments. Learn, explore, connect and be inspired.
                    </p>
                    <h2 className="text-2xl font-bold mb-4">
                      Draw inspiration with S Pen
                    </h2>
                    <p className="mb-8">
                      S Pen is a bundle of writing instruments in one. Its
                      natural grip, low latency and impressive pressure
                      sensitivity will make it your go-to for everything from
                      drawing to editing documents. And S Pen won't get
                      misplaced thanks.
                    </p>
                  </div>
                  <div>
                    <Image
                      src={productImg}
                      alt="Galaxy Tab A8"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "specifications" && (
              <div className="p-4 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
                <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
                  <tbody>
                    {productSpecifications.map(({ spec, detail }) => (
                      <tr key={spec} className="odd:bg-gray-50 even:bg-white">
                        <td className="border border-gray-200 p-3 font-semibold text-gray-700 w-1/3">
                          {spec}
                        </td>
                        <td className="border border-gray-200 p-3 text-gray-600">
                          {detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                  {/* Reviews Statistics */}
                  <div className="bg-white h-[300px] p-6 rounded-lg border">
                    <h2 className="text-2xl font-bold mb-4">
                      Customer reviews
                    </h2>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-bold">
                        {reviewStats.averageRating.toFixed(2)}
                      </span>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`${
                              star <= reviewStats.averageRating
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({reviewStats.totalReviews} Reviews)
                      </span>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                      {reviewStats.distribution.map(({ stars, percentage }) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="w-12 text-sm">{stars} Stars</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-12 text-sm text-right">
                            {percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review Form */}
                  <div className="bg-white p-6 ">
                    <h2 className="text-xl font-bold">Add your review</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                    {/* {isLoggedIn ? ( */}
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <label className="block text-sm text-gray-700 mb-1">
                          Your rating: <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSelectedRating(star)}
                              className="focus:outline-none"
                            >
                              <FaStar
                                key={star}
                                className={`${
                                  star <= reviewStats.averageRating
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Review: <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="w-full min-h-[200px] p-3 border rounded-lg focus:outline-none focus:ring-[1px] focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Write your review"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Review
                      </button>
                    </form>
                    {/* ) : ( */}
                    {/* <div className="text-center py-4">
                        <p className="text-gray-600 mb-4">
                          Please login to write review!
                        </p>
                        <button className="text-blue-600 hover:underline">
                          Login to write review!
                        </button>
                      </div> */}
                    {/* )} */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SingleProduct;

const productSpecifications = [
  { spec: "Product Name", detail: "Smartphone XYZ" },
  { spec: "Brand", detail: "BrandName" },
  { spec: "Model Number", detail: "XYZ1234" },
  { spec: "Operating System", detail: "Android 12" },
  { spec: "Screen Size", detail: "6.5 inches" },
  { spec: "Resolution", detail: "1080 x 2400 pixels" },
  { spec: "Battery Capacity", detail: "5000 mAh" },
  { spec: "Processor", detail: "Octa-Core 2.2 GHz" },
  { spec: "RAM", detail: "8 GB" },
  { spec: "Storage", detail: "128 GB" },
  { spec: "Camera", detail: "64 MP (Rear), 16 MP (Front)" },
  { spec: "Connectivity", detail: "5G, 4G LTE, Wi-Fi, Bluetooth 5.0" },
  { spec: "Color Options", detail: "Black, Silver, Blue" },
  { spec: "Weight", detail: "180 grams" },
  { spec: "Dimensions", detail: "160 x 75 x 8 mm" },
  { spec: "Warranty", detail: "1-year manufacturer warranty" },
];
