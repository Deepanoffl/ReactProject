import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ManageProductData";
import { useContext } from "react";

const FavoriteItem = ({ productDetails }) => {
  //for page routing
  const navigate = useNavigate();

  //getting usestate data from central storage
  const { setExpand, setExpandData } = useContext(ProductContext);

  //functions

  const purchase = () => {
    const storeDetails = { ...productDetails };

    setExpandData(storeDetails);
    localStorage.setItem("expandData", JSON.stringify(storeDetails));

    setExpand(true);
    localStorage.setItem("expand", "open");

    navigate("/landing");
  };

  return (
    <div
      key={productDetails.Id}
      className="bg-white border border-gray-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-4 relative cursor-pointer"
    >
      <img
        src={productDetails.Img}
        alt={productDetails.Title}
        className="w-full h-40 object-contain rounded-2xl mb-4"
        onClick={purchase}
      />
    </div>
  );
};

export default FavoriteItem;
