import Message from "./Message"
import Chatting from "./Chatting"
import { TiMessages } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setSelectedConversation } from "../../../redux/features/cardSlice";
import useGetMessages from "../../../hooks/useGetMessages";
import MessageSkeleton from "../../../components/skeletons/MessageSkeleton";
import useListenMessages from "../../../hooks/useListenMessages";

const Messages = () => {
    const dispatch = useDispatch();
    const lastMessageRef = useRef();
    const { selectedConversation, messages } = useSelector((state) => state.card)
    useListenMessages();
    const { loading } = useGetMessages();
    // console.log("redux messages", messages)
    // console.log("selected", selectedConversation)

    useEffect(() => {
        return () => {
            dispatch(setSelectedConversation(null))
        }
    }, [dispatch])
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);
    return (
        <>
            {
                !selectedConversation ? (
                    <NoChatSelected />
                ) : (
                    <>
                        <div className="px-4 py-2 flex-1 overflow-auto">
                            {!loading &&
                                messages?.length > 0 &&
                                messages.map((message, i) => (
                                    < div key={i} ref={lastMessageRef}>
                                        <Message message={message} />
                                    </div>
                                ))
                            }
                            {loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}
                            {!loading && messages?.length === 0 && (
                                <p className='text-center'>Send a message to start the conversation</p>
                            )}
                        </div>
                        <Chatting />
                    </>
                )
            }
        </>
    )
}

export default Messages

const NoChatSelected = () => {
    return (
        <>
            <div className="flex flex-col h-full items-center justify-center gap-2 font-semibold">
                <div className="text-4xl">Welcome User</div>
                <div className="text-4xl">Select a chat to start messaging</div>
                <TiMessages className="size-6" />
            </div>
        </>
    )
}