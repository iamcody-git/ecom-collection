import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import esewa from "../assets/esewa.jpg";
import khalti from "../assets/khalti.png";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItem,
    getCartAmount,
    delivery_fee,
    products,
    setCartItem, 
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (Object.values(formData).every((field) => field.trim() !== "")) {
      try {
        let orderItems = [];
  
        for (const productId in cartItem) {
          for (const size in cartItem[productId]) {
            const itemQuantity = cartItem[productId][size];
  
            if (itemQuantity > 0) {
              const itemInfo = structuredClone(
                products.find((product) => product._id === productId)
              );
  
              if (itemInfo) {
                itemInfo.quantity = itemQuantity;
                itemInfo.size = size;
                orderItems.push(itemInfo);
              }
            }
          }
        }
  
        let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee,
        };
  
        switch (method) {
          case "cod":
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              setCartItem({}); // Use the correct function name
              navigate("/orders");
            } else {
              toast.error(response.data.message);
            }
            break;
  
          default:
            break;
        }
  
        if (orderItems.length > 0) {
          navigate("/orders");
        } else {
          alert("No items in the cart!");
        }
      } catch (error) {
        console.error("Error processing order:", error);
      }
    } else {
      alert("Please fill in all required fields!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4"
    >
      <div className="flex flex-col gap-6 sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={onChangeHandler}
            value={formData.lastname}
            name="lastname"
            type="text"
            required
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={formData.email}
          name="email"
          type="email"
          required
          placeholder="Email Address"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          onChange={onChangeHandler}
          value={formData.address}
          name="address"
          type="text"
          required
          placeholder="Address"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.city}
            name="city"
            type="text"
            required
            placeholder="City"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={onChangeHandler}
            value={formData.state}
            name="state"
            type="text"
            required
            placeholder="State"
            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={formData.phone}
          name="phone"
          required
          type="tel"
          placeholder="Phone Number"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-8 w-full sm:w-1/2 lg:w-1/3">
        <div className="min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"Payment"} text2={"METHOD"} />
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div
              onClick={() => setMethod("esewa")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg hover:shadow-lg ${
                method === "esewa"
                  ? "border-green-400 ring-2 ring-green-300"
                  : ""
              }`}
            >
              <div
                className={`w-4 h-4 border rounded-full ${
                  method === "esewa" ? "bg-green-400" : ""
                }`}
              />
              <div className="w-24 h-16 flex items-center justify-center border rounded-lg bg-white">
                <img
                  className="h-10 w-auto object-contain"
                  src={esewa}
                  alt="Esewa"
                />
              </div>
            </div>
            <div
              onClick={() => setMethod("khalti")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg hover:shadow-lg ${
                method === "khalti"
                  ? "border-purple-400 ring-2 ring-purple-300"
                  : ""
              }`}
            >
              <div
                className={`w-4 h-4 border rounded-full ${
                  method === "khalti" ? "bg-purple-400" : ""
                }`}
              />
              <div className="w-24 h-16 flex items-center justify-center border rounded-lg bg-white">
                <img
                  className="h-10 w-auto object-contain"
                  src={khalti}
                  alt="Khalti"
                />
              </div>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg hover:shadow-lg ${
                method === "cod" ? "border-gray-400 ring-2 ring-gray-300" : ""
              }`}
            >
              <div
                className={`w-4 h-4 border rounded-full ${
                  method === "cod" ? "bg-gray-400" : ""
                }`}
              />
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white text-sm px-16 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
