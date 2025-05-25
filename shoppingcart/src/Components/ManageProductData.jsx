import { createContext } from "react";
import { useState } from "react";

const ProductContext = createContext(); //creating createcontext hook act as a central storage

const ManageProductData = (components) => {
  //components using the ManageProductData will come as props (components)
  //handling login,signup and forgetpassword activity
  const [users, setUsers] = useState(() => {
    const loadUsers = localStorage.getItem("allUsers");
    return loadUsers
      ? JSON.parse(loadUsers)
      : [{ username: "deepan", password: "123" }];
  });

  //storing the username from login to display in landing page
  const [userName, setUserName] = useState(() => {
    const loadUserName = localStorage.getItem("userName");
    return loadUserName ? loadUserName : "";
  });

  //storing data from the API
  const [renderedData, setRenderedData] = useState([]);

  //again storing the same data from API to filter products when using searchbar
  const [originalData, setOriginalData] = useState([]);

  //checking any network error
  const [loadingCheck, setLoadingCheck] = useState(false);

  //providing the error msg for loading issue
  const [loadingError, setLoadingError] = useState("");

  //counting products in cart
  const [count, setCount] = useState(() => {
    const loadCount = localStorage.getItem("cartCount");
    return loadCount ? parseInt(loadCount) : 0;
  });

  //open or close the cart modal
  const [isCartOpen, setIsCartOpen] = useState(() => {
    const checkCartModal = localStorage.getItem("cartModal");
    return checkCartModal === "open" ? true : false;
  });

  //adding the productdata in cartproduct like array of objects
  const [cartProduct, setCartProduct] = useState(() => {
    const loadCartData = localStorage.getItem("cartProduct");
    return loadCartData ? JSON.parse(loadCartData) : [];
  });

  //calculate the products total in cart modal
  const [total, setTotal] = useState(() => {
    const loadTotal = localStorage.getItem("cartTotal");
    return loadTotal ? JSON.parse(loadTotal) : [];
  });

  // check to add product to cart or open cart modal if already product exist in cart
  const [addedProductIds, setAddedProductIds] = useState(() => {
    const loadProductsId = localStorage.getItem("productId");
    return loadProductsId ? JSON.parse(loadProductsId) : [];
  });

  //open or close the expand product modal
  const [expand, setExpand] = useState(() => {
    const getExpand = localStorage.getItem("expand");
    return getExpand === "open" ? true : false;
  });

  //showing the full product details
  const [expandData, setExpandData] = useState(() => {
    const getExpandData = localStorage.getItem("expandData");
    return getExpandData ? JSON.parse(getExpandData) : {};
  });

  //storing the product details to show in purchase page
  const [purchaseData, setPurchaseData] = useState(() => {
    const loadPurchaseData = localStorage.getItem("purchaseData");
    return loadPurchaseData ? JSON.parse(loadPurchaseData) : {};
  });

  //storing the ordered products
  const [myOrders, setMyOrders] = useState(() => {
    const loadOrders = localStorage.getItem("orderedData");
    return loadOrders ? JSON.parse(loadOrders) : [];
  });

  // prevent buy again option when the product is already in myorder page to avoid duplicate product
  const [orderIds, setOrderIds] = useState(() => {
    const loadOrderIds = localStorage.getItem("orderId");
    return loadOrderIds ? JSON.parse(loadOrderIds) : [];
  });

  //when a product in cart tracking the product quantity to show msg and also handle msg to prevent buy again option when the product is already in myorder page
  const [orderLimitMsg, setOrderLimitMsg] = useState(false);

  //storing favorite products
  const [favorites, setFavorites] = useState(()=>{
    const loadFavorites=localStorage.getItem("favorites");
    return loadFavorites ? JSON.parse(loadFavorites) : [];
  });

  return (
    <ProductContext.Provider
      value={{
        users,
        setUsers,

        userName,
        setUserName,

        renderedData,
        setRenderedData,

        originalData,
        setOriginalData,

        loadingCheck,
        setLoadingCheck,

        loadingError,
        setLoadingError,

        count,
        setCount,

        isCartOpen,
        setIsCartOpen,

        cartProduct,
        setCartProduct,

        total,
        setTotal,

        addedProductIds,
        setAddedProductIds,

        expand,
        setExpand,

        expandData,
        setExpandData,

        purchaseData,
        setPurchaseData,

        myOrders,
        setMyOrders,

        orderIds,
        setOrderIds,

        orderLimitMsg,
        setOrderLimitMsg,

        favorites,
        setFavorites,
      }}
    >
      {components.children}
    </ProductContext.Provider>
  );
};

export default ManageProductData;
export { ProductContext };
