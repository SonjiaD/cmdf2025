import React from "react";
import useProgressStore from "../useProgressStore";
import './ProgressBar.css';
import progressIcon from "/src/assets/exerciseBanner.jpg";

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
        <p style={styles.description}>Tracks how many activities have been fully completed that day. Reaches 100% after 5 fully completed tasks.</p>
        <div style={styles.container}>
          <div style={{ ...styles.filler, width: `${points}%` }}></div>
        </div>
        
        <h1 className="progress-title">Daily Accuracy</h1>
        <p style={styles.description}>Calculates the accuracy from all activities completed today (adds up total accuracy and divides by number of attempts).</p>
        <div style={styles.container}>
          <div style={{ ...styles.filler, width: `${averageAccuracy}%` }}></div>
        </div>
        
        <h1 className="progress-title">Weekly Accuracy</h1>
        <p style={styles.description}>Calculates the accuracy from all activities completed this week (adds up total accuracy and divides by number of attempts, then divides by 7).</p>
        <div style={styles.container}>
          <div style={{ ...styles.filler, width: `${averageWeeklyAccuracy}%` }}></div>
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
        width: "100%",
    },
    banner: {
        width: "100%",  // Use 100% to make sure it spans the full width
        height: "auto", 
        objectFit: "cover",
        marginTop: "50px", // Margin above the banner
        borderRadius: "0px",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "70%",
        maxWidth: "1400px",
    },
    container: {
        backgroundColor: "#e0e0df",
        borderRadius: "5px",
        overflow: "hidden",
        height: "60px",
        width: "100%",
        margin: "10px 0"
    },
    filler: {
        height: "100%",
        backgroundColor: "#B9BD94",
        textAlign: "center",
        lineHeight: "60px",
        transition: "width 0.5s ease-in-out"
    },
    description: {
        textAlign: "left",
        fontSize: "16px",
        color: "#3D2B29",
    }
};

export default Progress;
