import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";

const Vender = () => {
  return (
    <>
      <div className="box-border max-w-7xl max-xl:w-[90%] mx-auto m-10">
        <div className=" flex flex-wrap justify-between  gap-4">
          {store.map((store, index) => (
            <div key={index} className="border rounded-md w-[400px]">
              <div className="p-6 relative">
                <div className="font-bold text-2xl my-2">{store.store}</div>
                <div className="flex gap-2 pt-1 ">
                  <FaStar className="mt-1" color="orange" />
                  <span>(69 reviews)</span>
                </div>
                <div className="text-zinc-700 text-wrap pt-1 flex gap-1">
                  <IoLocationOutline className="mt-1" />
                  {store.address}
                </div>
                <div className="text-zinc-700  pt-1 flex gap-1">
                  <FiPhone className="mt-1" />
                  +14698995746
                </div>
                <div className="text-zinc-700 pt-1 flex gap-1 mb-2 ">
                  <FaRegEnvelope className="mt-1" />
                  {store.email}
                </div>
                <img
                  className="bg-white h-20 absolute right-[10px] -bottom-6 shadow-2xl rounded-full"
                  src="https://shofy.botble.com/storage/main/stores/4.png"
                  alt="logo"
                />
              </div>
              <hr />
              <div className="px-6 py-4 rounded-md">
                <div className=" bg-blue-600 w-max font-semibold text-white">
                  <button className="px-4 py-2 flex gap-2">
                    <IoStorefrontOutline className="text-2xl" />
                    Visit Store
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Vender;
const store = [
  {
    store: "Global Store",
    rating: 3,
    reviews: 69,
    address: "8436 Bartoletti Stravenue Apt. 346, New Royalchester, ",
    number: "+14698995746",
    email: "chyatt@example.org",
  },
  {
    store: "Roberts Store",
    rating: 3,
    reviews: 75,
    address: "643 Klein Trafficway Suite 698, Port Arthur, Kansas, LC ",
    number: "+146945466",
    email: "sporer.harmon@example.org",
  },
  {
    store: "Stouffer",
    rating: 3,
    reviews: 59,
    address: "2822 Pansy Ramp Suite 628, North Mckayla, Wisconsin,  ",
    number: "+145356446",
    email: "joanie.schinner@example.net",
  },
  {
    store: "StarKist",
    rating: 4,
    reviews: 80,
    address: "892 Rosenbaum Tunnel Apt. 768, Port Koleberg, Indian ",
    number: "+147855433746",
    email: "wolf.anya@example.com",
  },
  {
    store: "Old EL Paso",
    rating: 2,
    reviews: 69,
    address: "596 Hand Station, Lake Kathryn, Utah, TO ",
    number: "+14783539579",
    email: "donavon08@example.com",
  },
  {
    store: "Royal Store",
    rating: 4,
    reviews: 69,
    address: "6460 Wolf Coves, Hannahstad, Illinois, VI ",
    number: "+1358365399",
    email: "mbode@example.net",
  },

  {
    store: "Global Office ",
    rating: 3,
    reviews: 77,
    address: "90139 Dach Field, Wiegandfurt, Missouri, TV ",
    number: "+1385337375",
    email: "carolyne.beier@example.com",
  },
];
