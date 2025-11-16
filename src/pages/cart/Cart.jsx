import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

function Cart() {
  const { mode } = useContext(myContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const shipping = 100;
  const grandTotal = totalAmount + shipping;

  // Update total amount
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);
    setTotalAmount(total);
  }, [cartItems]);

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  // Razorpay Payment
  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("All fields are required", { position: "top-center" });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    };

    const options = {
      key: "rzp_test_Rfa6xLyB88FElr",
      key_secret: "t2eEp9Kchtm1Qj4ut6Kvoq5z",
      amount: grandTotal * 100,
      currency: "INR",
      order_receipt: `order_rcptid_${name}`,
      name: "E-Bharat",
      description: "Order Payment",
      handler: async function (response) {
        toast.success("Payment Successful");

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId: response.razorpay_payment_id,
        };

        try {
          await addDoc(collection(fireDB, "orders"), orderInfo);
        } catch (error) {
          console.log(error);
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Layout>
      <div
        className={`pt-5 pb-20 ${
          mode === "dark" ? "bg-[#282c34] text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h1 className="text-center text-2xl font-bold mb-10">Cart Items</h1>

        <div className="container mx-auto px-4 md:flex md:space-x-6">
          {/* Cart Items */}
          <div className="md:w-2/3 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map((item) => {
                const { title, price, description, imageUrl } = item;
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-200 ${
                      mode === "dark" ? "bg-[#1f2125]" : "bg-white"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full sm:w-40 h-40 object-contain rounded-lg"
                    />
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <h2 className="text-lg font-bold">{title}</h2>
                        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
                        <p className="mt-1 font-semibold">₹{price}</p>
                      </div>
                      <button
                        onClick={() => deleteCart(item)}
                        className="mt-3 w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Summary */}
          <div className="mt-6 md:mt-0 md:w-1/3 rounded-lg bg-white p-6 shadow-md space-y-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>

            <Modal
              name={name}
              setName={setName}
              address={address}
              setAddress={setAddress}
              pincode={pincode}
              setPincode={setPincode}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
