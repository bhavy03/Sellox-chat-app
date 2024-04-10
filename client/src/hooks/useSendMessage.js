import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/features/cardSlice";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const { selectedConversation } = useSelector((state) => state.card);
  const dispatch = useDispatch();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}chat/send/${selectedConversation}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data);
      dispatch(setMessages(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
