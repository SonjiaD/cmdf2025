import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/exercises">Exercises</Link></li>
        <li><Link to="/progress">Progress</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/speech-to-text">Speech to Text</Link></li> {/* Added Link */}
        <li><Link to="/breathe">Breathe</Link></li> {/* Added Link */}

      </ul>
    </nav>
  );
}

export default Navbar;