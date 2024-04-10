import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Chat from './pages/chat/Chat'
import Sell from './pages/Sell';
import Rent from './pages/Rent';
import SearchBar from './components/SearchBar';
import Signup from './pages/Signup';
import CardDetail from './pages/CardDetail';
import Loading from "./components/Loading";
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import { useDispatch } from "react-redux"
import { setAuthenticated } from './redux/features/cardSlice.js';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.card)
  function hasCookieInLocalStorage() {
    const cookieValue = localStorage.getItem('myCookie');
    if (cookieValue) {
      // console.log(cookieValue);
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    if (hasCookieInLocalStorage()) {
      dispatch(setAuthenticated(true))
    }
  }, [dispatch]);
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
              <Route path="/card/:cardId" element={isAuthenticated ? <CardDetail /> : <Login />} />
            </Routes>
          </Suspense>
          <Toaster />
        </main>
      </div>
    </>
  )
}

export default App
