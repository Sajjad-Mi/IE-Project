import { useState } from "react";
import axios from "axios";

function Info({user, setUser}) {
    const [username, setUsername] = useState("");
    //const [user, setUser] = useState("");
    const searchHandler = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("authToken")}`
            },
        };
        try {
            const { data } = await axios.post("/finduser",
              {
               username
              }, config
            );
            setUser(data.username);
          } catch (error) {
           
          }
    }
    return (
        <div className="info">
            <div className="search-section">
                <form onSubmit={searchHandler} className="search-user">
                
                    <input type="text" id="search-username" value={username} placeholder="Search username" required onChange={(e) => setUsername(e.target.value)}/>

                    <button type="submit" className="btn">search</button>
        
                </form>
                {user != null && <h4>{user}</h4>}
            </div>
        </div>
    );
  }
    
  export default Info;