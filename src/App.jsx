import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Settings from "./pages/Settings";
import Progress from "./pages/Progress";
import SpeechToText from "./pages/SpeechToText"; // ✅ Import



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/speech-to-text" element={<SpeechToText />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
