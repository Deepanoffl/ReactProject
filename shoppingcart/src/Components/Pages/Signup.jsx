import { useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../ManageProductData";
import { useState, useContext } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  //for page routing
  const navigate = useNavigate();

  //getting usestate data from central storage
  const { users, setUsers } = useContext(ProductContext);

  //getting  username from input
  const [eusername, setEusername] = useState("");

  //getting password from input
  const [epassword, setEpassword] = useState("");

  //getting confirmpassword from input
  const [cpassword, setCpassword] = useState("");

  //verifying password match
  const [passwordMisMatch, setPasswordMisMatch] = useState("");

  //showig and hiding password
  const [showPassword, setShowPassword] = useState(false);

  //showig and hiding confirmpassword
  const [showCPassword, setShowCPassword] = useState(false);

  //animation for warning msg
  const [triggerShake, setTriggerShake] = useState(false);

  //functions

  const handleUInput = (evt) => {
    setEusername(evt.target.value);
  };

  const handlePInput = (evt) => {
    setEpassword(evt.target.value);
  };

  const handleCpassword = (evt) => {
    setCpassword(evt.target.value);
  };

  const triggerShakeAnimation = () => {
    setTriggerShake(true);

    setTimeout(() => setTriggerShake(false), 500);
  };

  const addUser = () => {
    if (eusername === "" || epassword === "" || cpassword === "") {
      setPasswordMisMatch("Please Set UserName and PassWord to Login");
      triggerShakeAnimation();
      return;
    }

    let existingUser=false;

    users.forEach(user=>{
      if(eusername === user.username){
        existingUser=true;
      }
    })

    if(existingUser){
      setPasswordMisMatch("UserName Already Exist ! Please Select New Name");
      triggerShakeAnimation();
      setEusername("");
      setEpassword("");
      setCpassword("");
      return;
    }

    if (epassword === cpassword) {
      const loadUsers = [
        ...users,
        { username: eusername, password: epassword },
      ];

      setUsers(loadUsers);
      localStorage.setItem("allUsers", JSON.stringify(loadUsers));

      navigate("/");
    } else {
      setPasswordMisMatch("PassWord MisMatch");
      triggerShakeAnimation();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-10 max-w-md w-full transition-all duration-500 product-container-animation">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#FCA201] mb-4 text-center">
          Create Account
        </h1>
        <p
          className={`text-center text-gray-700 mb-6 ${
            triggerShake ? "animate-shake text-red-500" : ""
          }`}
        >
          {passwordMisMatch}
        </p>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA201] transition-all duration-300 `}
              placeholder="Username"
              value={eusername}
              onChange={handleUInput}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA201] transition-all duration-300 `}
              placeholder="Password"
              value={epassword}
              onChange={handlePInput}
            />
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showCPassword ? "text" : "password"}
              className={`w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA201] transition-all duration-300 `}
              placeholder="Confirm Password"
              value={cpassword}
              onChange={handleCpassword}
            />
            <div
              className="absolute top-3 right-3 text-gray-400 cursor-pointer"
              onClick={() => setShowCPassword(!showCPassword)}
            >
              {showCPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button
            className="bg-[#FCA201] hover:bg-[#e09000] text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer"
            onClick={addUser}
          >
            Sign Up
          </button>
          <div className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/" className="text-[#FCA201] hover:underline font-medium">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
