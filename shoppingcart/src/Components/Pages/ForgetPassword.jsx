import { Link } from "react-router-dom";
import { ProductContext } from "../ManageProductData";
import { useState, useContext } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";


const ForgetPassword = () => {
  //getting usestate data from central storage
  const { users, setUsers } = useContext(ProductContext);

  //getting exist username from input
  const [existUser, setExistUser] = useState("");

  //checking userfound or not
  const [userFound, setUserFound] = useState(true);

  //providing new password setting
  const [showSetPassword, setShowPassword] = useState(false);

  //setting new password
  const [newPassword, setNewPassword] = useState("");

  //setting confirm new password
  const [confirmPassword, setConfirmPassword] = useState("");

  //showig and hiding newpassword
  const [showNewPass, setShowNewPass] = useState(false);

  //showig and hiding confirmnewpassword
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  //if username not found showing signup btn
  const [signup, setSignUp] = useState(false);

  //warning msg
  const [errMsg, setErrMsg] = useState("");

  //animation for warning msg
  const [shake, setShake] = useState(false);

  //functions

  const handleChange = (evt) => {
    setExistUser(evt.target.value);
  };

  const triggerShake = () => {
    setShake(true);

    setTimeout(() => setShake(false), 500);
  };

  const VerifyUser = () => {
    if (existUser === "") {
      setErrMsg("Please Provide UserName");
      setShowPassword(false);
      setSignUp(false);
      triggerShake();
      return;
    }

    const existingUserFound = users.some((user) => user.username === existUser);

    if (existingUserFound) {
      setUserFound(false);
      setSignUp(false);
      setShowPassword(true);
      setErrMsg("");
    } else {
      setErrMsg("User Not Found! Please Sign Up");
      setSignUp(true);
      setUserFound(true);
      setExistUser("");
      setShowPassword(false);
      triggerShake();
    }
  };

  const handleNewPassword = (evt) => {
    setNewPassword(evt.target.value);
  };

  const handleConfirmPassword = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  const handleUpdatedPassword = () => {
    if (newPassword === "" || confirmPassword === "") {
      setErrMsg("Please Enter New Password");
      triggerShake();
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrMsg("Passwords do not match");
      triggerShake();
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.username === existUser) {
        return { ...user, password: newPassword };
      }
      return user;
    });

    setUsers(updatedUsers);
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

    setErrMsg("Password Changed");
    setShowPassword(false);
    setExistUser("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div
        className={`bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-10 max-w-md w-full transition-all duration-300 product-container-animation
        `}
      >
        <h1 className="text-4xl font-bold text-[#FCA201] mb-4 text-center">
          Change Password
        </h1>
        <p
          className={`text-center text-gray-700 mb-6 ${
            shake ? "animate-shake text-red-500" : ""
          } `}
        >
          {errMsg}
        </p>
        <div className="flex flex-col gap-4">
          {userFound && (
            <>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  value={existUser}
                  onChange={handleChange}
                  placeholder="Enter Username"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA201] transition-all duration-300"
                />
              </div>
              <button
                onClick={VerifyUser}
                className="bg-[#FCA201] hover:bg-[#e09000] text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer"
              >
                Verify
              </button>
            </>
          )}
          {signup && (
            <div className="text-center text-sm text-gray-600">
              User not found?
              <Link
                to={"/signup"}
                className="text-[#FCA201] hover:underline font-medium"
              >
                {" "}
                Signup
              </Link>
            </div>
          )}
          {showSetPassword && (
            <>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showNewPass ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPassword}
                  placeholder="New Password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA201] transition-all duration-300"
                />
                <div
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowNewPass(!showNewPass)}
                >
                  {showNewPass ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCA201] transition-all duration-300"
                />
                <div
                  className="absolute top-3 right-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <button
                onClick={handleUpdatedPassword}
                className="bg-[#FCA201] hover:bg-[#e09000] text-white font-semibold py-2 rounded-lg transition duration-300 cursor-pointer"
              >
                Set Password
              </button>
            </>
          )}
          <div className="text-center text-sm text-gray-600">
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

export default ForgetPassword;
