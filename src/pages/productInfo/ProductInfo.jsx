import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/firebaseConfig";

function ProductInfo() {
  const { mode, setLoading } = useContext(myContext);
  const [product, setProduct] = useState(null);
  const params = useParams();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [rating, setRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  // Generate random rating & reviews on load
  useEffect(() => {
    setRating(Math.floor(Math.random() * 5) + 1); // 1 to 5
    setReviewsCount(Math.floor(Math.random() * 100) + 1); // 1 to 100
  }, []);

  const getProductData = async () => {
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(fireDB, "products", params.id));
      setProduct(docSnap.data());
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  if (!product) return null;

  return (
    <Layout>
      <section
        className={`text-gray-600 body-font overflow-hidden ${
          mode === "dark" ? "bg-gray-900 text-white" : ""
        }`}
      >
        <div className="container px-4 sm:px-5 py-10 md:py-16 mx-auto">
          <div className="lg:flex lg:items-start lg:space-x-10">
            {/* Product Image */}
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0 flex justify-center">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full max-w-lg rounded-2xl object-contain shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="lg:w-1/2 w-full lg:pl-10">
              <h2
                className={`text-sm uppercase tracking-widest mb-1 ${
                  mode === "dark" ? "text-pink-400" : "text-pink-600"
                }`}
              >
                E-Bharat Exclusive
              </h2>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {product.title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => (
                      <svg
                        key={idx}
                        fill={idx < rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-indigo-500"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  <span className="ml-2 text-sm">{reviewsCount} Reviews</span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-6 leading-relaxed border-b-2 pb-5">
                {product.description}
              </p>

              {/* Price & Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-2xl sm:text-3xl font-semibold">
                  ₹{product.price}
                </span>

                <button
                  onClick={handleAddCart}
                  className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition duration-200"
                >
                  Add to Cart
                </button>

                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
