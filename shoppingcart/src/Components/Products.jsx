import { ProductContext } from "./ManageProductData";
import { useState, useContext, useEffect } from "react";
import Image from "./Image";
import Button from "./Button";
import { FaHeart } from "react-icons/fa";

const Products = ({ product }) => {
  //getting usestate data from central storage
  const {
    count,
    setCount,

    cartProduct,
    setCartProduct,

    addedProductIds,
    setAddedProductIds,

    setExpand,
    setExpandData,

    total,
    setTotal,

    favorites,
    setFavorites,

    setIsCartOpen,
  } = useContext(ProductContext);

  //creating a unique key for each product in local storage to store like
  const loadLike = `likedProduct-${product.id}`;

  //showing msg in product btn
  const [cartAdd, setCartAdd] = useState(" Add Cart");

  //changing heart icon color
  const [liked, setLiked] = useState(() => {
    const getLike = localStorage.getItem(loadLike);
    return getLike === "true" ? true : false;
  });

  //toggling heart icon
  const [clicked, setClicked] = useState(false);

  //style for button component
  const btnStyle =
    " px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer text-sm sm:text-lg w-full";

  //style for img component
  const imgStyle = "w-32 h-32 object-contain mb-4 cursor-pointer ";

  const icon = "productbtn";

  //converting dollar amount into indian rupees
  const usdAmount = product.price;
  const exchangeRate = 82;
  const inrAmount = Math.floor(usdAmount * exchangeRate);

  //functions

  const heartToggle = () => {
    setClicked(true);

    setTimeout(() => setClicked(false), 300);

    const storeLike = !liked;

    if (storeLike) {
      setLiked(storeLike);
      localStorage.setItem(loadLike, JSON.stringify(storeLike));

      const favoriteDetails = [
        ...favorites,
        {
          Id: product.id,
          Img: product.image,
          Title: product.title,
          Description: product.description,
          Price: inrAmount,
        },
      ];

      setFavorites(favoriteDetails);
      localStorage.setItem("favorites", JSON.stringify(favoriteDetails));
    } else {
      setLiked(storeLike);
      localStorage.removeItem(loadLike);

      const removeFavorites = favorites.filter(
        (favoriteItem) => favoriteItem.Id != product.id
      );

      setFavorites(removeFavorites);
      localStorage.setItem("favorites", JSON.stringify(removeFavorites));
    }
  };

  const openExpand = () => {
    const productExpandData = {
      Id: product.id,
      Img: product.image,
      Title: product.title,
      Description: product.description,
      Price: inrAmount,
    };

    setExpandData(productExpandData);
    localStorage.setItem("expandData", JSON.stringify(productExpandData));

    setExpand(true);
    localStorage.setItem("expand", "open");
  };

  const addProductDetails = () => {
    if (!addedProductIds.includes(product.id)) {
      const countProduct = count + 1;

      setCount(countProduct);
      localStorage.setItem("cartCount", countProduct);

      const productDetails = {
        Id: product.id,
        Img: product.image,
        Title: product.title.slice(0, 20),
        Price: inrAmount,
        Description: product.description.slice(0, 150),
      };

      const storingCartDetails = [...cartProduct, productDetails];

      setCartProduct(storingCartDetails);
      localStorage.setItem("cartProduct", JSON.stringify(storingCartDetails));

      const addProductId = [...addedProductIds, product.id];

      setAddedProductIds(addProductId);
      localStorage.setItem("productId", JSON.stringify(addProductId));

      const updatedTotal = [
        ...total,
        {
          Id: product.id,
          price: inrAmount,
          quantity: 1,
        },
      ];

      setTotal(updatedTotal);
      localStorage.setItem("cartTotal", JSON.stringify(updatedTotal));
    } else {
      setIsCartOpen(true);
      localStorage.setItem("cartModal", "open");
    }
  };

  useEffect(() => {
    if (addedProductIds.includes(product.id)) {
      setCartAdd("Go To Cart");
    } else {
      setCartAdd("Add Cart");
    }
  }, [addedProductIds]);

  return (
    <>
      <div
        data-category={product.category}
        className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition duration-300"
      >
        <div>
          {/*rendering image component */}
          <Image
            src={product.image}
            alt={product.title}
            className={imgStyle}
            onClick={openExpand}
          />
        </div>
        <h3 className="text-sm sm:text-lg font-semibold text-center mb-2">
          {product.title.slice(0, 20)}
        </h3>
        <p className="text-green-600 font-bold text-center text-sm sm:text-base mb-3">
          {inrAmount.toLocaleString()}
        </p>
        <div className=" w-3/5">
          {/* rendering btn component */}
          <Button
            btnText={cartAdd}
            className={btnStyle}
            iconOrText={icon}
            onClick={addProductDetails}
          />
        </div>
        <div className="absolute right-5 top-3 w-9 h-9 border border-gray-300 shadow-sm bg-white rounded-full  flex items-center justify-center">
          {" "}
          <span
            className={`sm:text-xl  cursor-pointer transition-all duration-300 ease-out text-gray-300 ${
              liked ? "text-red-500" : "text-gray-300"
            } ${clicked ? "scale-125" : "scale-100"}`}
            onClick={heartToggle}
          >
            <FaHeart />
          </span>
        </div>
      </div>
    </>
  );
};

export default Products;
