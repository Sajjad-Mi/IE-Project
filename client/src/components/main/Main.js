import { useState } from "react";

import Info from "./Info";
import ChatRoom from "./ChatRoom";

function Main() {
  const [user, setUser] = useState("");
  const [preChat, setpreChat] = useState(false);
  const [showChatPage, setShowChatPage] = useState(false);
  const [roomId, setRoomId] = useState();

    return (
        <div className="Main">
          <Info user={user} setRoomId={setRoomId}  setUser={setUser} preChat={preChat} setpreChat={setpreChat} setShowChatPage={setShowChatPage}/>
          {showChatPage && <ChatRoom roomId={roomId} user={user} setUser={setUser } preChat={preChat} setpreChat={setpreChat}/>}
        </div>
    );
  }
    
  export default Main;