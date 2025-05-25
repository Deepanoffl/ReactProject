import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageProductData from "../Components/ManageProductData";
import Login from "../Components/Pages/Login";
import Signup from "../Components/Pages/Signup";
import ForgetPassword from "../Components/Pages/ForgetPassword";
import ShoppingPage from "../Components/Pages/ShoppingPage";
import BuyNow from "../Components/Pages/BuyNow";
import PlaceOrder from "../Components/Pages/PlaceOrder";
import MyOrders from "../Components/MyOrders";
import Favorites from "../Components/Pages/Favorites";

const App = () => {
  return (
    <>
      {/*ManageProductData provides data to use and share across multiple components */}
      <ManageProductData>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
            <Route path="/landing" element={<ShoppingPage />}></Route>
            <Route path="/purchase" element={<BuyNow/>}></Route>
            <Route path="/order" element={<PlaceOrder/>}></Route>
            <Route path="/myorders" element={<MyOrders/>}></Route>
            <Route path="/favorites" element={<Favorites/>}></Route>
          </Routes>
        </BrowserRouter>
      </ManageProductData>
    </>
  );
};

export default App;
