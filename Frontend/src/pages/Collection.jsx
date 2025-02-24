import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm;hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* category filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Men"} />
              Men
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Women"} />
              Women
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Kids"} />
              Kids
            </p>
          </div>
        </div>

        {/* subcategory filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Topwear"} />
              Topwear
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Bottomwear"} />
              Bottomwear
            </p>

            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Winterwear"} />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* right side of collection */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl b-4">
          <Title text1={"All"} text2={"COLLECTION"} />

          {/* product sort */}

          <select className="border-2 border-gray- text-sm px-2">
            <option value="relavent">Sort by:Relavent</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>

        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((items, index) => (
            <ProductItems
              key={index}
              id={items._id}
              image={items.image}
              name={items.name}
              price={items.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
