import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA

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
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
        recaptchaToken,
      });

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
    <div style={{ textAlign: "center", marginTop: "50px", position: "relative" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        {/* Add reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6Lcr_u4qAAAAAH8SC6Xx7m2XCXnEKPW9dCeZHGPZ" // Replace with your actual site key
          onChange={(token) => setRecaptchaToken(token)}
        />
        <br />

        <button type="submit">Login</button>
      </form>
      <p>{message}</p>

      {/* Skip Login Button */}
      <button
        onClick={handleSkipLogin}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "12px",
          padding: "5px 10px",
          border: "none",
          backgroundColor: "#ddd",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Skip Login
      </button>
    </div>
  );
};

export default Login;
