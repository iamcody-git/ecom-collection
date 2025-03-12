import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,  
    navigate,
    setToken,
    token,
    setCartItems,
  } = useContext(ShopContext); 

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo2} alt="" className="w-24 h-20" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-grey-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt=""
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      <div
        className={`fixed top-0 right-0 h-screen w-[70%] bg-white transition-transform duration-300 sm:hidden 
        ${visible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b text-lg"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b text-lg"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b text-lg"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-4 px-6 border-b text-lg"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
