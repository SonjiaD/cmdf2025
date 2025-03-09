import React, { useState } from "react";

function Progress() {
  const [progress, setProgress] = useState(0);

  const increaseProgress = () => {
    setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Progress Bar Example</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${progress}%` }}>
          <span style={styles.label}>{progress}%</span>
        </div>
      </div>
      <button onClick={increaseProgress} style={styles.button}>
        Increase Progress
      </button>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    backgroundColor: "#e0e0df",
    borderRadius: "5px",
    overflow: "hidden",
    height: "25px",
    margin: "10px 0"
  },
  filler: {
    height: "100%",
    backgroundColor: "#4caf50",
    textAlign: "right",
    lineHeight: "25px",
    transition: "width 0.5s ease-in-out"
  },
  label: {
    padding: "5px",
    color: "white",
    fontWeight: "bold"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "10px"
  }
};

export default Progress;
