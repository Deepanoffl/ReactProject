import { useNavigate } from "react-router-dom";
import { ProductContext } from "../ManageProductData";
import { useContext } from "react";
import FavoriteItem from "../FavoriteItem";
import { Home } from "lucide-react";

const Favorites = () => {
  //for page routing
  const navigate = useNavigate();
  const { favorites } = useContext(ProductContext);
  // console.log(favorites);
  

  const goHome = () => {
    navigate("/landing");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white py-5 px-4 product-container-animation">
      <div className="flex items-center justify-between mb-10 px-2">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-wide">
          Favorites
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
        className={`border p-7 rounded-3xl border-gray-200 shadow-md transition-all duration-500 ${
          favorites.length === 0
            ? "flex justify-center items-center  min-h-[80vh]"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  "
        }`}
      >
        {favorites.length > 0 ? (
          favorites.map((item,index) => (
            <FavoriteItem productDetails={item} key={index} />
          ))
        ) : (
          <div className="text-center">
            <p className="sm:text-xl font-semibold text-gray-500 tracking-wide">
              Oops! No Favorites.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
