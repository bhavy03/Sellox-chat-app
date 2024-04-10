import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/features/cardSlice.js";

const useGetMessages = () => {
  const [loading, setLoading] = useState();
  // const [myMessages, setMyMessages] = useState();
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector((state) => state.card);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER}chat/other/${selectedConversation}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log("myconvos", data);
        dispatch(setMessages(data?.myMessages?.messages));
        // console.log("at getmessages", messages);
        // setMyMessages(data?.myMessages?.messages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation) getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedConversation, userId]);

  return { loading };
};

export default useGetMessages;
