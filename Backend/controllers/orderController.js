import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using COD method
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    console.log("Received Order Data:", { userId, items, amount, address });

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// placing order using khalti method
export const placeOrderKhalti = async (req, res) => {};

// placing order using Esewa method
export const placeOrderEsewa = async (req, res) => {};

// all order data for admin panel
export const allOrder = async (req, res) => {};

// user order data for frontend
export const userOrders = async (req, res) => {};

// update order status from admin panel
export const updateStatus = async (req, res) => {};
