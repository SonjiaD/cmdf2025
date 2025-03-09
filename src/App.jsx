import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Settings from "./pages/Settings";
import Progress from "./pages/Progress";
import SpeechToText from "./pages/SpeechToText";


import Articulation from "./pages/Categories/Articulation";
import Fluency from "./pages/Categories/Fluency";
import Language from "./pages/Categories/Language";
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
        <Route path="/articulation" element={<Articulation />} />
        <Route path="/fluency" element={<Fluency />} />
        <Route path="/language" element={<Language />} />
        <Route path="/understanding" element={<Understanding />} />
        <Route path="/speech-to-text" element={<SpeechToText />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
