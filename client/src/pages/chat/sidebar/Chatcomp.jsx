import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { setSelectedConversation } from '../../../redux/features/cardSlice';
import { useSocketContext } from '../../../context/SocketContext';

// eslint-disable-next-line react/prop-types
const Chatcomp = ({ item, lastIdx }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { onlineUsers } = useSocketContext();
    // console.log("from online", onlineUsers)
    const chatId = item?.participants[0]?._id;
    const { selectedConversation } = useSelector(state => state.card);
    const isSelected = selectedConversation === chatId;
    const isOnline = onlineUsers.includes(chatId);
    // console.log(item.participants[0].name)
    const names = item?.participants[0]?.name;
    const handleclick = () => {
        navigate(`/chat/other/${chatId}`);
        dispatch(setSelectedConversation(chatId))
    }
    return (
        <>
            <div className={`flex flex-col p-2 h-14 justify-center items-start rounded-sm hover:bg-sky-500 ${isSelected ? "bg-sky-500" : ""}`} onClick={handleclick}>
                <div className="flex flex-col">
                    <p>{names}</p>
                    {isOnline && <p className='text-green-500 text-[8px] flex justify-start'>Online</p>}
                </div>
            </div>
            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Chatcomp
