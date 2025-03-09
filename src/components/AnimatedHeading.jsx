import React from "react";
import { motion } from "framer-motion";

function AnimatedHeading({ text, className }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={className}  // This ensures the className is applied correctly
    >
      {text}
    </motion.h1>
  );
}

export default AnimatedHeading;
