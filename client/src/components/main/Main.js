import { useState } from "react";

import Info from "./Info";
import ChatRoom from "./ChatRoom";

function Main() {
  const [user, setUser] = useState("");

    return (
        <div className="Main">
          <Info user={user} setUser={setUser} />
          <ChatRoom user={user} setUser={setUser} />
        </div>
    );
  }
    
  export default Main;