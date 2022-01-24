import { useState, useEffect } from "react";
import axios from "axios";

function Info({setBlockUser, setIsBlocked, user, setRoomId, setUser, preChat, setpreChat, setShowChatPage}) {
    const [username, setUsername] = useState("");
    const [chatList, setChatList] = useState([]);
    const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
    };
    useEffect(async()=>{
        try {
            const { data } = await axios.get("/chatlist", config);
            console.log(data.chatlist[0])
            setChatList(data.chatlist);
          } catch (error) {
           
          }
    }, [])
    const findChat = async (index) =>{
       
        if(chatList[index].chatType === "singleuser"){
          
            const { data } = await axios.post("/finduser",
                {
                username:chatList[index].name
                }, config
            );
            findUser(data);
            
        }
    }
    const findUser = async (data)=>{
        try {
          
            setUser(data.username);
            setpreChat(data.preChat);
            if(data.preChat){
                setRoomId(data.chatid);
            }
            setShowChatPage(true);
            setIsBlocked(data.isBlocked);
            setBlockUser(data.blockUser);
          } catch (error) {
           
          }
    }
    const searchHandler = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("/finduser",
            {
            username
            }, config
        );
        findUser(data);
    }
    return (
        <div className="info">
            <div className="search-section">
                <form onSubmit={searchHandler} className="search-user">
                
                    <input type="text" id="search-username" value={username} placeholder="Search username" required onChange={(e) => setUsername(e.target.value)}/>

                    <button type="submit" className="btn">search</button>
        
                </form>
            
            </div>
            {chatList && <div className="chat-list">
                {chatList.map((chat, index)=>(
                  <div key={chat._id} className="chat-name" onClick={()=>findChat(index)}>
                    <h5>{chat.name}</h5>
                  </div>
                ))}
            </div>}
        </div>
    );
  }
    
  export default Info;