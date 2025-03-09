import React, { useState, useEffect } from "react";
import axios from "axios";
import settingsBanner from "/src/assets/settings.jpg"; 

const Settings = () => {
    const [loginHistory, setLoginHistory] = useState([]);
    const username = localStorage.getItem("username"); // Assuming username is stored after login

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/auth/login-history/${username}`);
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
        <div style={styles.wrapper}>
            {/* Banner with Margin */}
            <img className="banner" src={settingsBanner} alt="Settings Banner" style={styles.banner} />

            {/* Content Section */}
            <div style={styles.content}>
                <h1 className="settings-title">Settings Information </h1>
                <p style={styles.description}>
                    Manage your account settings and view your login history. Below, you can see past login attempts, including the date, time, and device details.
                </p>

                <h3 style={styles.subheading}>Login History</h3>
                {loginHistory.length > 0 ? (
                    <table style={styles.table}>
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
                    <p style={styles.noHistory}>No login history found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
    },
    banner: {
        width: "100vw",
        height: "auto",
        objectFit: "cover",
        marginTop: "50px", /* Added margin above the banner */
        borderRadius: "0px",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "70%",
        maxWidth: "1400px",
    },
    description: {
        textAlign: "left",
        fontSize: "16px",
        color: "#3D2B29",
        marginBottom: "20px",
    },
    subheading: {
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "20px",
        color: "#333",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "10px",
    },
    noHistory: {
        fontSize: "16px",
        color: "#777",
    },
};

export default Settings;
