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



    // Save the order and return the saved order
    const newOrder = await orderModel.create(orderData);

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed", order: newOrder });
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
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    console.log("Fetching orders for userId:", userId); // Log the userId

    // Fetch the latest orders for the user, sorted by date (most recent first)
    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    console.log("Orders found:", orders); // Log the orders found

    if (orders.length === 0) {
      return res.json({ success: true, message: "No orders found", orders: [] });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from admin panel
export const updateStatus = async (req, res) => {};
