import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setMyChats } from "../redux/features/cardSlice";
import { useSelector } from "react-redux";

const useSetConversations = () => {
  const { recieverId } = useSelector((state) => state.card);
  const [loading, setLoading] = useState();
  const [conversations, setConversations] = useState();
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();

  useEffect(() => {
    const setconversations = async () => {
      setLoading(true);
      try {
        if (recieverId) {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER}chat/${recieverId}`,
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
          // console.log(data.filteredParticipants);
          dispatch(setMyChats(data.filteredParticipants));
          setConversations(data.filteredParticipants);
        }
      } catch (error) {
        toast.error("chat/id", error.message);
      } finally {
        setLoading(false);
      }
    };
    setconversations();
  }, [dispatch, recieverId, userId]);

  return { loading, conversations };
};

export default useSetConversations;
