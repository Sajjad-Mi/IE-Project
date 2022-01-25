import { useState, useEffect } from "react";
import axios from "axios";

import Info from "./Info";
import ChatRoom from "./ChatRoom";

function Main() {
  const [user, setUser] = useState("");
  const [preChat, setpreChat] = useState(false);
  const [showChatPage, setShowChatPage] = useState(false);
  const [roomId, setRoomId] = useState();
  const [username, setUsername] = useState();
  const [isBlocked, setIsBlocked] = useState();
  const [blockUser, setBlockUser] = useState();
  const [isGroup, setIsGroup] = useState();
  const [groupName, setGroupName] = useState();
  const [changeChat, setChangeChat] = useState();


  useEffect(async()=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
    };
      const { data } = await axios.get("/userinfo", config);
      setUsername(data.username);
    } catch (error) {
    }
  }, [])
    return (
        <div className="Main">
          <Info setChangeChat={setChangeChat} setGroupName={setGroupName} setIsGroup={setIsGroup} setBlockUser={setBlockUser} setIsBlocked={setIsBlocked} user={user} setRoomId={setRoomId}  setUser={setUser} preChat={preChat} setpreChat={setpreChat} setShowChatPage={setShowChatPage}/>
          {showChatPage && <ChatRoom setChangeChat={setChangeChat} changeChat={changeChat}setShowChatPage={setShowChatPage} groupName={groupName} isGroup={isGroup} blockUser={blockUser} isBlocked={isBlocked} username={username} roomId={roomId} user={user} setUser={setUser } preChat={preChat} setpreChat={setpreChat}/>}
        </div>
    );
  }
    
  export default Main;