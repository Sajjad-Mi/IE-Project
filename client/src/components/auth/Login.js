import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/");
        }
      }, []);

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
      
            navigate("/");
          } catch (error) {
           
          }
    }
    return (
        <div className="auth-form">
            <form onSubmit={loginHandler} className="Login_form">
                <h3>Login</h3>
            
                <label htmlFor="login-email">Email:</label>
                <br />
                <input type="email" id="login-email" value={email}  required onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <label htmlFor="login-password">Password:</label>
                <br />
                <input type="password" id="login-password" value={password}  required onChange={(e) => setPassword(e.target.value)}/>
                <br />

                <button type="submit" className="btn">Login</button>

               
            </form>
        </div>
    );
  }
    
  export default Login;