import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import "./Login.css"; // Import the CSS file for external styles
import myImage from "/src/assets/main logo.svg"; // Path to your logo

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      setMessage("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
          recaptchaToken,
        }
      );

      // Store JWT token and user session
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Dispatch authentication event
      window.dispatchEvent(new Event("authChange"));

      // Redirect to Home Page
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleSkipLogin = () => {
    localStorage.setItem("user", JSON.stringify({ username: "guest" }));

    // Dispatch authentication event
    window.dispatchEvent(new Event("authChange"));

    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <br />

            {/* Add reCAPTCHA */}
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6Lcr_u4qAAAAAH8SC6Xx7m2XCXnEKPW9dCeZHGPZ" // Replace with your actual site key
                onChange={(token) => setRecaptchaToken(token)}
              />
            </div>
            <br />

            <button type="submit" className="login-button">
              Login
            </button>
            <button onClick={handleSkipLogin} className="login-button">
              Skip Login
            </button>
          </form>
          <p className="error-message">{message}</p>
        </div>
      </div>

      {/* Home Page-like Section */}
      <div className="home-section">
        <div className="home-content">
          <img src={myImage} alt="Logo" className="logo-image" />
          <h2 className="home-title">
            Welcome to the AI-Driven Speech Therapy App
          </h2>
          <p className="home-description">
            This app helps users with speech therapy, tracking emotional changes
            and stress levels to provide personalized feedback and improve
            speech quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
