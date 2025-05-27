import { ProductContext } from "./ManageProductData";
import { useContext, useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import OrderLimit from "./OrderLimit";
import { transformModal } from "./HelperFn/modalAnimation";
import { hideOverflow } from "./HelperFn/hideOverflow";
import { FaTimes } from "react-icons/fa";

const CartModal = () => {
  //getting usestate data from central storage
  const {
    isCartOpen,
    setIsCartOpen,

    cartProduct,

    total,

    orderLimitMsg,
    setOrderLimitMsg,
  } = useContext(ProductContext);

  //checking each cart product quantity <5 & >1 
  const [trackQuantity, setTrackQuantity] = useState(false);

  //checking the product is already buyed or not
  const [trackMsg, setTrackMsg] = useState("");

  const cartTotal = total.reduce((acc, value) => acc + value.price, 0);

  //functions

  const closeCart = () => {
    setIsCartOpen(false);
    localStorage.removeItem("cartModal");
  };

  useEffect(() => {
    hideOverflow(isCartOpen);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/85 w-screen h-screen flex justify-center items-center z-50 backdrop  backdrop-blur-sm "
        onClick={transformModal}
      >
       <div className="relative w-full h-full sm:h-fit sm:w-[90%] sm:max-w-xl bg-gray-500 backdrop-blur-lg sm:rounded-2xl shadow-2xl py-8 sm:p-8 animate-fade-in-up overflow-x-hidden modal-box transition-transform duration-300">


          <button
            onClick={closeCart}
            className="absolute top-4 right-4 text-white sm:text-lg cursor-pointer hover:bg-white hover:text-black p-1.5 rounded  transition-all duration-300 ease-in-out"
          >
            <FaTimes />
          </button>

          <h2 className="text-xl sm:text-2xl font-semibold text-center text-white  mb-3 border-b pb-3 ">
            My  Cart
          </h2>

          {cartProduct.length === 0 ? (
            <p className="text-white flex justify-center items-center min-h-[80vh] sm:min-h-[0vh] ">
              Oops ! Your cart is empty{" "}
            </p>
          ) : (
            <>
              <div className="space-y-4 sm:max-h-[350px] overflow-y-auto p-3">
                {cartProduct.map((productItem, index) => (
                  <CartProduct
                    productData={productItem}
                    setTrackQuantity={setTrackQuantity}
                    setMsg={setTrackMsg}
                    key={index}
                  />
                ))}
              </div>

              <div className="mt-4 mx-3 sm:mx-0 flex items-center justify-between bg-white p-4 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3">
                  <i className="fas fa-shopping-cart text-indigo-600 text-xl"></i>
                  <span className="sm:text-lg font-semibold uppercase text-gray-700 tracking-wide">
                    Cart Total
                  </span>
                </div>
                <p className="text-lg font-bold text-green-600 ">
                  {cartTotal.toLocaleString()}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {orderLimitMsg && <OrderLimit setFn={setOrderLimitMsg} msg={trackMsg} />}
      {trackQuantity && <OrderLimit setFn={setTrackQuantity} msg={trackMsg} />}
    </>
  );
};

export default CartModal;
