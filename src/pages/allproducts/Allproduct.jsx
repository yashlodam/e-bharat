import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

function AllProduct() {
  const { mode } = useContext(myContext);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(fireDB, "products"));
      const arr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(arr);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        backgroundColor: mode === "dark" ? "#1e1e1e" : "#f9f9f9",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
        All Products
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className={`w-full max-w-md px-4 py-2 rounded-lg shadow focus:outline-none ${
            mode === "dark"
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-white text-gray-900 placeholder-gray-500"
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <h2 className="text-center text-xl">Loading...</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((p) =>
              p.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <div
                key={product.id}
                className={`flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transform transition-all duration-300 ${
                  mode === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                {/* Product Image */}
                <Link to={`/productinfo/${product.id}`} className="overflow-hidden rounded-t-2xl">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-56 md:h-64 object-contain transition-transform duration-300 hover:scale-105"
                  />
                </Link>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                  <p className={`font-bold text-md mb-4 ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    ₹{product.price}
                  </p>

                  <div className="mt-auto flex justify-between">
                    <Link
                      to={`/productinfo/${product.id}`}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default AllProduct;
