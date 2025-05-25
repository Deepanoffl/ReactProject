import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";


const PlaceOrder = () => {
  //for page routing
  const navigate = useNavigate();

  //showing animation for placing order
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  //functions

  const trackOrder = () => {
    navigate("/myorders");
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfirmation(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 relative overflow-hidden">
      {!showConfirmation ? (
        <div className="text-center text-white animate-fadein space-y-6 relative">
          <div className="relative w-28 h-28 mx-auto  flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin-slow blur-lg opacity-40"></div>

            <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-20 animate-pulse"></div>

            <FaTruckMoving className="text-white text-5xl drop-shadow-xl animate-truck-float" />

           <div className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 space-x-1 flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="block w-2 h-2 bg-cyan-400 rounded-full animate-glow-trail"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-md text-center animate-fadein">
          <div className="relative w-28 h-28 mx-auto  flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin-slow blur-lg opacity-40"></div>

            <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-20 animate-pulse"></div>

            <FaTruckMoving className="text-white text-5xl drop-shadow-xl animate-truck-float" />
             <div className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 space-x-1 flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="block w-2 h-2 bg-cyan-400 rounded-full animate-glow-trail"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
          <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl shadow-lg text-white animate-rise">
            <h2 className="text-2xl font-bold mt-4 text-center ">
              Order Placed ! ✨
            </h2>
            <button
              className="mt-5 px-6 py-3 bg-sky-600 hover:bg-sky-700 transition duration-300 text-white rounded-lg shadow-lg tracking-wide cursor-pointer"
              onClick={trackOrder}
            >
              <div className="flex items-center gap-3">
                <div>
                  <FaBoxOpen />
                </div>
                <div>Track Order</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;




























































// import { useEffect, useState } from "react";
// import { FaTruckMoving, FaBoxOpen } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";


// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const trackOrder = () => {
//     navigate("/myorders");
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => setShowConfirmation(true), 4000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 relative overflow-hidden">
//       {!showConfirmation ? (
//         <div className="text-center text-white animate-fadein space-y-6 relative">
//           <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
//             <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin-slow blur-lg opacity-40"></div>
//             <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-20 animate-pulse"></div>
//             <FaTruckMoving className="text-white text-5xl drop-shadow-xl animate-truck-ride" />
//             <div className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 space-x-1 flex">
//               {[...Array(5)].map((_, i) => (
//                 <span
//                   key={i}
//                   className="block w-2 h-2 bg-cyan-400 rounded-full animate-glow-trail"
//                   style={{ animationDelay: `${i * 0.15}s` }}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="space-y-2 relative z-10">
//             <h2 className="text-xl tracking-wider font-semibold animate-shimmer">
//               Placing your Order...
//             </h2>
//           </div>
//         </div>
//       ) : (
//         <div className="relative z-10 w-full max-w-md text-center animate-fadein">
//           <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
//             <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin-slow blur-lg opacity-40"></div>
//             <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-20 animate-pulse"></div>
//             <FaTruckMoving className="text-white text-5xl drop-shadow-xl animate-truck-ride" />
//             <div className="absolute left-[-24px] top-1/2 transform -translate-y-1/2 space-x-1 flex">
//               {[...Array(5)].map((_, i) => (
//                 <span
//                   key={i}
//                   className="block w-2 h-2 bg-cyan-400 rounded-full animate-glow-trail"
//                   style={{ animationDelay: `${i * 0.15}s` }}
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl shadow-lg text-white animate-pop-bounce">
//             <h2 className="text-2xl font-bold mt-4 text-center">
//               Order Placed! ✨
//             </h2>
//             <button
//               className="mt-5 px-6 py-3 bg-sky-600 hover:bg-sky-700 transition duration-300 text-white rounded-lg shadow-lg tracking-wide cursor-pointer"
//               onClick={trackOrder}
//             >
//               <div className="flex items-center gap-3">
//                 <FaBoxOpen />
//                 <div>Track Order</div>
//               </div>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlaceOrder;
