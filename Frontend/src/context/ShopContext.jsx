import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = 100;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size.");
      return;
    }

    let CartData = structuredClone(cartItem);

    if (CartData[itemId]) {
      if (CartData[itemId][size]) {
        CartData[itemId][size] += 1;
      } else {
        CartData[itemId][size] = 1;
      }
    } else {
      CartData[itemId] = {};
      CartData[itemId][size] = 1;
    }
    setCartItem(CartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
        for (const size in cartItem[items]) {
            totalCount += cartItem[items][size]; 
        }
    }
    return totalCount;
};


  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addToCart,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
