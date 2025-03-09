import React from "react";

function ProgressBar({ progress }) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${progress}%` }}>
          <span style={styles.label}>{progress}%</span>
        </div>
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
    }
  };
  
  export default ProgressBar;
