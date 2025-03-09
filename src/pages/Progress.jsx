import React, { useState } from "react";
import useProgressStore from "../useProgressStore";
import './ProgressBar.css';
import progressIcon from "/src/assets/banner.svg"; 


function Progress() {
  const { points, totalAccuracy, attempts } = useProgressStore();

  // calculate average accuracy for the day
  const averageAccuracy = attempts > 0 ? (totalAccuracy / attempts).toFixed(0) : 0;

  // calculate average accuracy for the day
  const averageWeeklyAccuracy = attempts > 0 ? ((totalAccuracy / attempts)/7).toFixed(0) : 0;

    


  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      
      <img className="Banner" src={progressIcon} alt="Progress Banner" style={styles.banner} />


      <h1 className="progress-title">Daily Progress</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${points}%` }}>
          <span style={styles.label}>{points}%</span>
        </div>
      </div>

      <h1 className="progress-title">Daily Accuracy</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${averageAccuracy}%` }}>
          <span style={styles.label}>{averageAccuracy}%</span>
        </div>
      </div>

    
      <h1 className="progress-title">Weekly Accuracy</h1>
      <div style={styles.container}>
        <div style={{ ...styles.filler, width: `${averageWeeklyAccuracy}%` }}>
          <span style={styles.label}>{averageWeeklyAccuracy}%</span>
        </div>
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
    height: "60px",
    width: "1077px",
    margin: "10px 0"
  },
  filler: {
    height: "100%",
    backgroundColor: "#B9BD94",
    textAlign: "center",
    lineHeight: "50px",
    transition: "width 0.5s ease-in-out"
  },
  label: {
    padding: "15px",
    color: "white",
    fontWeight: "bold"
  },
  button: {
    padding: "20px 20px",
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