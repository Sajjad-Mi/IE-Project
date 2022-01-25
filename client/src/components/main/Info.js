import { useState, useEffect } from "react";
import axios from "axios";

function Info({setMessages, setChangeChat, setGroupName ,setIsGroup, setBlockUser, setIsBlocked, user, setRoomId, setUser, preChat, setpreChat, setShowChatPage}) {
    const [username, setUsername] = useState("");
    const [chatList, setChatList] = useState([]);
    const [newGroupName, setNewGroupName] = useState([]);

    const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
    };
    useEffect(async()=>{
        try {
            const { data } = await axios.get("/chatlist", config);
            setChatList(data.chatlist);
          } catch (error) {
           
          }
    }, [])
    const findChat = async (index) =>{
        setChangeChat(true)
        setMessages([]);
       console.log(index);
        if(chatList[index].chatType === "singleuser"){
          
            const { data } = await axios.post("/finduser",
                {
                username:chatList[index].name
                }, config
            );
            findUser(data);
            
        }else if(chatList[index].chatType === "group"){
           setGroupName(chatList[index].name);
           setRoomId(chatList[index]._id);
           setShowChatPage(true);
           setIsGroup(true);
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
            setIsGroup(false);
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
    const creategroupe = async (e) =>{
        e.preventDefault();
        const { data } = await axios.post("/creategroup",
            {
                groupname: newGroupName
            }, config
       
        );
        setChatList(data.chatlist);
    }
    return (
        <div className="info">
            <div className="search-section">
                <h4>Search user</h4>
                <form onSubmit={searchHandler} className="search-user">
                
                    <input type="text" id="search-username" value={username} placeholder="Search username" required onChange={(e) => setUsername(e.target.value)}/>

                    <button type="submit" className="btn">search</button>
        
                </form>
            
            </div>
            <div className="new-group">
                <h4>New group</h4>
                <form onSubmit={creategroupe} className="search-user">
                    <input type="text"  value={newGroupName} placeholder="group name" required onChange={(e) => setNewGroupName(e.target.value)}/>
                    <button type="submit" className="create-btn">create</button>
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