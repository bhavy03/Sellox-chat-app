import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { MdHomeFilled } from "react-icons/md";
import { MdOutlineChatBubble } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
// import { HiOutlineHashtag, HiOutlineHome,  HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { HiOutlineMenu, } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { GoHomeFill } from "react-icons/go";
import { MdChatBubble } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { RiLoginBoxFill } from "react-icons/ri";
import logo from "../assets/logo3.svg"
import '../index.css'
import { useSelector } from "react-redux"
import Logout from './Logout';

const links = [
    { name: 'Home', to: '/', icon: GoHomeFill },
    { name: 'Chat', to: '/chat', icon: MdChatBubble },
    { name: 'Sell', to: '/user/sell', icon: MdSell },
    { name: 'Rent', to: '/user/rent', icon: IoMdCart },
    { name: 'Login', to: '/user/login', icon: RiLoginBoxFill },
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

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated } = useSelector((state) => state.card);
    const myId = localStorage.getItem('userId');

    return (
        <>
            <div className="relative shadow-2xl">
                <div className="flex h-14 items-center bg-transparent rounded-xl shadow-xl outline outline-offset-0 outline-[#404144]/10 " >
                    <div>
                        <li className="ml-8 mr-auto list-none text-2xl text-white font-semibold letter-spacing py-1.5 backdrop-blur-lg rounded-lg"><Link to="/">
                            <img src={logo} alt="SELLOX" className='w-full h-7 object-cover' />
                        </Link></li>
                    </div>
                    <div className="md:flex md:ml-auto md:mr-5 md:space-x-10 flex flex-row ml-auto space-x-5 mr-3 list-none items-center">
                        <div className='hidden md:space-x-10 md:flex'>
                            <li ><Link to="/"><MdHomeFilled className='w-6 h-6 hover:shadow-lg' style={{ color: 'white' }} /></Link></li>
                            <li><Link to="chat"><MdOutlineChatBubble className='w-6 h-6' style={{ color: 'white' }} /></Link></li>
                        </div>
                        {
                            isAuthenticated ?
                                <li><Link to={`user/${myId}`}><FaCircleUser className='w-5 h-6 md:static absolute top-4 right-16' style={{ color: 'white' }} /></Link></li>
                                : ""}


                        {/* Mobile sidebar */}
                        <div className="absolute md:hidden top-4 right-3">
                            {!mobileMenuOpen ? (
                                <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
                            ) : (
                                <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
                            )}
                        </div>
                        {
                            isAuthenticated ? <Logout /> :
                                <div className='md:flex hidden'>
                                    <li className='bg-zinc-50 text-black text-sm font-semibold hover:text-white hover:bg-[#38caff] hover:font-bold px-2 py-1 rounded-md'><Link to="/user/login">LOGIN</Link></li>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className={`absolute top-0 h-screen w-1/3 bg-gradient-to-t from-[#38caff] to-[#0ea5e9] backdrop-blur-xl z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
                <img src={logo} alt="logo" className="w-full h-14 object-contain" />
                <NavLinks handleClick={() => setMobileMenuOpen(false)} />
            </div>
        </>
    )
}

export default Navbar
