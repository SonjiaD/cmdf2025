import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Settings from "./pages/Settings";
import Progress from "./pages/Progress";
import SpeechToText from "./pages/SpeechToText";
import Breathe from "./pages/Breathe";
import VowelRep from "./pages/VowelRep";
import "./App.css";
import Login from "./pages/Login";

import Articulation from "./pages/Categories/Articulation";
import Fluency from "./pages/Categories/Fluency";
import Language from "./pages/Categories/Language";
import Understanding from "./pages/Categories/Understanding";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    // Listen for changes in localStorage (when user logs in)
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("user"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <BrowserRouter>
      <MainContent isAuthenticated={isAuthenticated} />
    </BrowserRouter>
  );
}

function MainContent({ isAuthenticated }) {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login"; // Hide navbar on login page

  return (
    <>
      {showNavbar && <Navbar />} {/* Show navbar on all pages except login */}
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Redirect to login if not authenticated */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Protected Routes (Only accessible if logged in) */}
        {isAuthenticated && (
          <>
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/articulation" element={<Articulation />} />
            <Route path="/fluency" element={<Fluency />} />
            <Route path="/language" element={<Language />} />
            <Route path="/understanding" element={<Understanding />} />
            <Route path="/speech-to-text" element={<SpeechToText />} />
            <Route path="/breathe" element={<Breathe />} />
            <Route path="/vowelrep" element={<VowelRep />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
