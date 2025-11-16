import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import myContext from "../../context/data/myContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

function CategoryPage() {
  const { mode } = useContext(myContext);
  const { categoryName } = useParams(); // gets category from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Fetch products from Firestore
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "products"),
        where("category", "==", categoryName) // must match Firestore category
      );
      const snapshot = await getDocs(q);
      const arr = [];
      snapshot.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
      setProducts(arr);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => dispatch(addToCart(product));

  return (
    <div
      className={`min-h-screen p-4 ${
        mode === "dark" ? "bg-[#1e1e1e] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">
        {categoryName.replace("-", " ")}
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 ${
                mode === "dark" ? "bg-[#282c34]" : "bg-white"
              }`}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-bold mt-2 truncate">{product.title}</h2>
              <p className="text-sm mt-1 text-gray-400 truncate">
                {product.description}
              </p>
              <p className="text-md mt-1 font-semibold">₹{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
