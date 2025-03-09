import React, { useState } from "react";

function Progress() {
  const [dailyProgress, setProgress] = useState(0);

  // needs to use saved weekly data
  const [dailyAccuracy, setDailyAccuracy] = useState(0);
  const [weeklyAccuracy, setWeeklyAccuracy] = useState(0);

  // temporary until exercises are implemented
  const increaseAccuracy = () => {
    setDailyAccuracy((prev) => (prev >= 100 ? 100 : prev + 5));
    setWeeklyAccuracy((prev) => (prev >= 100 ? 100 : prev + 3));
  };

  const increaseProgress = () => {
    setProgress((prev) => (prev >= 100 ? 100 : prev + 20));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Daily Progress</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${dailyProgress}%` }}>
          <span style={styles.label}>{dailyProgress}%</span>
        </div>
      </div>
      <button onClick={increaseProgress} style={styles.button}>
        Increase Progress
      </button>
      <h1>Daily Accuracy</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${dailyAccuracy}%` }}>
          <span style={styles.label}>{dailyAccuracy}%</span>
        </div>
      </div>
      <button onClick={increaseAccuracy} style={styles.button}>
        Increase Accuracy
      </button>
      <h1>Weekly Accuracy</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${weeklyAccuracy}%` }}>
          <span style={styles.label}>{weeklyAccuracy}%</span>
        </div>
      </div>
      <button onClick={increaseAccuracy} style={styles.button}>
        Increase Accuracy
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
