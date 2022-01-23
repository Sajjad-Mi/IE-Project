import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io({
  auth: {
    token: localStorage.getItem("authToken")
  }
});

function ChatRoom({roomId, user, setUser, preChat, setpreChat}) {
    const [text, setText] = useState("");
  
    useEffect(()=>{
        socket.emit('joinRoom', {roomId});
        socket.on('message', (data)=>{
          console.log(data)
        })
    }, [])
    const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
    };

    const sendMessage=()=>{
        console.log(text)
        socket.emit('newMessage', text);
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

    return (
        <div className="chatroom">
            <div className="chat-header">

            </div>
            <div className="chat">
                <div className="message">
                  <p>text</p>
                </div>
                <div className="message">
                  <p>text</p>
                </div>
            </div>

            {preChat ? <div className="chat-input">
                <input type="text" className="chat-text" value={text}  required onChange={(e) => setText(e.target.value)}/>
                <button onClick={sendMessage}>send</button>
            </div >:<div className="chat-input">start a conversation <button onClick={startChat}>start</button></div>}
        </div>
    );
  }
    
  export default ChatRoom;