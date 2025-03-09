import React from "react";
import { motion } from "framer-motion";

function AnimatedHeading({ text }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl font-bold text-center text-orange-600 mb-6"
    >
      {text}
    </motion.h1>
  );
}

export default AnimatedHeading;
