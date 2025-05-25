import axios from "axios";
import { ProductContext } from "../ManageProductData";
import { useEffect, useContext } from "react";
import Header from "../Header";
import ProductContainer from "../ProductContainer";
import CartModal from "../CartModal";
import ExpandProduct from "../ExpandProduct";
import Footer from "../Footer";

const ShoppingPage = () => {
  //getting usestate data from central storage
  const {
    setRenderedData,
    setOriginalData,
    setLoadingCheck,
    setLoadingError,
    expand,
    isCartOpen,
  } = useContext(ProductContext);

  useEffect(() => {
    //getting products data from API
     const getData= async ()=> {
      try {
        const apiData = await axios("https://fakestoreapi.com/products");
        setRenderedData(apiData.data);
        setOriginalData(apiData.data);
        setLoadingCheck(false);
        setLoadingError("");
      } catch (err) {
        setLoadingCheck(true);
        setLoadingError(err.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Header />
      <ProductContainer />
      <Footer />

      {isCartOpen && <CartModal />}
      {expand && <ExpandProduct />}
    </>
  );
};

export default ShoppingPage;
