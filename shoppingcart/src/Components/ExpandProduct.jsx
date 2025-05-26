import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ManageProductData";
import { useContext, useEffect, useState } from "react";
import Image from "./Image";
import OrderLimit from "./OrderLimit";
import Spinner from "./Spinner";
import { transformModal } from "./HelperFn/modalAnimation";
import { hideOverflow } from "./HelperFn/hideOverflow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FaTimes } from "react-icons/fa";

const ExpandProduct = () => {
  //for page routing
  const navigate = useNavigate();

  //getting usestate data from central storage
  const {
    expand,
    setExpand,

    expandData,
    setExpandData,

    setPurchaseData,

    orderIds,
    setOrderIds,

    orderLimitMsg,
    setOrderLimitMsg,
  } = useContext(ProductContext);

  //loading animation
  const [loading, setLoading] = useState(false);

  //style for img component
  const imgStyle =
    "max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105";

  //style for spin component
  const spin =
    "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin";

  //functions

  const closeExpand = () => {
    setExpandData({});
    localStorage.removeItem("expandData");

    setExpand(false);
    localStorage.removeItem("expand");
  };

  const purchase = () => {
    setLoading(true);

    setTimeout(() => {
      if (!orderIds.includes(expandData.Id)) {
        const expandProductDetails = {
          ...expandData,
          originalPrice: expandData.Price,
          Quantity: 1,
        };

        setPurchaseData(expandProductDetails);
        localStorage.setItem(
          "purchaseData",
          JSON.stringify(expandProductDetails)
        );

        const tempStoreIds = [...orderIds, expandData.Id];
        setOrderIds(tempStoreIds);
        localStorage.setItem("orderId", JSON.stringify(tempStoreIds));

        navigate("/purchase");
      } else {
        setOrderLimitMsg(true);
      }
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    hideOverflow(expand);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expand]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop backdrop-blur-md flex items-center justify-center px-4"
        onClick={transformModal}
      >
        <div className="modal-box relative w-full max-w-5xl h-auto sm:h-[400px]  text-white rounded-2xl overflow-hidden shadow-2xl flex flex-col sm:flex-row animate-fade-in-up transition-transform duration-300">
          <button
            className="absolute top-4 right-6 p-1.5 hover:bg-gray-300 transition-all duration-300 ease-in-out rounded text-lg md:text-white text-gray-400 hover:text-black cursor-pointer"
            onClick={closeExpand}
          >
            <FaTimes />
          </button>
          <div className="w-full sm:w-1/2 h-64 sm:h-full bg-white flex items-center justify-center p-4">
            {/* rendering img component */}
            <Image className={imgStyle} src={expandData.Img} alt="product" />
          </div>
          <div className="flex flex-col justify-start p-6 sm:p-8 sm:w-1/2 overflow-auto max-h-[400px] space-y-4 bg-gray-900">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-400 break-words">
              {expandData.Title}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-200 break-words">
              {expandData.Description}
            </p>
            <button
              className="bg-orange-600 hover:bg-orange-700 font-semibold py-2 px-4 rounded flex items-center gap-2 shadow-md transition duration-300 w-fit cursor-pointer"
              onClick={purchase}
            >
              {loading ? (
                <Spinner animate={spin} />
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faBolt}
                    className="text-white rounded-full p-1"
                  />
                  Buy 
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {orderLimitMsg && (
        <OrderLimit
          setFn={setOrderLimitMsg}
          msg="You’ve already purchased this product. Check your orders for details."
        />
      )}
    </>
  );
};

export default ExpandProduct;
