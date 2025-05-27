import { ProductContext } from "./ManageProductData";
import { useState, useContext } from "react";
import UserProfile from "./UserProfile";
import img from "/amazonlogo.png";
import { FaShoppingCart, FaBars } from "react-icons/fa";

const Header = () => {
  //getting usestate data from central storage
  const { count, setRenderedData, originalData, setIsCartOpen } =
    useContext(ProductContext);

  //searching products in input
  const [search, setSearch] = useState("");

  //making responsive design at smaller screen
  const [mobileMenu, setMobileMenu] = useState(false);

  //functions

  const handleInput = (evt) => {
    const searchTerm = evt.target.value.toLowerCase();
    setSearch(searchTerm);

    if (searchTerm === "") {
      setRenderedData(originalData);
      return;
    }

    const newUpdatedData = originalData.filter((product) =>
      product.title.toLowerCase().trim().includes(searchTerm)
    );
    
    setRenderedData(newUpdatedData);
  };

  const openCart = () => {
    setIsCartOpen(true);
    localStorage.setItem("cartModal", "open");
  };

  return (
    <header className="shadow-md flex justify-between items-center px-6  sticky top-0 z-10 backdrop-blur-md bg-white/70">
      <div className="logo">
        <img src={img} alt="Logo"  className="cursor-pointer sm:w-30 w-25"  />
      </div>

      <button
        className={`md:hidden text-xl p-1.5 rounded transition-all duration-100 ease-in-out cursor-pointer 
        border-black ${mobileMenu ? "border-3" : ""}`}
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <FaBars className="text-md"/>
      </button>

      <div
        className={`
        md:p-0 md:static md:flex md:items-center md:gap-4
        absolute  top-full left-0 right-0 p-4 z-50  bg-purple-300 backdrop backdrop-blur-md 
        md:bg-transparent 
        transition-all duration-300 ease-in-out transform 
        ${
          mobileMenu
            ? "max-h-96 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95 pointer-events-none"
        } 
        md:max-h-full md:opacity-100 md:scale-100 md:pointer-events-auto
        `}
      >
        <div className="md:mb-0 mb-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="🔍 Search Products"
            className="w-full px-4 py-2 text-sm rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out bg-white placeholder-gray-400 "
            value={search}
            onChange={handleInput}
          />
        </div>
        {/* loading username and page routing */}
        <UserProfile />

        <div className="relative pr-2 cursor-pointer text-gray-700">
          <FaShoppingCart
            className="text-2xl md:text-black text-white"
            onClick={openCart}
          />
          <span className="absolute md:-top-4 md:-right-1 bg-red-500 text-white text-center text-xs rounded-full w-5 h-5 flex items-center justify-center -top-4 left-3">
            {count}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
