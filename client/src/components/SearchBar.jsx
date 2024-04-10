import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux"
import "../index.css"
import { setSearch } from '../redux/features/cardSlice';
const SearchBar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.card);
    const searchChange = (e) => {
        e.preventDefault();
        dispatch(setSearch(e.target.value))
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log("search");
        dispatch(setSearch(""))
    }
    return (
        <div>
            <div className="flex m-1 p-3">
                <div className={`flex bg-zinc-50 w-full md:flex md:flex-row md:w-4/5 px-1 ${isAuthenticated ? "mr-2 md:w-4/5" : "md:w-full"} rounded-md`}>
                    <CiSearch className='my-2 h-6 w-9 ' />
                    <input type="text" placeholder="Search" className="px-3 w-full focus:outline-none bg-white" onChange={searchChange} onSubmit={handlesubmit} />
                </div>
                {
                    isAuthenticated ?
                        <div className=" hidden md:flex md:space-x-3 ml-auto">
                            <Link to="/user/sell" className='bg-[#38caff] px-6 py-2 text-center text-lg rounded-full text-white font-semibold hover:bg-[#0ea5e9] hover:text-white hover:font-bold'>Sell</Link><p></p>
                            <Link to="/user/rent" className='bg-[#38caff] px-6 py-2 text-center rounded-full text-lg text-white font-semibold hover:bg-[#0ea5e9] hover:font-bold hover:text-white'>Rent</Link><p></p>
                        </div>
                        : ""}
            </div>
        </div>
    )
}

export default SearchBar
