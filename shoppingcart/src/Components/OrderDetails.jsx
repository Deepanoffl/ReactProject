import { ProductContext } from "./ManageProductData";
import { useContext, useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { updateLocalStg } from "./HelperFn/updateLocalStorage";
import { PackageCheck, Truck, ShoppingBag } from "lucide-react";

const OrderDetails = ({ order }) => {
  //getting usestate data from central storage
  const { myOrders, setMyOrders, orderIds, setOrderIds } =
    useContext(ProductContext);

  //storing random delivery details
  const [orders, setOrders] = useState(null);

  const loadKey = `rating-${order.Id}`;

  //  Define possible random values
  const statuses = [
    {
      status: "Delivered",
      color: "text-green-600",
      icon: <PackageCheck className="w-4 h-4" />,
    },
    {
      status: "Out for Delivery",
      color: "text-orange-500",
      icon: <Truck className="w-4 h-4" />,
    },
    {
      status: "Order Placed",
      color: "text-pink-600",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
  ];

  const dates = [
    "May 15, 2025",
    "May 18, 2025",
    "May 21, 2025",
    "May 10, 2025",
    "May 5, 2025",
  ];

  //  Function to get random item
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  //  Generate order with random data
  const generateRandomOrder = () => {
    const randomStatus = getRandomItem(statuses);

    return {
      status: randomStatus.status,
      statusColor: randomStatus.color,
      icon: randomStatus.icon,
      date: getRandomItem(dates),
    };
  };

  const handleRemove = (Id) => {
    updateLocalStg(loadKey, null, false);

    //removing product in myorders
    const removeOrder = myOrders.filter((order) => order.Id != Id);

    setMyOrders(removeOrder);
    updateLocalStg("orderedData", removeOrder);

    //removing product id in my my orders to enable purchase again
    const removeOrderId = orderIds.filter((orderId) => orderId != order.Id);

    setOrderIds(removeOrderId);
    updateLocalStg("orderId", removeOrderId);
  };

  useEffect(() => {
    const generatedOrder = generateRandomOrder();
    setOrders(generatedOrder);
  }, []);

  if (!orders) return null; //useEffect will run after ui render so when rendering ui need to stop crash

  return (
    <div className="bg-white rounded-3xl shadow-xl p-4 flex flex-col gap-4 hover:shadow-2xl transition-all sm:flex-row sm:items-center sm:gap-6">
      <img
        src={order.Img}
        alt="product"
        className="w-full h-35 object-contain rounded-2xl sm:w-24 sm:h-24"
      />
      <div className="flex-1 w-full flex flex-col justify-between gap-2.5">
        <h3 className="sm:text-lg font-semibold text-gray-800">
          {order.Title.slice(0, 25)}
        </h3>
        <div className="flex flex-wrap gap-2.5 text-sm text-gray-600">
          <span className="bg-gray-100 px-2 py-1 rounded-xl font-medium shadow text-gray-700">
            Price : {order.originalPrice.toLocaleString()}
          </span>
          <span className="bg-blue-50 px-2 py-1 rounded-xl font-medium shadow text-blue-700">
            Qty : {order.Quantity}
          </span>
          <span className="bg-green-50 px-2 py-1 rounded-xl font-medium shadow text-green-700">
            Offer : {order.offer}%
          </span>
        </div>
        <RatingStars loadKey={loadKey} />
        <div className={`flex items-center gap-2 ${orders.statusColor}`}>
          {orders.icon}
          <span className="text-sm font-medium">
            {orders.status} {orders.date}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="sm:text-lg font-bold text-gray-800">
            ₹ {order.disCountPrice.toLocaleString()}
          </div>
          <button
            className="px-4 py-1 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white hover:opacity-90 transition shadow cursor-pointer"
            onClick={() => handleRemove(order.Id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
