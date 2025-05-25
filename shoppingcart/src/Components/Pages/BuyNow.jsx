import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ManageProductData";
import { useContext, useEffect, useState } from "react";
import { transformModal } from "../HelperFn/modalAnimation";
import { FaShoppingCart } from "react-icons/fa";

const BuyNow = () => {
  //for page routing
  const navigate = useNavigate();

  //getting usestate data from central storage
  const {
    purchaseData,
    setPurchaseData,

    setExpand,
    setExpandData,

    myOrders,
    setMyOrders,

    orderIds,
    setOrderIds,

    setIsCartOpen
  } = useContext(ProductContext);

  //storing random discount percent between 60% and 90%
  const [discountPercentage, setDiscountPercentage] = useState(0);

  //storing a random price between 60% and 90%
  const [discountPrice, setDiscountPrice] = useState(0);

  //functions

  const placeOrder = () => {
    const updatedData = {
      ...purchaseData,
      disCountPrice: discountPrice,
      offer: discountPercentage,
    };

    const storeUpdatedData = [...myOrders, updatedData];

    setMyOrders(storeUpdatedData);
    localStorage.setItem("orderedData", JSON.stringify(storeUpdatedData));

    navigate("/order");
  };

  const goBack = () => {
    const removeOrderId = orderIds.filter((Id) => purchaseData.Id != Id);

    setOrderIds(removeOrderId);
    localStorage.setItem("orderId", JSON.stringify(removeOrderId));

    setPurchaseData({});
    localStorage.removeItem("purchaseData");

    setExpandData({});
    localStorage.removeItem("expandData");

    setExpand(false);
    localStorage.removeItem("expand");

    setIsCartOpen(false);
    localStorage.removeItem("cartModal");

    window.history.back();
  };

  useEffect(() => {
    //generate a random discount percent
    const randomPercentage = Math.floor(Math.random() * (90 - 60 + 1)) + 60;

    //generate a random discount price
    const calculatedDiscount = Math.floor(
      (purchaseData.Price * randomPercentage) / 100
    );

    setDiscountPercentage(randomPercentage);
    setDiscountPrice(calculatedDiscount);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] flex items-center justify-center p-4 backdrop"
      onClick={transformModal}
    >
      <div className="modal-box max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-6 md:flex  animate-fade-in-up transition-transform duration-300">
        <div className="md:w-1/2 flex justify-center items-center p-4">
          <img
            src={purchaseData.Img}
            alt={purchaseData.Title}
            className="rounded-xl w-full h-auto object-contain"
          />
        </div>
        <div className="md:w-1/2 p-4 flex flex-col justify-center ">
          <h2 className="text-3xl font-bold text-[#ee1665] mb-2">
            {purchaseData.Title}
          </h2>
          <p className="text-gray-600 mb-4 text-lg leading-relaxed">
            {purchaseData.Description?.slice(0, 150)}
            <span className="font-bold text-gray-400 italic ml-1 cursor-pointer hover:text-[#ee1665]">
              ...etc
            </span>
          </p>
          <div></div>
          <div className="mb-4">
            <p className="text-xl text-gray-500 line-through">
              Original Price : {purchaseData?.Price?.toLocaleString?.()}
            </p>
            <p className="text-2xl font-bold text-green-600">
              Offer Price : {discountPrice.toLocaleString?.()} (
              {discountPercentage}% OFF)
            </p>
          </div>
          <ul className="text-sm text-gray-500 space-y-2 mb-6">
            <li>🚚 Free Shipping within 2-4 Days</li>
            <li>🔒 Secure Payment with All Cards & UPI</li>
            <li>✅ 7-Day Easy Return Policy</li>
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <button
              className="bg-[#ee1665] hover:bg-[#d21458] text-white text-lg px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
              onClick={placeOrder}
            >
              <FaShoppingCart className="text-2xl text-white" /> Place Order
            </button>
            <button
              onClick={goBack}
              className="text-[#ee1665] border border-[#ee1665] hover:bg-[#ee1665] hover:text-white text-lg px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
