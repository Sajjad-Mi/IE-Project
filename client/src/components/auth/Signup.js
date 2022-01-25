import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    //check if user logged in navigate user to home page
    useEffect(() => {
      if (localStorage.getItem("authToken")) {
          navigate("/");
      }
    }, []);

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
      
            navigate("/");
          } catch (error) {
           
          }
    }
    return (
        <div className="auth-form">
            <form onSubmit={signupHandler} className="Signup_form">
                <h3>Signup</h3>
                <label htmlFor="signup-name">Username:</label>
                <br />
                <input type="text" id="signup-name" required value={username} onChange={(e) => setUsername(e.target.value) }/>
                <br />
                <label htmlFor="signup-email">Email:</label>
                <br />
                <input type="email" id="signup-email" value={email}  required onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <label htmlFor="signup-password">Password:</label>
                <br />
                <input type="password" id="signup-password" value={password}  required onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <button type="submit" className="btn">Signup</button>

               
            </form>
        </div>
    );
  }
    
  export default Signup;