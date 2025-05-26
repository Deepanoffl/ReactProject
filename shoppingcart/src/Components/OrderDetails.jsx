import { ProductContext } from "./ManageProductData";
import { useContext, useEffect, useState } from "react";
import RatingStars from "./RatingStars";
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
    //removing product in myorders
    const removeOrder = myOrders.filter((order) => order.Id != Id);

    localStorage.removeItem(loadKey);

    setMyOrders(removeOrder);
    localStorage.setItem("orderedData", JSON.stringify(removeOrder));

    //removing product id in my my orders to enable purchase again
    const removeOrderId = orderIds.filter((orderId) => orderId != order.Id);

    setOrderIds(removeOrderId);
    localStorage.setItem("orderId", JSON.stringify(removeOrderId));
  };

  useEffect(() => {
    const generatedOrder = generateRandomOrder();
    setOrders(generatedOrder);
  }, []);

  if (!orders) return null; //useEffect will run after ui render so when rendering ui need to stop crash

  return (
    // <div className="bg-white  rounded-3xl shadow-xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-2xl transition-all">
    //   <img
    //     src={order.Img}
    //     alt="product"
    //     className="w-24 h-24 object-contain rounded-xl "
    //   />
    //   <div className="flex-1 w-full">
    //     <h3 className="text-xl font-semibold text-gray-800">
    //       {order.Title.slice(0, 20)}
    //     </h3>
    //     <p className="text-sm mt-2 mb-1 flex flex-wrap gap-x-4 gap-y-1 text-gray-600">
    //       <span className="bg-gray-100 px-2 py-1 rounded-xl font-medium shadow text-gray-700">
    //         Price : {order.originalPrice.toLocaleString()}
    //       </span>
    //       <span className="bg-blue-50 px-2 py-1 rounded-xl font-medium shadow text-blue-700">
    //         Qty : {order.Quantity}
    //       </span>
    //       <span className="bg-green-50 px-2 py-1 rounded-xl font-medium shadow text-green-700">
    //         Offer : {order.offer}%
    //       </span>
    //     </p>

    //     <RatingStars loadKey={loadKey} />
    //     <div className={`flex items-center gap-2 mt-1 ${orders.statusColor}`}>
    //       {orders.icon}
    //       <span className="text-sm font-medium">
    //         {orders.status} {orders.date}
    //       </span>
    //     </div>
    //   </div>
    //   <div className="text-right space-y-2">
    //     <div className="text-xl font-bold text-gray-800">
    //       {order.disCountPrice.toLocaleString()}
    //     </div>
    //     <button
    //       className="px-4 py-2 text-sm rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition shadow cursor-pointer"
    //       onClick={() => handleRemove(order.Id)}
    //     >
    //       Remove
    //     </button>
    //   </div>
    // </div>








//     <div className="bg-white rounded-3xl shadow-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-2xl transition-all">
//   <div className="flex justify-center">
//     <img
//       src={order.Img}
//       alt="product"
//       className="w-24 h-24 object-contain rounded-xl"
//     />
//   </div>

//   <div className="flex-1 w-full flex flex-col justify-between">
//     <h3 className="text-lg font-semibold text-gray-800 mt-1">
//       {order.Title.slice(0, 20)}
//     </h3>

//     <p className="text-sm mt-3 flex flex-wrap gap-x-4 gap-y-2 text-gray-600">
//       <span className="bg-gray-100 px-2 py-1 rounded-xl font-medium shadow text-gray-700">
//         Price : {order.originalPrice.toLocaleString()}
//       </span>
//       <span className="bg-blue-50 px-2 py-1 rounded-xl font-medium shadow text-blue-700">
//         Qty : {order.Quantity}
//       </span>
//       <span className="bg-green-50 px-2 py-1 rounded-xl font-medium shadow text-green-700">
//         Offer : {order.offer}%
//       </span>
//     </p>

//     <RatingStars loadKey={loadKey} />

//     <div className={`flex items-center gap-2 mt-2 ${orders.statusColor}`}>
//       {orders.icon}
//       <span className="text-sm font-medium">
//         {orders.status} {orders.date}
//       </span>
//     </div>
//   </div>

//   <div className="flex flex-col items-end justify-between gap-3">
//     <div className="text-xl font-bold text-gray-800">
//       {order.disCountPrice.toLocaleString()}
//     </div>
//     <button
//       className="px-4 py-2 text-sm rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition shadow cursor-pointer"
//       onClick={() => handleRemove(order.Id)}
//     >
//       Remove
//     </button>
//   </div>
// </div>










<div className="bg-white rounded-3xl shadow-xl p-4 flex flex-col gap-4 hover:shadow-2xl transition-all sm:flex-row sm:items-center sm:gap-6">
  {/* Top Image Full Width for Mobile */}
  <img
    src={order.Img}
    alt="product"
    className="w-full h-40 object-contain rounded-2xl sm:w-24 sm:h-24"
  />

  {/* Info Block */}
  <div className="flex-1 w-full flex flex-col justify-between gap-2.5">
    {/* Title */}
    <h3 className="sm:text-lg font-semibold text-gray-800">{order.Title.slice(0, 25)}</h3>

    {/* Price, Qty, Offer */}
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

    {/* Rating */}
    <RatingStars loadKey={loadKey} />

    {/* Status */}
    <div className={`flex items-center gap-2 ${orders.statusColor}`}>
      {orders.icon}
      <span className="text-sm font-medium">
        {orders.status} {orders.date}
      </span>
    </div>

    {/* Price + Remove Button Row for Mobile */}
    <div className="flex items-center justify-between mt-2">
      <div className="text-lg font-bold text-gray-800">
        ₹ {order.disCountPrice.toLocaleString()}
      </div>
      <button
        className="px-4 py-1 text-sm rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white hover:opacity-90 transition shadow"
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
