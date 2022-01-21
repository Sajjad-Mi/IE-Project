import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {
  return (
    <Router>
        <div className="app">
          <Routes>
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />

          </Routes>
        </div>
    </Router>
  );
}

export default App;
