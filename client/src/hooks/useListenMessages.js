import { useEffect } from "react";
import { useDispatch } from "react-redux";  
import { useSocketContext } from "../context/SocketContext";
import { setMessages } from "../redux/features/cardSlice.js";

// import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
    const dispatch = useDispatch();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			// newMessage.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
            // console.log(newMessage)
			dispatch(setMessages(newMessage))
		});

		return () => socket?.off("newMessage");
	}, [socket, dispatch]);
};
export default useListenMessages;