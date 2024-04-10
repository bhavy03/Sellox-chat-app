// import { useDispatch } from 'react-redux';
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { LiaRupeeSignSolid } from "react-icons/lia";
// import { setSearch } from '../redux/features/cardSlice';

const Cards = ({ card }) => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const handleClick = () => {
        navigate(`/card/${card._id}`)
        // dispatch(setSearch(""))
    }
    const image = card.imageUrl;
    return (
        <>
            <div className="md:pl-5 pl-3">
                <div onClick={handleClick}>
                    <div className="rounded-xl my-3 mx-2 bg-white shadow-lg hover:shadow-2xl">
                        <div className="w-60 h-60 flex flex-col p-2">
                            <div className="h-2/3 overflow-hidden object-cover shadow-md rounded-lg">
                                <img src={image} alt={card.productName} className="w-full h-full object-cover" />
                                <div>{card.duration}</div>
                            </div>
                            <div className=" flex flex-col h-1/3 justify-start pt-3">
                                <p className="flex text-2xl font-semibold align-top items-center">
                                    <LiaRupeeSignSolid className="text-3xl flex items-center" />{card.price}</p>
                                <p className="text-xl font-semibold ml-2">{card.productName}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards
