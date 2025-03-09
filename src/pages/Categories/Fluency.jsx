import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function Fluency() {
  const navigate = useNavigate(); // Initialize navigate

  const goToBreathing = () => {
    navigate("/breathe"); // Navigate to the "breathe" page
  };

  return (
    <div>
      <h1>Fluency practice</h1>
      <button style={styles.button}>Slow speech</button>
      <button style={styles.button} onClick={goToBreathing}>Deep breathing</button>
      <button style={styles.button}>Pausing</button>
    </div>
  );
}

const styles = {
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Fluency;
