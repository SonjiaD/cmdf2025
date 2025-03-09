import React from "react";
import { motion } from "framer-motion";

function ContentBox({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl border-4 border-orange-300"
    >
      <h2 className="text-2xl font-semibold text-orange-500 mb-4">{title}</h2>
      {children}
    </motion.div>
  );
}

export default ContentBox;
