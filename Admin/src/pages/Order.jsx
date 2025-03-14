import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify"; // Corrected import
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 text-xs sm:text-sm text-gray-600" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  // Log to inspect the item structure
                  console.log("Item:", item);

                  const itemName = item.name
                    ? item.name
                    : "Item name not available";

                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {itemName} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p 
                      className="py-0.5"
                      key={index}>
                        {itemName} x {item.quantity} <span>{item.size},</span>
                      </p>
                    );
                  }
                })}
              </div>
              {/* Accessing order.address inside the map */}
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ",  "}</p>
                <p>
                  {order.address.city +
                    ",  " +
                    order.address.state +
                    ",  " +
                    order.address.country +
                    ",   " +
                    order.address.phone}
                </p>
              </div>
            </div>
            <div>
             
              <p className="text-sm sm:text-[15px]">Item:{order.items.length}</p>
              <p className="mt-3">Method:{order.paymentMethod}</p>
              <p>Payment:{order.payment ? "Done":"Pending"}</p>
              <p>Date:{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency}{order.amount}</p>
            <select className="p-2 font-semibold">
              <option value="OrderPlaced">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
