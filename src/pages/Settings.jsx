import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const [loginHistory, setLoginHistory] = useState([]);
  const username = localStorage.getItem("username"); // Assuming username is stored after login

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:/auth/login-history/${username}`
        );
        setLoginHistory(response.data);
      } catch (error) {
        console.error("Error fetching login history:", error);
      }
    };

    if (username) {
      fetchLoginHistory();
    }
  }, [username]);

  return (
    <div className="settings-container" style={{ marginTop: "150px" }}>
      <h1>Settings</h1>
      <h3>Login History</h3>
      {loginHistory.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>IP Address</th>
              <th>Device</th>
              <th>Browser</th>
              <th>OS</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.timestamp).toLocaleDateString()}</td>
                <td>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                <td>{entry.ip}</td>
                <td>{entry.device}</td>
                <td>{entry.browser}</td>
                <td>{entry.os}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No login history found.</p>
      )}
    </div>
  );
};

export default Settings;
