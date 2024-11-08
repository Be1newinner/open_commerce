import Link from "next/link";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import { IoIosArrowDown, IoMdHeartEmpty } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { VscThreeBars } from "react-icons/vsc";

export default function Navbar() {
  return (
    <div className="">
      <div className=" flex justify-between items-center py-5 w-[1280px] mx-auto max-xl:w-[90%] ">
        <Link href="/">
          <div className="flex items-center">
            <RiShoppingBag4Fill className="text-4xl text-red-600" />
            <h1 className="text-4xl max-sm:text-2xl ">
              <b>Shofy</b>
            </h1>
          </div>
        </Link>
        <div className="sm:hidden">
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
              <h5 className="font-semibold">Hello, Guest</h5>
              <h6>Login / Register</h6>
            </div>
          </div>
          <div className="flex gap-2">
            <LuArrowDownUp className=" text-2xl" />
            <IoMdHeartEmpty className="text-2xl" />
            <FaShoppingBag className="text-2xl " />
          </div>
        </div>
      </div>
      <hr />
      <div className="w-[1280px] mx-auto max-xl:w-[90%] max-lg:mx-0 max-md:hidden flex">
        <div className="relative flex gap-10 font-[600] w-[1280px] mx-auto max-xl:w-[90%] items-center">
          {/* Dropdown Trigger */}
          <h1 className=" cursor-pointer group z-50 relative">
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

          {/* Static Links */}
          <h1 className="ml-4 cursor-pointer">Home</h1>
          <h1 className="ml-4 cursor-pointer">Shop</h1>
          <h1 className="ml-4 cursor-pointer">Vendors</h1>
          <h1 className="ml-4 cursor-pointer">Pages</h1>
          <h1 className="ml-4 cursor-pointer">Blog</h1>
        </div>
        <div className="flex items-center w-[200px] gap-2 max-lg:hidden">
          <FiPhoneCall size={24} color="blue" />
          <div>
            <p className="font-semibold text-sm">Hotline:</p>
            <span className="text-sm">123-456-7890</span>
          </div>
        </div>
      </div>
    </div>
  );
}
