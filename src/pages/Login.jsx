import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // <-- useNavigate for redirection

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                username,
                password
            });

            // Store user session (e.g., using localStorage)
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Redirect to Home Page
            navigate("/");
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
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
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>

            {/* Tiny button to go to home */}
            <button 
                onClick={() => navigate("/")} 
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "12px",
                    padding: "5px 10px",
                    border: "none",
                    backgroundColor: "#ddd",
                    cursor: "pointer",
                    borderRadius: "5px"
                }}
            >
                Go to Home
            </button>
        </div>
    );
};

export default Login;
