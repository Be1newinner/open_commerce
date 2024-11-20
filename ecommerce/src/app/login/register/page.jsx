"use client";
import Link from "next/link";
import { MdLockOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoCallOutline } from "react-icons/io5";
import Image from "next/image";
import image from "../../../assets/Security.jpg";
export default function Register() {
  return (
    <div>
      <div className=" bg-gray-200 z-10  p-24 flex justify-center max-md:p-0 ">
        <div className="shadow-2xl flex justify-center w-4/5 ">
          <div className=" bg-white w-3/5 h-99 max-md:hidden">
            <Image
              src={image}
              alt="Description of image"
              class="w-full h-auto"
              width={200}
              height={200}
            />
          </div>
          <div className="w-3/5 bg-gray-100 max-md:w-screen ">
            <div>
              <div className="p-14 max-md:w-screen max-md:p-5 ">
                <form>
                  <div className="flex">
                    <div className="h-24 w-32 ">
                      <MdLockOutline className="text-5xl p-3 bg-white " />
                    </div>
                    <div>
                      <h1 className="text-3xl font-medium">
                        Register an account
                      </h1>
                      <p>
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account.
                      </p>
                    </div>
                  </div>

                  <br />
                  <label for="name">Full name</label>
                  <div className="flex bg-white h-12 w-full border-solid border border-black p-1">
                    <FaRegUser className="h-full text-4xl p-2" />
                    <input
                      type="name"
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      className="w-full ml-2 h-full outline-none "
                    ></input>
                  </div>
                  <br />
                  <label for="email">Email</label>
                  <div className="flex bg-white h-12 w-full border-solid border border-black p-1">
                    <MdOutlineMail className="h-full text-4xl p-1" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      required
                      className="w-full ml-2 h-full outline-none "
                    ></input>
                  </div>
                  <br></br>
                  <label for="phone">Phone (optional)</label>
                  <div className="flex bg-white h-12 w-full border-solid border border-black p-1">
                    <IoCallOutline className="h-full text-4xl p-1" />
                    <input
                      type="tel"
                      id="tel"
                      name="tel"
                      placeholder="Phone number"
                      required
                      className="w-full ml-2 h-full outline-none "
                    ></input>
                  </div>
                  <br />

                  <label for="password">Password</label>
                  <div className="flex bg-white h-12 w-full border-solid border border-black p-1">
                    <MdLockOutline className="h-full text-4xl p-1" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      className="w-full ml-2 h-full outline-none "
                    ></input>
                  </div>
                  <br />
                  <label for="password">Password comfirmation</label>
                  <div className="flex bg-white h-12 w-full border-solid border border-black p-1">
                    <MdLockOutline className="h-full text-4xl p-1" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password confirmation"
                      className="w-full ml-2 h-full outline-none "
                    ></input>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="radio"
                        id="is_customer"
                        name="is_customer"
                        value="I am a customer"
                      />
                      <label for="is_customer">I am a customer</label>

                      <input
                        type="radio"
                        id="is_vendor"
                        name="is_customer"
                        value="I am a vendor"
                      />
                      <label for="is_vendor">I am a vendor</label>
                    </div>
                  </div>
                  <br></br>
                  <button
                    type="submit"
                    className="h-12 w-full bg-black text-white font-medium "
                  >
                    Register
                    <FaLongArrowAltRight className="text-white inline ml-2" />
                  </button>
                </form>
                <div className="flex justify-center mt-4">
                  <span className="">Already have an account?</span>
                  <Link href="/login" className="ml-2 text-blue-700">
                    Login
                  </Link>
                </div>
                <hr className="mt-14 border-black"></hr>
                <br></br>
                <span className="flex justify-center ">
                  Login with social networks
                </span>

                <Link href="https://www.facebook.com/" className="outline-none">
                  <button className="border bg-blue-600 rounded-xl mt-12 text-white h-12 w-full flex justify-center">
                    <p className="mt-2">Sign in with facebook</p>
                  </button>
                </Link>
                <Link
                  href="https://accounts.google.com/signin/"
                  className="outline-none"
                >
                  <button className="border bg-red-500 rounded-xl mt-2 text-white h-12 w-full flex justify-center">
                    <p className="mt-2">Sign in with google</p>
                  </button>
                </Link>
                <Link href="#" className="outline-none">
                  <button className="border bg-black rounded-xl mt-2 text-white h-12 w-full flex justify-center">
                    <p className="mt-2">Sign in with GitHub</p>
                  </button>
                </Link>
                <Link
                  href="https://www.linkedin.com/login"
                  className="outline-none"
                >
                  <button className="border bg-blue-700 rounded-xl mt-2 text-white h-12 w-full flex justify-center">
                    <p className="mt-2">Sign in with Linkedin</p>
                  </button>
                </Link>
                <Link
                  href="https://www.linkedin.com/login"
                  className="outline-none"
                >
                  <button className="border bg-blue-700 rounded-xl mt-2 text-white h-12 w-full flex justify-center">
                    <p className="mt-2">Sign in with Linkedin OpenId Connect</p>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
