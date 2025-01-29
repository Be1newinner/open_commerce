"use client";
import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockQuestion } from "react-icons/tb";
export default function Forgot() {
  return (
    <div>
      <div className="flex justify-center ">
        <div className="w-2/5 mt-12 shadow-2xl border h-full max-md:w-screen max-md:h-screen max-md:mt-0">
          <div className=" flex p-12 max-md:p-3">
            <div className="h-full p-2">
              <TbLockQuestion className="text-4xl text-blue-700 p-1 gap-3" />
            </div>
            <div>
              <h1 className="font-medium text-4xl ">Forgot Passsword</h1>
              <p>
                Lost your password? Please enter your username or email address.
                You will recieve a link to create a new password via email.
              </p>
            </div>
          </div>
          <div className="px-10 pb-12 ">
            <form>
              <label for="email">Email</label>
              <div className="h-12 w-full border flex ">
                <MdOutlineEmail className="text-5xl p-2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full outline-none"
                  placeholder="Email address"
                ></input>
              </div>
              <Link href="#">
                <button className="h-12 border w-full bg-black text-white mt-4">
                  Send Password Reset Link
                </button>
              </Link>
            </form>
            <Link
              href="/Login"
              className="text-blue-800 flex justify-center mt-4"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
