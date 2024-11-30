"use client";
import Link from "next/link";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import { IoIosArrowDown, IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { VscThreeBars } from "react-icons/vsc";
import {
  FaTimes,
  FaGift,
  FaLaptop,
  FaMobileAlt,
  FaTv,
  FaCamera,
  FaUtensils,
  FaFootballBall,
  FaPlug,
  FaHeadphones,
  FaTags,
  FaTools,
} from "react-icons/fa";
import { MdOutlineNewReleases } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const items = useSelector((state) => state.cart.data);
  const { token, data } = useSelector((state) => state.auth);

  console.log("user data is => ", data, token);

  const handleMenu = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? "" : menu);
  };

  const stickyNavbar = () => {
    if (window.scrollY > 0) {
      document.getElementById("navbar").classList.add("sticky");
    } else {
      document.getElementById("navbar").classList.remove("sticky");
    }
  };

  return (
    <div id="navbar" onScroll={stickyNavbar} className=" ">
      <div className=" flex justify-between items-center py-5 w-[1280px] mx-auto max-xl:w-[90%] ">
        <Link href="/">
          <div className="flex items-center">
            <RiShoppingBag4Fill className="text-4xl text-red-600" />
            <h1 className="text-4xl max-sm:text-2xl ">
              <b>Shofy</b>
            </h1>
          </div>
        </Link>
        <div onClick={handleMenu} className="sm:hidden">
          <VscThreeBars size={30} />
        </div>

        <div className="max-w-[500px] max-lg:hidden border-solid border-2 border-blue-800 flex   ">
          <input
            className="p-2 outline-none"
            type="text"
            name="search"
            placeholder="Search for Products.."
            size="30"
          ></input>
          <select
            className="outline-none cursor-pointer "
            name="product"
            id="product"
          >
            <option value="All Categories">All Categories</option>
            <option value="mobiles">Mobiles</option>
            <option value="electronic">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="car & motorbike">Car & Motorbike</option>
          </select>
          <FaSearch className="bg-blue-800 text-5xl p-3 text-white " />
        </div>

        <div className="flex items-center gap-10 max-sm:hidden">
          <div className="flex items-center gap-2">
            <FaRegUserCircle size={36} />
            <div>
              <h5 className="font-semibold cursor-pointer">Hello, {token ? "user" : "Guest"}</h5>
              <p className="text-gray-500 flex gap-2">
                <Link href="/login"> Login </Link> /
                <Link href="/login/register">
                  <p className="text-gray-500">Register</p>
                </Link>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <LuArrowDownUp className=" text-2xl" />
            <IoMdHeartEmpty className="text-2xl" />
            <Link href="/cart">
              <div>
                <FaShoppingBag className="text-2xl " />
                <div>
                  <h5 className="font-semibold">{items.length}</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-[1280px] mx-auto max-xl:w-[90%] max-lg:mx-0 max-md:hidden flex">
        <div className="relative flex gap-10 font-[600] w-[1280px] mx-auto max-xl:w-[90%] items-center">
          {/* Dropdown Trigger */}
          <h1 className=" cursor-pointer group z-50  relative">
            <span className="flex items-center justify-between font-semibold text-white bg-blue-800 px-4 py-3 w-[250px]">
              All Categories
              <IoIosArrowDown />
            </span>
            <div className="absolute hidden group-hover:block bg-white border shadow-md w-[250px]">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Electronics
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Fashion
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Mobiles
                </li>
              </ul>
            </div>
          </h1>

          <h1 className="ml-4 cursor-pointer">Home</h1>
          <Link href="/product">
            <h1 className=" cursor-pointer group z-50  relative">Shop</h1>
          </Link>
        </div>
        <div className="flex items-center w-[200px] gap-2 max-lg:hidden">
          <FiPhoneCall size={24} color="blue" />
          <div>
            <p className="font-semibold text-sm">Hotline:</p>
            <span className="text-sm">123-456-7890</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed top-0 right-0 z-50 w-full h-screen bg-white overflow-y-auto md:hidden">
          {/* Logo and Close Button */}
          <div className="flex items-center justify-between p-5 bg-white border-b">
            <div className="flex items-center">
              <RiShoppingBag4Fill className="text-4xl text-red-600" />
              <h1 className="text-4xl max-sm:text-2xl ">
                <b>Shofy</b>
              </h1>
            </div>
            <button
              onClick={handleMenuClose}
              className="text-2xl text-gray-600 hover:text-red-500"
            >
              <FaTimes />
            </button>
          </div>

          {/* "All Categories" Dropdown */}
          <div className="p-4">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              All Categories
            </button>

            {showCategories && (
              <ul className="mt-4 bg-white">
                <li className="flex items-center px-6 py-2 border-b">
                  <MdOutlineNewReleases />
                  <span className="ml-4">New Arrivals</span>
                </li>
                <li className="flex items-center px-6 py-2 border-b">
                  <FaPlug />
                  <span className="ml-4">Electronics</span>
                </li>
                <li className="flex items-center px-6 py-2 border-b">
                  <FaGift />
                  <span className="ml-4">Gifts</span>
                </li>

                {/* Dropdown for Computers */}
                <li className="flex flex-col px-6 py-2 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaLaptop />
                      <span className="ml-4">Computers</span>
                    </div>
                    <button
                      onClick={() => toggleDropdown("computers")}
                      className="text-gray-600"
                    >
                      {openDropdown === "computers" ? "-" : "+"}
                    </button>
                  </div>
                  {openDropdown === "computers" && (
                    <ul className="mt-2 ml-8 space-y-2">
                      <li className="text-sm">Desktop</li>
                      <li className="text-sm">Laptop</li>
                      <li className="text-sm">Tablet</li>
                      <li className="text-sm">Accessories</li>
                    </ul>
                  )}
                </li>

                <li className="flex items-center px-6 py-2 border-b">
                  <FaMobileAlt />
                  <span className="ml-4">Smartphones & Tablets</span>
                </li>
                <li className="flex items-center px-6 py-2 border-b">
                  <FaTv />
                  <span className="ml-4">TV, Music & Video</span>
                </li>
                <li className="flex items-center px-6 py-2 border-b">
                  <FaCamera />
                  <span className="ml-4">Camera</span>
                </li>
                <li className="flex items-center px-6 py-2 border-b">
                  <FaUtensils />
                  <span className="ml-4">Cooking Accessories</span>
                </li>
                <li className="flex items-center px-6 py-2 border-b">
                  <FaFootballBall />
                  <span className="ml-4">Sports</span>
                </li>

                {/* Dropdown for Electronic Gadgets */}
                <li className="flex flex-col px-6 py-2 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaPlug />
                      <span className="ml-4">Electronic Gadgets</span>
                    </div>
                    <button
                      onClick={() => toggleDropdown("gadgets")}
                      className="text-gray-600"
                    >
                      {openDropdown === "gadgets" ? "-" : "+"}
                    </button>
                  </div>
                  {openDropdown === "gadgets" && (
                    <ul className="mt-2 ml-8 space-y-2">
                      <li className="text-sm">Microscope</li>
                      <li className="text-sm">Remote Control</li>
                      <li className="text-sm">Thermometer</li>
                      <li className="text-sm">Backpack</li>
                      <li className="text-sm">Headphones</li>
                    </ul>
                  )}
                </li>

                {/* Dropdown for Accessories */}
                <li className="flex flex-col px-6 py-2 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaTools />
                      <span className="ml-4">Accessories</span>
                    </div>
                    <button
                      onClick={() => toggleDropdown("accessories")}
                      className="text-gray-600"
                    >
                      {openDropdown === "accessories" ? "-" : "+"}
                    </button>
                  </div>
                  {openDropdown === "accessories" && (
                    <ul className="mt-2 ml-8 space-y-2">
                      <li className="text-sm">Bluetooth</li>
                    </ul>
                  )}
                </li>

                <li className="flex items-center px-6 py-2 border-b">
                  <FaHeadphones />
                  <span className="ml-4">Headphones</span>
                </li>
                <li className="flex items-center px-6 py-2 border-b">
                  <FaTags />
                  <span className="ml-4">Deals</span>
                </li>
              </ul>
            )}
          </div>

          {/* Second List (Home, Shop, Vendors, Pages, Blogs, Contact) */}
          <div className="p-4 mt-8">
            <ul className="bg-white">
              {/* Dropdown for Home */}
              <li className="flex flex-col px-6 py-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="ml-4">Home</span>
                  </div>
                </div>
              </li>

              {/* Dropdown for Shop */}
              <li className="flex flex-col px-6 py-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="ml-4">Shop</span>
                  </div>
                  <button
                    onClick={() => toggleDropdown("shop")}
                    className="text-gray-600"
                  >
                    {openDropdown === "shop" ? "-" : "+"}
                  </button>
                </div>
                {openDropdown === "shop" && (
                  <ul className="mt-2 ml-8 space-y-2">
                    <li className="text-sm">shop Categories</li>
                    <li className="text-sm">shop brands</li>
                    <li className="text-sm">shop list</li>
                    <li className="text-sm">shop grid</li>
                    <li className="text-sm">product details</li>
                    <li className="text-sm">Grab Coupons</li>
                    <li className="text-sm">Cart</li>
                    <li className="text-sm"> Compare</li>
                    <li className="text-sm">Whislist</li>
                    <li className="text-sm">Track Your Order</li>
                  </ul>
                )}
              </li>

              <li className="flex flex-col px-6 py-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="ml-4">Vendors</span>
                  </div>
                </div>
              </li>

              <li className="flex flex-col px-6 py-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="ml-4">Pages</span>
                  </div>
                  <button
                    onClick={() => toggleDropdown("pages")}
                    className="text-gray-600"
                  >
                    {openDropdown === "pages" ? "-" : "+"}
                  </button>
                </div>
                {openDropdown === "pages" && (
                  <ul className="mt-2 ml-8 space-y-2">
                    <li className="text-sm">Login</li>
                    <li className="text-sm">FAQ</li>
                    <li className="text-sm">register</li>
                    <li className="text-sm">Forgot Password</li>
                    <li className="text-sm">404 Error</li>
                    <li className="text-sm">Coming Soon</li>
                  </ul>
                )}
              </li>

              {/* Dropdown for Blogs */}
              <li className="flex flex-col px-6 py-2 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="ml-4">Blogs</span>
                  </div>
                  <button
                    onClick={() => toggleDropdown("blogs")}
                    className="text-gray-600"
                  >
                    {openDropdown === "blogs" ? "-" : "+"}
                  </button>
                </div>
                {openDropdown === "blogs" && (
                  <ul className="mt-2 ml-8 space-y-2">
                    <li className="text-sm">Blog Grid</li>
                    <li className="text-sm">Blog list</li>
                  </ul>
                )}
              </li>

              {/* Contact Section */}
              <li className="flex items-center px-6 py-2 border-b">
                <span className="ml-4">Contact</span>
              </li>
            </ul>

            {/* Contact Us Button */}
            <div className="mt-4">
              <button className="w-1/3 py-2 pl-6 mt-6 ml-4 font-semibold text-left border rounded-md">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
