import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs ";
  const delivery_fee = 100;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();


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

const updateQuantity = async(itemId, size, quantity)=>{
  let cartData = structuredClone(cartItem);
  cartData[itemId][size] = quantity;

  setCartItem(cartData);

}

const getCartAmount =() =>{
  let totalAmount = 0;
  for(const items in cartItem){
    let itemInfo = products.find((product)=> product._id === items);
    for(const item in cartItem[items]){
      try {
        if(cartItem[items][item] > 0){
          totalAmount += itemInfo.price * cartItem[items][item]


        }
        
      } catch (error) {
        
      }

    }
  }
  return totalAmount;
 
}


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
    navigate
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
