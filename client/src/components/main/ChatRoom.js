import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Link } from "react-router-dom";
const socket = io({
  auth: {
    token: localStorage.getItem("authToken")
  }
});

function ChatRoom({setMessages, messages, setChangeChat,changeChat, setShowChatPage, groupName, isGroup, blockUser, isBlocked, username, roomId, user, setUser, preChat, setpreChat}) {
    const [text, setText] = useState("");
    const [newGroupUser, setNewGroupUSer] = useState("");
    let messagesList;
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`
      },
  };
    useEffect(async()=>{
      console.log("preChat")
      setChangeChat(false)
      if(!isGroup && preChat){
        try {
          const { data } = await axios.get(`/messages/${roomId}`, config
          );
          console.log(data)
          messagesList=data.messages;
          setMessages(messagesList);
        } catch (error) {
          console.log(error)
        }
      }else if(isGroup){
        try {
          const { data } = await axios.get(`/group/messages/${roomId}`, config
          );
          console.log(data)
          messagesList=data.messages;
          setMessages(messagesList);
        } catch (error) {
          console.log(error)
        }
      }
        
    }, [changeChat])
    useEffect(async()=>{
     
      socket.emit('joinRoom', {roomId});
        socket.on('message', (data)=>{
          console.log(data)
          const newMsg=[{text:data, user:username}]
          setMessages(messagesList=>[...messagesList, ...newMsg])
        })
    }, [])
   

    const sendMessage=()=>{
        console.log(text)
        socket.emit('newMessage', text, isGroup);
        const newMsg=[{text, user:username}]
        console.log(username)
        setMessages(messagesList=>[...messagesList, ...newMsg])
    }
  
    
    const startChat= async ()=>{
        try {
            const { data } = await axios.post("/newchat",
              {
                username:user
              }, config
            );
              console.log(data);
              setpreChat(data.newchat);
          } catch (error) {
           
          }
    }
    const blockuser=async()=>{
      try {
        const { data } = await axios.post("/blockuser",
          {
            username:user
          }, config
        );
        
      } catch (error) {
       
      }
    }
    const unblockuser=async()=>{
      try {
        const { data } = await axios.post("/unblockuser",
          {
            username:user
          }, config
        );
        
      } catch (error) {
       
      }
    }
    const addUser=async()=>{
      try {
        const { data } = await axios.post("/addUser",
          {
            newuser:newGroupUser,
            groupid:roomId
          }, config
        );
        
      } catch (error) {
       
      }
    }
    const leaveGroup=async()=>{
      try {
        const { data } = await axios.post("/leavegroup",
          {
            groupid:roomId
          }, config
        );
        if(data.msg==="you left the group"){
          setShowChatPage(false);
        }
      } catch (error) {
       
      }
    }

    return (
        <div className="chatroom">
            <div className="chat-header">
                {!isGroup ? 
                  <div>
                    <h4>{user}</h4>
                    {blockUser ? <div className="block" onClick={()=>unblockuser()}>unblock</div> : <div>{preChat && <div className="block" onClick={()=>blockuser()}>Block</div>}
                    </div>}
                  </div>
                  :<div className="group-header">  
                      <input type="text" className="add-user" value={newGroupUser}  required onChange={(e) => setNewGroupUSer(e.target.value)}/>
                      <button onClick={addUser}>Add</button>
                      <button className="leave-btn" onClick={leaveGroup}>Leave</button>
                      <h4>{groupName}</h4>
                  </div>
                }
            </div>
            {!isGroup && isBlocked? <h4>You can't send message to this user</h4>:
              <div>
                <div className="chat">
                  {messages.map((message, index)=>(
                    <div key={index} className="message">
                      {message.text.includes("http") ? <a target="_blank" href={message.text}>{message.text}</a>
                      :<p>{message.text}</p>}
                    </div>
                  ))}
              </div>
              
              {!isGroup && !preChat ? 
                <div className="chat-input">start a conversation <button onClick={startChat}>start</button></div>
                : <div className="chat-input">
                    <input type="text" className="chat-text" value={text}  required onChange={(e) => setText(e.target.value)}/>
                    <button onClick={sendMessage}>send</button>
                  </div>}
              </div>
            }
        </div>
    );
  }
  

  export default ChatRoom;