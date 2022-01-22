import { useState } from "react";
import axios from "axios";

function Login({history}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        
        const config = {
            header: {
              "Content-Type": "application/json",
            }
        };
        try {
            const { data } = await axios.post("/login",
              {
               email, password
              }, config
            );
      
            localStorage.setItem("authToken", data.token);
      
            history.push("/");
          } catch (error) {
           
          }
    }
    return (
        <div className="Login">
            <form onSubmit={loginHandler} className="Login_form">
                <h3>Login</h3>
            
                <label htmlFor="login-email">Email:</label>
                <input type="email" id="login-email" value={email}  required onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="login-password">Password:</label>
                <input type="password" id="login-password" value={password}  required onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit" className="btn">Login</button>

               
            </form>
        </div>
    );
  }
    
  export default Login;