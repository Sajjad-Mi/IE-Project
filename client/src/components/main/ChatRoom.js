import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io({
  auth: {
    token: localStorage.getItem("authToken")
  }
});

function ChatRoom({username, roomId, user, setUser, preChat, setpreChat}) {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    let messagesList;
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`
      },
  };
    useEffect(async()=>{
      console.log("hi"+preChat)

      if(preChat){
        try {
          const { data } = await axios.get(`/messages/${roomId}`, config
          );
          console.log(data)
          messagesList=data.messages;
          setMessages(messagesList);
        } catch (error) {
          console.log(error)
        }
      }
        socket.emit('joinRoom', {roomId});
        socket.on('message', (data)=>{
          console.log(data)
          const newMsg=[{text:data, user:username}]
          setMessages(messagesList=>[...messagesList, ...newMsg])
        })
    }, [])
   

    const sendMessage=()=>{
        console.log(text)
        socket.emit('newMessage', text);
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

    return (
        <div className="chatroom">
            <div className="chat-header">

            </div>
            <div className="chat">
                {messages.map((message, index)=>(
                  <div key={index} className="message">
                    <p>{message.text}</p>
                  </div>
                ))}
            </div>

            {preChat ? <div className="chat-input">
                <input type="text" className="chat-text" value={text}  required onChange={(e) => setText(e.target.value)}/>
                <button onClick={sendMessage}>send</button>
            </div >:<div className="chat-input">start a conversation <button onClick={startChat}>start</button></div>}
        </div>
    );
  }
    
  export default ChatRoom;