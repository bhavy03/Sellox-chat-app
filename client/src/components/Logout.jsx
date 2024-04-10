import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Login from "../pages/Login";
import { setAuthenticated } from '../redux/features/cardSlice';


const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.card);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}user/logout`, {
                credentials: "include"
            });
            if (response.ok) {
                const responseData = await response.json()
                console.log(responseData);
                localStorage.removeItem('myCookie');
                localStorage.removeItem('email');
                localStorage.removeItem('userId');
                dispatch(setAuthenticated(false));
            } else {
                console.error("Logging out failed");
            }
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    return (
        <>{
            isAuthenticated ?
                <div onClick={handleSubmit}>
                    <div className='md:flex hidden'>
                        <li className='bg-zinc-50 text-black text-sm font-semibold hover:text-white hover:bg-[#38caff] hover:font-bold px-2 py-1 rounded-md'><Link to="/user/logout">LOGOUT</Link></li>
                    </div>
                </div>
                : <Login />
        }
        </>
    )
}

export default Logout
