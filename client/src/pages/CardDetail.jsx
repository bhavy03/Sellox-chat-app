import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCurrentCard, setRecieverId, setSelectedConversation } from "../redux/features/cardSlice";
import { IoChatbubblesOutline } from "react-icons/io5";

const CardDetail = () => {
    const dispatch = useDispatch();
    const { cardId } = useParams();
    const navigate = useNavigate();
    const myId = localStorage.getItem("userId");
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}card/${cardId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const cardData = await response.json();
                // console.log(cardData)
                dispatch(setCurrentCard(cardData))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [cardId, dispatch]);
    const { currentId } = useSelector((state) => state.card);
    const cardImage = currentId.imageUrl;
    const recieverId = currentId.sellerId;
    // console.log(myId)
    // console.log(recieverId)
    const handleclick = () => {
        navigate(`/chat/${recieverId}`)
    }
    useEffect(() => {
        dispatch(setRecieverId(recieverId))
        dispatch(setSelectedConversation(recieverId))
    }, [dispatch, recieverId])
    return (
        <>
            <div className="flex justify-center bg-white w-full h-screen p-4">
                <div className="w-full md:grid md:grid-cols-5 md:grid-rows-7 md:gap-3 px-4 flex flex-col ">
                    <div className="col-start-1 col-end-4 row-start-1 row-span-5 bg-white rounded-lg shadow-lg p-3 border border-[#dadada]">
                        <img src={cardImage} alt=
                            {currentId.productName} className="w-auto h-full object-center overflow-hidden rounded-md mx-auto" />
                    </div>
                    <div className="col-start-4 col-end-6 row-start-1 row-span-2 rounded-lg shadow-lg p-3 border border-[#dadada] md:h-full h-1/4">
                        <div className="h-full flex flex-col">
                            <div className="flex flex-row md:text-5xl text-3xl md:mb-5 mt-3 items-center">
                                <LiaRupeeSignSolid className="md:text-5xl text-3xl flex justify-center" />
                                <div className="justify-self-center">{currentId.price}</div>
                            </div>
                            <div className="text-2xl ml-4 font font-semibold flex">{currentId.duration}
                                {/* <div className="text-lg my-auto ml-7 text-green-700">Rent</div> */}
                            </div>
                            <p className="px-3 text-2xl font-semibold mt-5 text-gray-600 ">{currentId.productName}</p>
                        </div>
                    </div>
                    <div className="col-start-4 col-end-6 row-start-3 row-span-2 rounded-lg shadow-lg p-3 border border-[#dadada] md:h-full h-1/4 md:grid flex flex-col justify-start">
                        <div className="flex flex-col md:justify-center justify-start md:p-4">
                            <div className="flex text-2xl gap-2 md:mb-3 px-3 justify-start items-center">
                                <FaRegUser className="text-2xl w-5" />
                                {currentId.sellerName}
                            </div>
                        </div>
                        {
                            myId != recieverId ?
                                <div className="md:px-5 px-2 flex flex-row gap-2 text-xl font-semibold mt-3 items-center justify-start">
                                    <IoChatbubblesOutline className="align-middle" />
                                    <div >
                                        <div onClick={handleclick} className="flex flex-col md:justify-center justify-start md:p-4">Chat with seller</div>
                                        {/* {currentId.phoneNo} */}
                                    </div>
                                </div>
                                : ""}
                    </div>
                    <div className="col-start-1 col-span-3 row-start-6 row-span-3 py-2 rounded-lg shadow-lg mb-7 border border-[#dadada] md:h-full h-2/4">
                        <div className=" h-full flex flex-col overflow-hidden px-3 ">
                            <div className="font-semibold text-2xl">Description:</div>
                            {currentId.details}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardDetail
