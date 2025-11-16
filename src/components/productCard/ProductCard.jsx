import React, { useEffect, useContext } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";

function ProductCard() {
  const { mode, product, searchKey, filterType, filterPrice } = useContext(myContext);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredProducts = product
    .filter((obj) => (obj.title || "").toLowerCase().includes((searchKey || "").toLowerCase()))
    .filter((obj) => (filterType === "" ? true : (obj.category || "") === filterType))
    .filter((obj) => (filterPrice === "" ? true : obj.price == filterPrice));

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-4 sm:px-5 py-10 md:py-16 mx-auto">

        {/* Heading */}
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-bold mb-2"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Trending Products
          </h1>
          <div className="h-1 w-24 bg-pink-600 rounded"></div>
        </div>

        {/* Horizontal/Vertical Cards */}
        <div className="flex flex-col gap-4">
          {filteredProducts.map((item) => {
            const { title, price, imageUrl } = item;

            return (
              <div
                key={item.id}
                onClick={() => (window.location.href = `/productinfo/${item.id}`)}
                className={`cursor-pointer flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 ${
                  mode === "dark" ? "bg-[#1f2125] text-white" : "bg-white text-black"
                }`}
              >
                {/* IMAGE */}
                <div className="flex-shrink-0 w-full sm:w-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto max-h-64 sm:h-48 object-contain transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1 p-4 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-xs font-semibold text-pink-600 uppercase tracking-wide">
                      E-Bharat Exclusive
                    </h2>

                    <h1 className="text-base sm:text-lg font-bold mt-1 line-clamp-2">
                      {title}
                    </h1>

                    <p
                      className="text-md mt-1 font-semibold"
                      style={{ color: mode === "dark" ? "#ddd" : "#444" }}
                    >
                      ₹ {price}
                    </p>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addCart(item);
                    }}
                    className="mt-4 w-full sm:w-auto sm:self-start bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
