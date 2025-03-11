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
  const [token, setToken] =useState('')
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

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        
        
      }
      
    }
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

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId][size] = quantity;
    setCartItem(cartData);

    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/update',{itemId, size, quantity},{headers:{token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.error("Error calculating cart amount:", error);
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setProduct(response.data.products);
      } else {
        toast.error(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get', 
        {}, 
        { headers: { token } }
      );
  
      if (response.data.success) {
        setCartItem(response.data.cartData);
      } else {
        toast.error("Failed to fetch cart data.");
      }
    } catch (error) {
      console.log("Error fetching user cart:", error);
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
  },[]);

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
    navigate,
    backendUrl,
    setToken, token
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
