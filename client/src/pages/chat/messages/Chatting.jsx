import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useSendMessage from "../../../hooks/useSendMessage";

const Chatting = () => {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useSendMessage();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) return;
    await sendMessage(inputValue)
    setInputValue("");
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="min-w-full ">
      <form className=" m-2 flex rounded-md" onSubmit={handlesubmit}>
        <input type="text" placeholder="type your message" value={inputValue} onChange={handleChange} className="w-11/12 h-12 p-2 m-1 focus:outline-none bg-white text-black border-2 border-black rounded-md" />
        <button type="submit" className="w-1/12 bg-[#38caff] m-1 rounded-full text-black flex justify-center items-center"><IoMdSend className="size-5" /></button>
      </form>
    </div>
  )
}

export default Chatting
