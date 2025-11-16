import React, { useState } from "react";
import "./index.css";
import "./asset/bootstrap.min.css";
import logo from "./asset/logo.png";
import video from "./asset/movie.mp4";

function HomePage({ onLogin }) {
  // ✅ useState at the top level — not inside a function or condition
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="homepage">
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Skyflix</h1>
      </header>

      <video autoPlay loop muted className="background-video">
        <source src={video} type="video/mp4" />
      </video>

      <div className="login-container">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default HomePage;
