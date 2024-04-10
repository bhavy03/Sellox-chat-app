import { Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import Navbar from "../../components/Navbar"
import Home from '../Home';
import Login from '../Login';
import Profile from '../Profile';
import Chat from '../chat/Chat'
import Sell from '../Sell';
import Rent from '../Rent';
import SearchBar from '../../components/SearchBar';
import Signup from '../Signup';
import CardDetail from '../CardDetail';
import Loading from "../../components/Loading";

const Main = () => {
    return (
        <>
            <div className="flex flex-col text-black">
                <div className=' bg-gradient-to-r from-[#000046]  to-[#1CB5E0] bg-transparent relative stick shadow-md md:px-8 z-10 backdrop-blur-md'>
                    <nav className="p-3 relative stick ">
                        <Navbar />
                    </nav>
                    <search className='w-full '>
                        <SearchBar />
                    </search>
                </div>
                <main className=" flex w-[100%] bg-gradient-to-r from-[#000046]  to-[#1CB5E0] rounded-sm  m-auto stop ">
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/user/login" element={<Login />} />
                            <Route path="/user/logout" element={<Home />} />
                            <Route path="/user/register" element={<Signup />} />
                            <Route path="/chat/" element={<Chat />} />
                            <Route path="/chat/:recieverId" element={<Chat />} />
                            <Route path="/chat/other/:recieverId" element={<Chat />} />
                            <Route path="/user/:myId" element={<Profile />} />
                            <Route path="/user/sell" element={<Sell />} />
                            <Route path="/user/rent" element={<Rent />} />
                            <Route path="/card/:cardId" element={<CardDetail />} />
                        </Routes>
                    </Suspense>
                    <Toaster />
                </main>
            </div>
        </>
    )
}

export default Main
