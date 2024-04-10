/* eslint-disable react/prop-types */
import { extractTime } from "../../../utils/extractTime";

const Message = ({ message }) => {
    const authuserId = localStorage.getItem('userId')
    const fromMe = message?.senderId === authuserId
    const formattedTime = extractTime(message?.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    return (
        <>
            <div className={`chat ${chatClassName}`}>
                <div className={`chat-bubble ${bubbleBgColor}`}>{message?.message}</div>
                <div className="chat-footer text-xs flex gap-1 items-center">{formattedTime}</div>
            </div>
        </>
    )
}

export default Message
