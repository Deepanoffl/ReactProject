import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Spinner from "./Spinner";

// icon: Icon here i renamed the icon prop to Icon while destructuring
const DropDownItems = ({ title, icon: Icon, dropDownType }) => {
  //for page routing
  const navigate = useNavigate();

  //checking value
  const [loadingState, setLoadingState] = useState("");

  const spin =
    "w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin cursor-pointer";

  const handleAction = (type) => {
    setLoadingState(type);

    setTimeout(() => {
      if (type === "logout") {
        navigate("/");
      } else if (type === "orders") {
        navigate("/myorders");
      }
      else if(type === "favorites"){
        navigate("/favorites");
      }
      setLoadingState("");
    }, 1000);
  };

  return (
    <li
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-center"
      onClick={() => handleAction(dropDownType)}
    >
      {loadingState === dropDownType ? (
        <Spinner animate={spin} />
      ) : (
        <div className="flex items-center gap-2 w-full">
          <Icon />
          <span className="text-sm sm:text-md font-semibold text-gray-800 capitalize">{title}</span>
        </div>
      )}
    </li>
  );
};

export default DropDownItems;
