import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ManageProductData";
import { useContext, useState, useEffect } from "react";
import Image from "./Image";
import Button from "./Button";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { jsx } from "react/jsx-runtime";

const CartProduct = ({ productData, setTrackQuantity, setMsg }) => {
  //for page routing
  const navigate = useNavigate();

  //getting usestate data from central storage
  const {
    cartProduct,
    setCartProduct,

    setCount,
    count,

    addedProductIds,
    setAddedProductIds,

    total,
    setTotal,

    setPurchaseData,

    orderIds,
    setOrderIds,

    setOrderLimitMsg,
  } = useContext(ProductContext);

  //loading animation for buy now btn
  const [loading, setLoading] = useState(false);

  //creating key to storing cart product quantity in local storage
  const setKey1 = `cart_productQuantity-${productData.Id}`;
  const setKey2 = `cart_productRate-${productData.Id}`;

  const icon = "cartbtn";

  const originalPrice = productData.Price;

  // Find current quantity and price from total state for particular product
  const thisProduct = total.find((item) => item.Id === productData.Id);
  const quantity = thisProduct?.quantity;
  const productRate = thisProduct?.price;

  //setting the quantity to the state
  const [loadQuantity, setLoadQuantity] = useState(1);

  //setting the price to the state
  const [loadProductRate, setLoadProductRate] = useState(productRate);

  //style for spinner component
  const spin =
    "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin";

  //functions

  const updateQuantity = (type) => {
    let newQty = loadQuantity;

    if (type === "inc") {
      if (loadQuantity < 5) {
        newQty = loadQuantity + 1;
      } else {
        setTrackQuantity(true);
        setMsg("Max Quantity Reached");
        return;
      }
    } else if (type === "dec") {
      if (loadQuantity > 1) {
        newQty = loadQuantity - 1;
      } else {
        setTrackQuantity(true);
        setMsg("Minimum One Quantity");
        return;
      }
    }

    setLoadQuantity(newQty);
    localStorage.setItem(setKey1, newQty);

    const newPrice = newQty * originalPrice;

    setLoadProductRate(newPrice);
    localStorage.setItem(setKey2, newPrice);

    const updatedTotal = total.map((item) =>
      item.Id === productData.Id
        ? { ...item, quantity: newQty, price: newQty * originalPrice }
        : item
    );

    setTotal(updatedTotal);
    localStorage.setItem("cartTotal", JSON.stringify(updatedTotal));
  };

  const purchase = () => {
    if (!orderIds.includes(productData.Id)) {
      setLoading(true);

      setTimeout(() => {
        const cartProductData = {
          Id: productData.Id,
          Img: productData.Img,
          Price: loadProductRate,
          Title: productData.Title,
          Description: productData.Description,
          Quantity: loadQuantity,
          originalPrice,
        };

        setPurchaseData(cartProductData);
        localStorage.setItem("purchaseData", JSON.stringify(cartProductData));

        const tempStoreIds = [...orderIds, productData.Id];

        setOrderIds(tempStoreIds);
        localStorage.setItem("orderId", JSON.stringify(tempStoreIds));

        navigate("/purchase");

        setLoading(false);
      }, 500);
    } else {
      setOrderLimitMsg(true);
      setMsg(
        "You’ve already purchased this product. Check your orders for details."
      );
    }
  };

  const deleteProduct = (productId) => {
    const countProduct = count - 1;

    setCount(countProduct);
    localStorage.setItem("cartCount", countProduct);

    const filteredProduct = cartProduct.filter(
      (product) => product.Id !== productId
    );

    setCartProduct(filteredProduct);
    localStorage.setItem("cartProduct", JSON.stringify(filteredProduct));

    const removeProductId=addedProductIds.filter((id) => id !== productId);

    setAddedProductIds(removeProductId);
    localStorage.setItem("productId",JSON.stringify(removeProductId));

    const updatedTotal = total.filter((product) => product.Id !== productId);
    
    setTotal(updatedTotal);
    localStorage.setItem("cartTotal", JSON.stringify(updatedTotal));

    localStorage.removeItem(`cart_productQuantity-${productId}`);
    localStorage.removeItem(`cart_productRate-${productId}`);
  };

  // Sync quantity & price when product changes
  useEffect(() => {
    //when page re-loads getting data from local storage if not data in local storage load it with initial values
    const reloadQuantity = localStorage.getItem(setKey1);
    setLoadQuantity(reloadQuantity ? parseInt(reloadQuantity) : quantity);

    //when page re-loads getting data from local storage if not data in local storage load it with initial values
    const reloadProductRate = localStorage.getItem(setKey2);
    setLoadProductRate(
      reloadProductRate ? parseInt(reloadProductRate) : productRate
    );
  }, [productData.Id]);

  return (
    <div className="flex items-center justify-between  gap-4 bg-white shadow-sm rounded-xl p-3 pb-4">
      <div className="flex  items-center gap-2 flex-1">
        {/* rendering img component */}
        <Image
          src={productData.Img}
          alt={productData.Title}
          className="w-16 h-16 object-contain rounded-md shrink-0"
        />

        <div className="w-full">
          <p className="text-gray-700  font-medium truncate max-[500px]:text-center">
            {productData.Title}
          </p>

          <div className="text-green-600 font-bold flex justify-between items-center gap-4 bg-gray-300 px-3 py-2 rounded-lg shadow-sm my-1.5">
            <div className="flex items-center gap-2 border-gray-300 rounded-md px-2 py-1 bg-white">
              <button
                onClick={() => updateQuantity("dec")}
                className="text-lg font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200"
              >
                –
              </button>

              <span className="w-8 text-center text-sm text-gray-800">
                {loadQuantity}
              </span>

              <button
                onClick={() => updateQuantity("inc")}
                className="text-lg font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>

            <div className="text-green-600 text-base ">
              {loadProductRate.toLocaleString()}
            </div>
          </div>

          <div className="w-full max-[500px]:flex max-[500px]:justify-center">
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white mt-3 font-semibold py-1 px-2 rounded flex items-center gap-2 shadow-md transition duration-300 w-fit cursor-pointer "
              onClick={purchase}
            >
              {loading ? (
                <Spinner animate={spin} />
              ) : (
                <>
                  <FontAwesomeIcon icon={faBolt} className="rounded-full" />
                  Buy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div>
        <Button
          onClick={() => deleteProduct(productData.Id)}
          iconOrText={icon}
        />
      </div>
    </div>
  );
};

export default CartProduct;
