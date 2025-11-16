import React, { useState } from "react";
import "./index.css";
import "./asset/bootstrap.min.css";
import logo from "./asset/logo.png";

function RegisterPage() {
  const [isLogin, setIsLogin] = useState(true); // toggle between login and register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Simulate login
      alert(`Welcome back, ${formData.username || formData.email}!`);
      window.location.href = "index.html"; // redirect after login
    } else {
      // Simulate register
      alert(`Registration successful! Welcome ${formData.username}`);
      setIsLogin(true);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* LOGO */}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Skyflix Logo"
          style={{ width: "100px", marginBottom: "10px" }}
        />
        <h1>
          Sky<span style={{ color: "#ff0000" }}>flix</span>
        </h1>
      </div>

      {/* FORM CARD */}
      <div
        className="p-4 shadow-lg"
        style={{
          backgroundColor: "#121212",
          borderRadius: "10px",
          border: "2px solid #ff0000",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h3 className="text-center fw-bold mb-4" style={{ color: "#ff0000" }}>
          {isLogin ? "Login to Skyflix" : "Create Account"}
        </h3>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: "#1c1c1c",
                  color: "#fff",
                  border: "1px solid #333",
                }}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1c1c1c",
                color: "#fff",
                border: "1px solid #333",
              }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#1c1c1c",
                color: "#fff",
                border: "1px solid #333",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold mb-3"
            style={{
              backgroundColor: "#ff0000",
              color: "#fff",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* TOGGLE LINK */}
        <div className="text-center mt-3">
          <p style={{ color: "#ccc" }}>
            {isLogin ? "New to Skyflix?" : "Already have an account?"}{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: "#ff0000", textDecoration: "none" }}
            >
              {isLogin ? "Register here" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
