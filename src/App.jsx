import React, { useState } from "react";
import Register from "./components/RegisterForm.jsx";
import Login from "./components/LoginForm.jsx";
import {HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="auth-container">
            <div className="toggle-btns">
              <button className={showLogin ? "active" : ""} onClick={() => setShowLogin(true)}>Login</button>
              <button className={!showLogin ? "active" : ""} onClick={() => setShowLogin(false)}>Register</button>
            </div>
            {showLogin ? <Login/> : <Register />}
          </div>
        } />
        <Route path="/forgot-password" element={<div style={{ textAlign: "center", marginTop: "100px" }}><h2>Forgot Password Page (Coming Soon)</h2></div>} />
        <Route path="/dashboard" element={<div style={{ textAlign: "center", marginTop: "100px" }}><h2>Welcome to Dashboard!</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
