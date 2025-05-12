import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdHomeFilled } from "react-icons/md";
import { MdOutlineChatBubble } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import logo from "../assets/logo3.svg";
import "../index.css";
import { useSelector } from "react-redux";
import Logout from "./Logout";

const links = [
  { name: "Home", to: "/", icon: MdHomeFilled },
  { name: "Cart", to: `/cart/${localStorage.getItem("userId")}`, icon: FaCartShopping },
  { name: "Chat", to: "/chat", icon: MdOutlineChatBubble },
  { name: "Profile", to: `/user/${localStorage.getItem("userId")}`, icon: FaCircleUser },
];


// eslint-disable-next-line react/prop-types
const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-blue-950 hover:text-white"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

// eslint-disable-next-line react/prop-types
const Navbar = ({ onNotificationClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.card);
  const myId = localStorage.getItem("userId");

  return (
    <>
      <div className="relative shadow-2xl z-50">
        <div className="flex h-14 items-center bg-transparent rounded-xl shadow-xl outline outline-offset-0 outline-[#404144]/10 px-4">
          <div>
            <li className="list-none text-2xl text-white font-semibold py-1.5 backdrop-blur-lg rounded-lg">
              <Link to="/">
                <img src={logo} alt="SELLOX" className="w-full h-7 object-cover" />
              </Link>
            </li>
          </div>

          <div className="md:flex md:ml-auto md:space-x-10 ml-auto hidden items-center space-x-5 list-none">
            <li>
              <Link to="/"><MdHomeFilled className="w-6 h-6 text-white hover:shadow-lg" /></Link>
            </li>
            <li>
              <button onClick={onNotificationClick}>
                <IoIosNotifications className="w-6 h-6 text-white hover:shadow-lg" />
              </button>
            </li>
            <li>
              <Link to={`/cart/${myId}`}>
                <FaCartShopping className="w-6 h-6 text-white hover:shadow-lg" />
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <MdOutlineChatBubble className="w-6 h-6 text-white" />
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={`/user/${myId}`}>
                  <FaCircleUser className="w-5 h-6 text-white" />
                </Link>
              </li>
            )}
            {isAuthenticated ? (
              <Logout />
            ) : (
              <li className="bg-zinc-50 text-black text-sm font-semibold hover:text-white hover:bg-[#38caff] px-2 py-1 rounded-md">
                <Link to="/user/login">LOGIN</Link>
              </li>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden ml-auto">
            {!mobileMenuOpen ? (
              <HiOutlineMenu className="w-6 h-6 text-white" onClick={() => setMobileMenuOpen(true)} />
            ) : (
              <RiCloseLine className="w-6 h-6 text-white" onClick={() => setMobileMenuOpen(false)} />
            )}
          </div>
        </div>
        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-white p-6 z-40 shadow-lg md:hidden transition-all">
            <NavLinks handleClick={() => setMobileMenuOpen(false)} />
            {isAuthenticated ? (
              <Logout />
            ) : (
              <div className="mt-4">
                <Link to="/user/login" className="text-black font-medium hover:text-blue-600">LOGIN</Link>
              </div>
            )}
          </div>
        )}
        
      </div>
    </>
  );
};

export default Navbar;
