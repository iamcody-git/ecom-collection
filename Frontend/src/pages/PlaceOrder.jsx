import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import esewa from "../assets/esewa.jpg";
import khalti from "../assets/khalti.png";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItem,
    getCartAmount,
    delivery_fee,
    products,
    setCartItem,
    setProducts, // Fixed incorrect setProduct usage
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    setLoading(true);

    if (Object.values(formData).some((field) => field.trim() === "")) {
      toast.error("Please fill in all required fields!");
      setLoading(false);
      return;
    }

    try {
      let orderItems = [];

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          const itemQuantity = cartItem[productId][size];

          if (itemQuantity > 0) {
            const product = products.find((product) => product._id === productId);
            if (product) {
              const itemInfo = { ...product, quantity: itemQuantity, size };
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("No items in the cart!");
        setLoading(false);
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      const response = await axios.post(backendUrl + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        setCartItem({});
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [backendUrl, setProducts]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t px-4"
    >
      <div className="flex flex-col gap-6 sm:max-w-[480px]">
        <Title text1="Delivery" text2="INFORMATION" />
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
            value={formData.lastName}
            name="lastName"
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
        <CartTotal />

        <div className="mt-12">
          <Title text1="Payment" text2="METHOD" />
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            {[
              { id: "esewa", image: esewa, color: "green" },
              { id: "khalti", image: khalti, color: "purple" },
              { id: "cod", label: "Cash on Delivery", color: "gray" },
            ].map(({ id, image, label, color }) => (
              <div
                key={id}
                onClick={() => setMethod(id)}
                className={`flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-lg hover:shadow-lg ${
                  method === id ? `border-${color}-400 ring-2 ring-${color}-300` : ""
                }`}
              >
                <div
                  className={`w-4 h-4 border rounded-full ${
                    method === id ? `bg-${color}-400` : ""
                  }`}
                />
                {image ? (
                  <div className="w-24 h-16 flex items-center justify-center border rounded-lg bg-white">
                    <img className="h-10 w-auto object-contain" src={image} alt={id} />
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm font-medium mx-4">{label}</p>
                )}
              </div>
            ))}
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`bg-black text-white text-sm px-16 py-3 rounded-lg transition cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
