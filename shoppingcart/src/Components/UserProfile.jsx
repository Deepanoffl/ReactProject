import { ProductContext } from "./ManageProductData";
import { useContext, useState } from "react";
import DropDown from "./DropDown";
import { FiChevronDown } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

const UserProfile = () => {
  //open or close the dropdown component
  const [showDropdown, setShowDropdown] = useState(false);

  //getting usestate data from central storage
  const { userName } = useContext(ProductContext);

  return (
    <>
      <div className="relative md:w-fit w-1/2  md:mb-0 mb-5.5 bg-white rounded-full">
        <div className="flex justify-between items-center gap-2 px-3 py-1 bg-white/70 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm text-white ">
              <FaUser />
            </div>
            <h4
              className="text-sm sm:text-md
             font-semibold text-gray-800 capitalize "
            >
              {userName}
            </h4>
          </div>
          <div>
            <FiChevronDown
              className=" text-lg cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
          </div>
        </div>
        {showDropdown && <DropDown />}
      </div>
    </>
  );
};

export default UserProfile;
