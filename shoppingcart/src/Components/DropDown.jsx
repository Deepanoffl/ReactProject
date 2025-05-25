import { FaSignOutAlt } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import DropDownItems from "./DropDownItems";

const DropDown = () => {
  return (
    <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20 animate-fadeIn">
      <ul className="py-1 text-sm text-gray-700">
        <DropDownItems title="MyOrders" icon={FaBoxOpen} dropDownType="orders"/>
        <DropDownItems title="Favorites" icon={FaHeart} dropDownType="favorites"/>
        <DropDownItems title="Logout" icon={FaSignOutAlt} dropDownType="logout"/>
      </ul>
    </div>
  );
};

export default DropDown;
