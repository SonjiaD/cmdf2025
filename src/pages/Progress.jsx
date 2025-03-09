import React from "react";
import useProgressStore from "../useProgressStore";
import './ProgressBar.css';
import progressIcon from "/src/assets/banner.svg";

function Progress() {
  const { points, totalAccuracy, attempts } = useProgressStore();

  // Calculate accuracy values
  const averageAccuracy = attempts > 0 ? (totalAccuracy / attempts).toFixed(0) : 0;
  const averageWeeklyAccuracy = attempts > 0 ? ((totalAccuracy / attempts) / 7).toFixed(0) : 0;

  return (
    <div style={styles.wrapper}>
      <img className="Banner" src={progressIcon} alt="Progress Banner" style={styles.banner} />
      <div style={styles.content}>
        <h1 className="progress-title">Daily Progress</h1>
        <div style={styles.container}>
          <div style={{ ...styles.filler, width: `${points}%` }}>
            {/* <span style={styles.label}>{points}%</span> */}
          </div>
        </div>

        <h1 className="progress-title">Daily Accuracy</h1>
        <div style={styles.container}>
          <div style={{ ...styles.filler, width: `${averageAccuracy}%` }}>
            {/* <span style={styles.label}>{averageAccuracy}%</span> */}
          </div>
        </div>

        <h1 className="progress-title">Weekly Accuracy</h1>
        <div style={styles.container}>
          <div style={{ ...styles.filler, width: `${averageWeeklyAccuracy}%` }}>
            {/* <span style={styles.label}>{averageWeeklyAccuracy}%</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}

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
    margin: "0", 
    borderRadius: "0px"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: "20px 0",
  },
  container: {
    backgroundColor: "#e0e0df",
    borderRadius: "5px",
    overflow: "hidden",
    height: "60px",
    width: "50%", // Centered and adaptive width
    maxWidth: "1077px",
    margin: "10px 0"
  },
  filler: {
    height: "100%",
    backgroundColor: "#B9BD94",
    textAlign: "center",
    lineHeight: "60px",
    transition: "width 0.5s ease-in-out"
  },
  label: {
    color: "white",
    fontWeight: "bold"
  }
};

export default Progress;
