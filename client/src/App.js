import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Main from "./components/main/Main";

import PrivateRoute from "./components/route/PrivateRoute";

function App() {
 
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/" element={<PrivateRoute><Main/></PrivateRoute>} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;
