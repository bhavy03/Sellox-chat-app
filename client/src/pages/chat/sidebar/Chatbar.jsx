import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import Chatcomp from "./Chatcomp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setMyChats } from '../../../redux/features/cardSlice';
// import useGetConversations from '../../../hooks/useGetConversations';

// eslint-disable-next-line react/prop-types
const Chatbar = () => {
  const { myChats } = useSelector((state) => state.card)
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  // console.log("from top", conversations)
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}chat/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        dispatch(setMyChats(data))
      } catch (error) {
        toast.error("chat/", error.message);
      } finally {
        setLoading(false)
      }
    };
    getConversations();
  }, [dispatch, userId]);
  return (
    <div className="w-full text-black m-1 ">
      <div className="flex flex-col-reverse">
        {!loading &&
          myChats?.length > 0 &&
          myChats.map((item, i) => (
            <Chatcomp key={i} item={item} lastIdx={i === myChats.length - 1} />
          ))
        }
        {
          loading &&
          [...Array(4)].map((_, i) => <div className="skeleton h-12 mb-4 bg-gray-300" key={i} />)
        }
        {!loading && myChats?.length === 0 && (
          <p className='text-center'>Select a user to start the conversation</p>
        )}
      </div>
    </div>
  )
}

export default Chatbar
