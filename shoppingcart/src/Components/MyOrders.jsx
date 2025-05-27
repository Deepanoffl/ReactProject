import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ManageProductData";
import { useContext } from "react";
import OrderDetails from "./OrderDetails";
import { Home } from "lucide-react";

const MyOrders = () => {
  //for page routing
  const navigate = useNavigate();

  //getting usestate data from central storage
  const { myOrders, setExpand, setIsCartOpen, setPurchaseData } =
    useContext(ProductContext);

  //function

  const goHome = () => {
    setPurchaseData({});
    localStorage.removeItem("purchaseData");

    setIsCartOpen(false);
    localStorage.removeItem("cartModal");

    setExpand(false);
    localStorage.removeItem("expand");

    navigate("/landing");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 product-container-animation">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-wide">
          My Orders
        </h2>
        <button
          className="flex items-center sm:text-lg gap-2 text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out cursor-pointer"
          onClick={goHome}
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
      <div
        className={`rounded-3xl border border-gray-200 shadow-md transition-all duration-500 ${
          myOrders.length === 0
            ? "flex justify-center items-center w-full min-h-[80vh] bg-gray-50"
            : "space-y-6 bg-white p-6"
        }`}
      >
        {myOrders.length > 0 ? (
          myOrders.map((order) => <OrderDetails order={order} key={order.Id} />)
        ) : (
          <div className="text-center">
            <p className="sm:text-xl font-semibold text-gray-500 tracking-wide">
              Oops! No orders found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
