import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/features/cardSlice";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const adminclick = async () => {
        toast("Contact the administrator", {
            icon: '👏',
          })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const responseData = await response.json();
                // console.log(responseData);
                localStorage.setItem("userId", (responseData.user._id));
                localStorage.setItem("myCookie", (responseData.token));
                localStorage.setItem("email", (responseData.user.email));
                dispatch(setAuthenticated(true))
                toast.success("Login successful");
                navigate("/");
            } else {
                const erroredData = await response.json();
                // console.log(erroredData.message);
                // console.error("Login failed");
                toast.error(erroredData.message)
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
        setPassword("")

    };

    return (
        <>
            <div className="flex w-full h-dvh pb-72 justify-center relative top-10 bottom-40 bg-gradient-to-r from-[#000046]  to-[#1CB5E0] ">
                <div className="bg-white justify-center ">
                    <div className="w-full relative flex ">
                        <div className="flex min-h-full flex-1 flex-col justify-center align-top px-6 py-2 lg:px-8 relative top-10 bg-white">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <h1 className="mt-5 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h1>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="block font-medium text-gray-900 mb-2">
                                        <label htmlFor="email" className="block text-md font-sans font-medium leading-6 text-gray-800">Email address
                                        </label>
                                        <div>
                                            <input type="text" value={email} id="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="email" autoComplete="email" required className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" />
                                        </div>
                                    </div>
                                    <div className="block font-medium text-gray-900 mb-2">
                                        <div className="flex items-center justify-between">
                                            <label htmlFor="password" className="block text-md font-lg leading-6 text-gray-800">Password
                                            </label>
                                            <div className="text-sm">
                                                <div className="font-semibold text-gray-900 underline hover:text-gray-800" onClick={adminclick}>Forgot Password</div>
                                            </div>
                                        </div>
                                        <div>
                                            <input type="password" value={password} id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="password" autoComplete="current-password" required className="block w-full p-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-[#B4B4B8] hover:shadow-md bg-white" />
                                        </div>
                                    </div>
                                    <div className="flex space-x-5 px-1 text-xl">
                                        <p>Don&apos;t have an account</p>
                                        <Link to="/user/register" className="font-semibold hover:text-gray-800 text-gray-950 text-md underline">SignUp</Link>
                                    </div>
                                    <div className="hover:bg-gray-700">
                                        <button type="submit" className="flex w-full justify-center rounded-md bg-[#0ea5e9] px-3 py-3 text-xl  font-semibold leading-6 text-white shadow-sm hover:bg-[#38caff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ">Login</button>
                                    </div>
                                    {/* <button type="button" onClick={() => navigate("/user/register")}>Signup</button> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;