import { useState, useEffect } from "react";
import axios from "axios";

function ChatRoom({user, setUser, preChat, setpreChat}) {
    const [text, setText] = useState("");
    const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
    };
  
    const sendMessage=()=>{
        console.log(text)
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

            </div>

            {preChat ? <div className="chat-input">
                <input type="text" className="chat-text" value={text}  required onChange={(e) => setText(e.target.value)}/>
                <button onClick={sendMessage}>send</button>
            </div >:<div className="chat-input">start a conversation <button onClick={startChat}>start</button></div>}
        </div>
    );
  }
    
  export default ChatRoom;