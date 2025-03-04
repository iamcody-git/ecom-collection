import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import esewa from "../assets/esewa.jpg";
import khalti from "../assets/khalti.png";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {navigate} = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4">
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-6 sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="number"
          placeholder="Phone Number"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Side - Payment & Cart Summary */}
      <div className="mt-8 w-full sm:w-1/2 lg:w-1/3">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"Payment"} text2={"METHOD"} />
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            {/* Esewa */}
            <div
              onClick={() => setMethod("esewa")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg hover:shadow-lg ${
                method === "esewa" ? "border-green-400 ring-2 ring-green-300" : ""
              }`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "esewa" ? "bg-green-400" : ""}`}></p>
              <div className="w-24 h-16 flex items-center justify-center border rounded-lg bg-white">
                <img className="h-10 w-auto object-contain" src={esewa} alt="Esewa" />
              </div>
            </div>

            {/* Khalti */}
            <div
              onClick={() => setMethod("khalti")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg hover:shadow-lg ${
                method === "khalti" ? "border-purple-400 ring-2 ring-purple-300" : ""
              }`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "khalti" ? "bg-purple-400" : ""}`}></p>
              <div className="w-24 h-16 flex items-center justify-center border rounded-lg bg-white">
                <img className="h-10 w-auto object-contain" src={khalti} alt="Khalti" />
              </div>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg hover:shadow-lg ${
                method === "cod" ? "border-gray-400 ring-2 ring-gray-300" : ""
              }`}
            >
              <p className={`w-4 h-4 border rounded-full ${method === "cod" ? "bg-gray-400" : ""}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate('/orders')} className="bg-black text-white text-sm px-16 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
