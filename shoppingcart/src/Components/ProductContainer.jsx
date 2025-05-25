import { ProductContext } from "./ManageProductData";
import { useContext } from "react";
import Products from "./Products";

const ProductContainer = () => {
  //getting usestate data from central storage
  const { renderedData, originalData, loadingCheck, loadingError } =
    useContext(ProductContext);

  //if products not found while searching
  const productNotFound = renderedData.length === 0 && originalData.length > 0;

  return (
    <div
      className={`${
        renderedData.length > 0
          ? " grid p-4 m-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 "
          : "block "
      }product-container-animation`}
    >
      {renderedData.length > 0 ? (
        renderedData.map((item) => <Products key={item.id} product={item} />)
      ) : loadingCheck ? (
        <div className="flex min-h-[90vh] justify-center items-center gap-2 animate-fade-in-bounce">
          <p className="text-lg font-medium text-gray-600">
            Oops ! {loadingError}
          </p>
        </div>
      ) : productNotFound ? (
        <div className="flex min-h-[90vh] justify-center items-center gap-2 animate-fade-in-bounce">
          <p className="text-lg font-semibold text-gray-600">
            Oops ! No products found
          </p>
        </div>
      ) : (
        <div className="flex min-h-[90vh] justify-center items-center gap-2 animate-fade-in-bounce">
          <svg
            className="w-6 h-6 animate-spin text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
            ></path>
          </svg>
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
