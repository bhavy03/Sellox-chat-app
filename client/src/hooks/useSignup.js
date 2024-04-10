import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/features/cardSlice";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async ({
    name,
    email,
    password,
    confirmPassword,
    phoneNo,
    collegeId,
  }) => {
    const success = handleInputErrors({
      name,
      email,
      password,
      confirmPassword,
      phoneNo,
      collegeId,
    });
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            confirmPassword,
            phoneNo,
            collegeId,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        localStorage.setItem("userId", responseData.user._id);
        localStorage.setItem("myCookie", responseData.token);
        localStorage.setItem("email", responseData.user.email);
        dispatch(setAuthenticated(true));
        console.log("Registration successful");
      } else {
        console.error("Registration failed");
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  name,
  email,
  password,
  confirmPassword,
  phoneNo,
  collegeId,
}) {
  if (!name || !email || !password || !confirmPassword || !phoneNo || !collegeId) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  if (phoneNo.length < 10) {
    toast.error("phoneNo must be at least 6 characters");
    return false;
  }

  return true;
}