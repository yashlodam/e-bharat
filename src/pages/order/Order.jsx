import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import Loader from "../../components/loader/Loader";

function Order() {
  const storedUser = localStorage.getItem("user");
  const userid = storedUser ? JSON.parse(storedUser).user.uid : null;

  const { mode, loading, order } = useContext(myContext);

  // Filter only logged-in user's orders
  const myOrders = order.filter((obj) => obj.userid === userid);

  return (
    <Layout>
      {loading && <Loader />}

      <div className={`min-h-screen p-4 ${mode === "dark" ? "bg-[#1e1e1e]" : "bg-gray-100"}`}>
        {myOrders.length > 0 ? (
          <div className="space-y-8">
            {myOrders.map((orderItem, orderIndex) => (
              <div
                key={orderIndex}
                className={`max-w-5xl mx-auto p-4 rounded-lg shadow-md ${
                  mode === "dark" ? "bg-[#282c34] text-white" : "bg-white text-black"
                }`}
              >
                {/* Order Date */}
                <div className="mb-4">
                  <p className="font-semibold">
                    Order Date:{" "}
                    <span className="font-normal">
                      {orderItem.date || "Unknown Date"}
                    </span>
                  </p>
                </div>

                {/* Cart Items */}
                <div className="space-y-4">
                  {orderItem.cartItems.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-lg p-4 shadow hover:shadow-lg transition-all duration-200 ${
                        mode === "dark" ? "bg-[#1f2125]" : "bg-gray-50"
                      }`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full sm:w-40 h-40 object-contain rounded-lg"
                      />
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <div>
                          <h2 className="text-lg font-bold truncate">{item.title}</h2>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-3">
                            {item.description}
                          </p>
                          <p className="mt-2 font-semibold text-pink-600">₹{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-center text-2xl text-gray-500 mt-10">
            No Orders Found
          </h2>
        )}
      </div>
    </Layout>
  );
}

export default Order;
