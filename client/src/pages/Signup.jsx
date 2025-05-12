import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../redux/features/cardSlice";
import toast from "react-hot-toast";

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [college, setCollege] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("myCookie")) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, college, phoneNo }),
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem("userId", responseData.user._id);
                localStorage.setItem("myCookie", responseData.token);
                localStorage.setItem("email", responseData.user.email);
                dispatch(setAuthenticated(true));
                setShowPopup(true);
                toast.success("Registration successful")
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error Registering:", error);
        }
    };

    return (
        <>
            {/* Success Popup */}
            {showPopup && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-slideDown">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M5 13l4 4L19 7" 
                        />
                    </svg>
                    Signup Successful! Redirecting...
                </div>
            )}

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 font-semibold">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-300">
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="flex flex-col">
                                <h1 className="mb-8 text-4xl font-semibold text-center">Sign up</h1>
                                
                                {/* Name Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="w-full rounded">Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        id="name" 
                                        onChange={(e) => setName(e.target.value)} 
                                        placeholder="Full name" 
                                        required 
                                        className="block border border-gray-300 w-full p-3 rounded mb-4 hover:shadow-md hover:border-gray-400 bg-white" 
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="w-full rounded">Email</label>
                                    <input 
                                        type="email" 
                                        value={email} 
                                        id="email" 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        placeholder="Email" 
                                        required 
                                        className="block border border-gray-300 w-full p-3 rounded mb-4 hover:shadow-md hover:border-gray-400 bg-white" 
                                    />
                                </div>

                                {/* Password Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="password" className="w-full rounded">Password</label>
                                    <input 
                                        type="password" 
                                        value={password} 
                                        id="password" 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="Password" 
                                        required 
                                        className="block border border-gray-300 w-full p-3 rounded mb-4 hover:shadow-md hover:border-gray-400 bg-white" 
                                    />
                                </div>

                                {/* College Dropdown */}
                                <div className="flex flex-col">
                                    <label htmlFor="college" className="w-full rounded">College</label>
                                    <select 
                                        value={college} 
                                        id="college" 
                                        onChange={(e) => setCollege(e.target.value)} 
                                        required 
                                        className="block border border-gray-300 w-full p-3 rounded mb-4 hover:shadow-md hover:border-gray-400 bg-white"
                                    >
                                        <option value="">-- Select College --</option>
                                        <option value="Mohanlal Sukhadia University">Mohanlal Sukhadia University</option>
                                        <option value="Sir Padampat Singhania University">Sir Padampat Singhania University</option>
                                        <option value="Maharana Pratap University of Agriculture & Technology - Administrative Office">Maharana Pratap University of Agriculture & Technology - Administrative Office</option>
                                        <option value="College of Technology and Engineering">College of Technology and Engineering</option>
                                        <option value="Bhupal Noble's University">Bhupal Noble&apos;s University</option>
                                        <option value="Pacific University">Pacific University</option>
                                        <option value="JRN University">JRN University</option>
                                        <option value="Bhupal Nobles College Of Physical Education">Bhupal Nobles College Of Physical Education</option>
                                        <option value="Indian Institute Of Management–Udaipur (IIM–Udaipur)">Indian Institute Of Management–Udaipur (IIM–Udaipur)</option>
                                        <option value="R.N.T. Medical College">R.N.T. Medical College</option>
                                        <option value="Pacific Medical College & Hospital">Pacific Medical College & Hospital</option>
                                        <option value="Sai Tirupati University">Sai Tirupati University</option>
                                        <option value="Pacific University">Pacific University</option>
                                        <option value="Swami Keshwanand Rajasthan Agriculture University">Swami Keshwanand Rajasthan Agriculture University</option>
                                        <option value="Netaji Subhash Mahavidyalaya, Udaipur">Netaji Subhash Mahavidyalaya, Udaipur</option>
                                    </select>
                                </div>

                                {/* Phone Number Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="phoneNO" className="w-full rounded">Mobile No.</label>
                                    <input 
                                        type="tel" 
                                        value={phoneNo} 
                                        id="phoneNO" 
                                        onChange={(e) => setPhoneNo(e.target.value)} 
                                        placeholder="Mobile No." 
                                        required 
                                        className="block border border-gray-300 w-full p-3 rounded mb-4 hover:shadow-md hover:border-gray-400 bg-white" 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full py-3 px-4 bg-[#0ea5e9] hover:bg-[#38caff] hover:shadow-xl text-white font-bold rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Login Link */}
                    <div className="text-white mt-6 flex items-center">
                        Already have an account?
                        <Link 
                            className="no-underline border-b border-white text-white ml-2" 
                            to="/user/Login"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;