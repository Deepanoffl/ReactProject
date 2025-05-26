import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../ManageProductData";
import { useContext, useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  //for page routing
  const navigate = useNavigate();

  //getting usestate data from central storage
  const { users, setUserName } = useContext(ProductContext);

  //getting  username from input
  const [eusername, setEusername] = useState("");

  //getting password from input
  const [epassword, setEpassword] = useState("");

  //animate error msg
  const [loginError, setLoginError] = useState(false);

  //showing warning msg to user if input empty or user not found
  const [ruser, setRuser] = useState("");

  //showig and hiding password
  const [showPassword, setShowPassword] = useState(false);

  //when click login showing animation
  const [loading, setLoading] = useState(false);

  //functions

  const handleUInput = (evt) => {
    setEusername(evt.target.value);
  };

  const handlePInput = (evt) => {
    setEpassword(evt.target.value);
  };

  const triggerShake = () => {
    setLoginError(true);

    setTimeout(() => setLoginError(false), 500);
  };

  const handleLogin = () => {
    setLoading(true);

    setTimeout(() => {
      setUserName(eusername);
      localStorage.setItem("userName", eusername);
      setEusername("");
      setEpassword("");
      setLoading(false);
      navigate("/landing");
    }, 500);
  };

  const checkUser = () => {
    if (eusername === "" || epassword === "") {
      setRuser("Please Enter UserName and PassWord to Login");
      triggerShake();
      return;
    }

    let userFound = false;

    users.forEach(function (item) {
      if (item.username === eusername && item.password === epassword) {
        userFound = true;
        handleLogin();
      }
    });

    if (!userFound) {
      setRuser("Please Signup before Login :)");
      triggerShake();
      setEusername("");
      setEpassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6 ">
      <div
        className={`bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-10 max-w-md w-full transition-all duration-500 product-container-animation`}
      >
        <h1 className="text-2xl sm:text-4xl font-bold text-[#5D3FD3] mb-4 text-center">
          Welcome Back
        </h1>
        <p
          className={`text-center text-gray-700 mb-6 ${
            loginError ? "animate-shake text-red-500" : ""
          }`}
        >
          {ruser}
        </p>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] transition-all duration-300"
              placeholder="Username"
              value={eusername}
              onChange={handleUInput}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5D3FD3] transition-all duration-300"
              placeholder="Password"
              value={epassword}
              onChange={handlePInput}
            />
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            className="bg-[#5D3FD3] hover:bg-[#4B33C4] text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer flex justify-center items-center"
            onClick={checkUser}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-center text-sm text-gray-600 mt-2">
            <Link
              to="/forgetpassword"
              className="text-[#5D3FD3] hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#5D3FD3] hover:underline font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
