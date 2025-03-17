import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = 100;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [products, setProduct] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  // 🛒 Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size.");
      return;
    }

    let CartData = structuredClone(cartItem);

    if (CartData[itemId]) {
      CartData[itemId][size] = (CartData[itemId][size] || 0) + 1;
    } else {
      CartData[itemId] = { [size]: 1 };
    }

    setCartItem(CartData);

    // Sync with backend
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
        toast.error("Failed to add item to cart.");
      }
    }
  };

  // 🛍️ Get total item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      totalCount += Object.values(cartItem[items]).reduce(
        (sum, qty) => sum + qty,
        0
      );
    }
    return totalCount;
  };

  // 🔄 Update item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity < 1) {
      removeItemFromCart(itemId, size);
      return;
    }

    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
      setCartItem(cartData);
    }

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating item quantity:", error);
        toast.error("Failed to update quantity.");
      }
    }
  };

  // 🗑️ Remove item from cart
  const removeItemFromCart = async (itemId, size) => {
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]?.[size]) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      setCartItem(cartData);

      if (token) {
        try {
          await axios.post(
            `${backendUrl}/api/cart/remove`,
            { itemId, size },
            { headers: { token } }
          );
        } catch (error) {
          console.error("Error removing item from cart:", error);
          toast.error("Failed to remove item.");
        }
      }
    }
  };

  // 💲 Calculate total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const size in cartItem[items]) {
          totalAmount += itemInfo.price * cartItem[items][size];
        }
      }
    }
    return totalAmount;
  };

  // 🛍️ Fetch product data
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setProduct(response.data.products);
      } else {
        toast.error("Failed to fetch product data.");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Could not load products.");
    }
  };

  // 🛒 Fetch user cart
const getUserCart = async () => {
  if (!token) {
    console.log("No token found. Cannot fetch user cart.");
    return;
  }

  try {
    const response = await axios.post(
      `${backendUrl}/api/cart/get`,
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      setCartItem(response.data.cartData || {}); 
      console.log("Cart Item set in ShopContext:", response.data.cartData); 
    } else {
      toast.error("Failed to load cart.");
    }
  } catch (error) {
    console.error("Error fetching user cart:", error);
    toast.error("Could not fetch cart data.");
  }
};

  // 🔔 Sync token on load
  useEffect(() => {
    getProductData();
    if (token) getUserCart();
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems: cartItem, 
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    removeItemFromCart,
    backendUrl,
    setToken,
    token,
    setCartItem,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
