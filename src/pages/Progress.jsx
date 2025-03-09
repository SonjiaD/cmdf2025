import React, { useState } from "react";
import useProgressStore from "../useProgressStore";

function Progress() {
  //const [dailyProgress, setProgress] = useState(0);
  //const {points} = useContext(ProgressContext);
  //const { progress} = useProgressStore();
  const points = useProgressStore((state) => state.points);

  // needs to use saved weekly data
  const [dailyAccuracy, setDailyAccuracy] = useState(0);
  const [weeklyAccuracy, setWeeklyAccuracy] = useState(0);

  const increaseAccuracy = () => {
    setDailyAccuracy((prev) => (prev >= 100 ? 100 : prev + 5));
    setWeeklyAccuracy((prev) => (prev >= 100 ? 100 : prev + 3));
  };
  
  

  // buttons are temporary until exercises are implemented
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Daily Progress</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${points}%` }}>
          <span style={styles.label}>{points}%</span>
        </div>
      </div>
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