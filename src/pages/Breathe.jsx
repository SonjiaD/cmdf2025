import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BreathingExercise = () => {
  const [phase, setPhase] = useState("Inhale");
  const [prevScale, setPrevScale] = useState(1); // Store the previous scale value

  useEffect(() => {
    const cycleBreathing = () => {
      setPhase("Inhale");
      setTimeout(() => setPhase("Hold"), 4000); // Transition to Hold after Inhale
      setTimeout(() => setPhase("Exhale"), 7000); // Transition to Exhale after Hold
      setTimeout(() => setPhase("Hold"), 11000); // Transition to Hold after Exhale
    };
    cycleBreathing();
    const interval = setInterval(cycleBreathing, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update the prevScale when the phase changes to Inhale or Exhale
    if (phase === "Inhale") {
      setPrevScale(1.5);
    } else if (phase === "Exhale") {
      setPrevScale(0.8);
    }
  }, [phase]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Guided Breathing Exercise</h2>
      <motion.div
        animate={{
          scale: phase === "Hold" ? prevScale : phase === "Inhale" ? 1.5 : 0.8,
          opacity: phase === "Hold" ? 0.6 : 1, // Reduce opacity during Hold
        }}
        transition={{
          duration: phase === "Hold" ? 0 : 4, // No transition time during Hold
          ease: "easeInOut",
        }}
        style={styles.circle}
      />
      <p style={styles.phaseText}>{phase}</p>
      <p style={styles.instructions}>
        Breathe in as the circle expands. Hold when it stops. Exhale as it shrinks.
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#E0F7FA",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  circle: {
    width: "80px",
    height: "80px",
    backgroundColor: "#007BFF",
    borderRadius: "50%",
    marginBottom: "20px",
  },
  phaseText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  instructions: {
    fontSize: "16px",
    textAlign: "center",
    width: "60%",
  },
};

export default BreathingExercise;
