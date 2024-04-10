import { useSelector } from 'react-redux';
import Chatbar from "./sidebar/Chatbar"
import Messages from "./messages/Messages";
import useSetConversations from "../../hooks/useSetConversation";
import Login from '../Login';

const Chat = () => {
  const { conversations } = useSetConversations();
  const { isAuthenticated } = useSelector(state => state.card)
  return (
    <>
      {
        isAuthenticated ?
          <div className="min-w-full px-12 relative stop">
            < div className="flex h-dvh relative" >
              <div className="md:w-1/4 md:flex hidden h-4/6 mt-4 static top-5 overflow-hidden md:bg-white md:backdrop-sepia-0 rounded-md"><Chatbar conversations={conversations} /></div>
              <div className="flex flex-col w-full md:w-3/4 relative bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl  ml-3 mt-4"><Messages /></div>
            </div >
          </div >
          : <Login />
      }
    </>
  )
}

export default Chat
// bg-white-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-60 