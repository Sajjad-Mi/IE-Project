import { useState } from "react";

import Info from "./Info";
import ChatRoom from "./ChatRoom";

function Main() {
  const [user, setUser] = useState("");
  const [preChat, setpreChat] = useState(false);
  const [showChatPage, setShowChatPage] = useState(false);

    return (
        <div className="Main">
          <Info user={user} setUser={setUser} preChat={preChat} setpreChat={setpreChat} setShowChatPage={setShowChatPage}/>
          {showChatPage && <ChatRoom user={user} setUser={setUser } preChat={preChat} setpreChat={setpreChat}/>}
        </div>
    );
  }
    
  export default Main;