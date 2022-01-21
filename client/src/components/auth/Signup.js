import { useState } from "react";
import axios from "axios";

function Signup({history}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupHandler = async (e) => {
        e.preventDefault();
        
        const config = {
            header: {
              "Content-Type": "application/json",
            }
        };
        try {
            const { data } = await axios.post("/signup",
              {
                username, email, password
              }, config
            );
      
            localStorage.setItem("authToken", data.token);
      
            history.push("/");
          } catch (error) {
           
          }
    }
    return (
        <div className="Signup">
            <form onSubmit={signupHandler} className="Signup_form">
                <h3>Signup</h3>
                <label htmlFor="signup-name">Username:</label>
                <input type="text" id="signup-name" required value={username} onChange={(e) => setUsername(e.target.value) }/>

                <label htmlFor="signup-email">Email:</label>
                <input type="email" id="signup-email" value={email}  required onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="signup-password">Password:</label>
                <input type="password" id="signup-password" value={password}  required onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit" className="btn">Signup</button>

               
            </form>
        </div>
    );
  }
    
  export default Signup;