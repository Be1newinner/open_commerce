import { RiDeleteBin5Line } from "react-icons/ri";
import { FaMinus, FaPlus } from "react-icons/fa";
import image1 from "@/assets/1.png";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  return (
    <div className="max-w-7xl mt-10 mx-auto justify-between  max-xl:w-[90%]">
      <div className="flex gap-10 max-xl:flex-wrap max-md:w-full max-md:h-full max-md:p-0 max-md:flex-wrap min-md:w-4/5 ">
        <div className="w-4/6 max-md:w-full lg:w-full md:w-full">
          <div className=" flex justify-between  max-md:hidden p-4 bg-gray-200 ">
            <h1 className="font-semibold">Product</h1>
            <h1 className="font-semibold">Price</h1>
            <h1 className="font-semibold">Quantity</h1>
            <h1 className="font-semibold">Total</h1>
          </div>
          <div className="flex items-center max-md:hidden">
            <div className="flex  max-sm:flex-wrap ">
              <Image src={image1} className="p-4 " width={100} height={100} />
              <div className="font-medium w-[200px] p-4 max-md:w-1/4">
                <h1>Lenovo ThinkPad X1 Carbon Gen 9 Laptop</h1>

                <p className="text-green-800 text-sm mt-2">In stock</p>
                <h6 className="text-sm mt-1">Vendor: Royal store</h6>
                <h6 className="text-sm mt-1">(Color: Black, Size: XL)</h6>
              </div>
            </div>

            <div className="flex flex-1  items-center justify-between ">
              <div className="p-4 font-medium  max-md:w-1/4">
                <p>$878.00</p>
              </div>
              <div className="flex gap-4 items-center border-2  h-8 p-3 rounded-full ">
                <FaMinus className="md:text-sm " />
                <input
                  type="text"
                  value={1}
                  className="w-12 text-center focus:outline-none border-x-2"
                />
                <FaPlus className="md:text-sm" />
              </div>
              <div className="p-4 font-medium max-md:ml-1 max-md:w-1/4">
                <p>$878.00</p>
              </div>
              {/* <div className=" p-5">
                <Link to="#" className="text-2xl p-10 ">
                  <RiDeleteBin5Line />
                </Link>
              </div> */}
            </div>
          </div>
          <div className="md:hidden">
            <div>
              <div className="max-md:flex max-md:w-full  ">
                <div className="">
                  <Image
                    src={image1}
                    className=" bg-black mt-10 "
                    width={100}
                    height={100}
                  />
                </div>
                <div className="font-medium p-4">
                  <h1>Lenovo ThinkPad X1 Carbon Gen 9 Laptop</h1>
                  <p className="text-2xl font-medium mt-2">$878.00</p>

                  <p className="text-green-800 text-sm mt-2">In stock</p>
                  <h6 className="text-sm mt-1">Vendor: Royal store</h6>
                  <h6 className="text-sm mt-1">(Color: Black, Size: XL)</h6>
                </div>
              </div>
              <div className="flex gap-4 max-sm:ml-4 items-center border-2 w-28 p-2 rounded-xl   ">
                <FaMinus className="" />
                <input
                  type="text"
                  value={1}
                  className="w-10 text-center focus:outline-none border-x-2"
                />
                <FaPlus />
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="mt-8 max-md:px-10 md:px-4">
            <span>Coupon Code:</span>
            <div className="flex gap-2 ">
              <div className=" border border-black h-12 w-2/5 max-md:w-full">
                <input
                  type="text"
                  id="text"
                  name="text"
                  className="w-full h-full outline-none p-2"
                  placeholder="Enter Coupan Code"
                ></input>
              </div>
              <div>
                <div className="h-12 flex justify-center w-24 bg-black text-white ">
                  <button className="h-full w-full max-md:hover:bg-blue-700">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/6 shadow-2xl p-10 max-md:flex-wrap max-md:w-full">
          <div>
            <div className="flex justify-between font-medium text-xl ">
              <h1>Subtotal</h1>
              <p>$878.00</p>
            </div>
            <br></br>
            <hr></hr>

            <div className="flex justify-between mt-4">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-medium text-xl mt-4 ">
              <h1>Total</h1>
              <p>$878.00</p>
            </div>
            <p className="text-sm mt-2">(Shipping fees not included)</p>
          </div>

          <Link href="#">
            <button className="bg-black text-white w-full h-12 mt-4 hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </Link>
          <Link
            href="#"
            className="flex justify-center hover:text-blue-700 mt-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
