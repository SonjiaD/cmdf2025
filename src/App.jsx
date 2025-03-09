import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Settings from "./pages/Settings";
import Progress from "./pages/Progress";
import SpeechToText from "./pages/SpeechToText"; // ✅ Import


import Articulation from "./pages/Categories/Articulation";
import Fluency from "./pages/Categories/Fluency";
import Speaking from "./pages/Categories/Speaking";
import Understanding from "./pages/Categories/Understanding";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
