import { useEffect, useState } from "react";

const OrderLimit = ({ setFn, msg }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => {
      setFn(false);
    }, 50);
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-50">
      <div
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-out ${
          animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        } bg-black text-white rounded-2xl px-6 py-4 shadow-xl w-[90%] max-w-md`}
      >
        <p className="text-center text-base mb-4">
         {msg}
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="bg-pink-600 text-white cursor-pointer px-5 py-1.5 rounded-xl hover:bg-pink-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderLimit;
