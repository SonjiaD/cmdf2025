import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

/*importing icons*/
import homeIcon from "/src/assets/home.svg"; // Correct path to your SVG file
import exercisesIcon from "/src/assets/exercise.svg";
import progressIcon from "/src/assets/progress.svg";
import settingsIcon from "/src/assets/settings.svg"; 


function Navbar() {
  return (
    
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/" className="navbar-Title">Pr0nunc!ate</Link>
        </li>
        <li>
          <Link to="/">
          <img src={homeIcon} alt="Home"/>
          Home</Link>
        </li>
        <li>
          <Link to="/exercises">
          <img src={exercisesIcon} alt="exercises"/>
          Exercises</Link></li>
        <li>
          <Link to="/progress">
          <img src={progressIcon} alt="progress"/>
          Progress</Link>
        </li>
        <li>
          <Link to="/settings">
          <img src={settingsIcon} alt="settings"/>
          Settings
          </Link></li>
        {/* <li><Link to="/speech-to-text">Speech to Text</Link></li> {/* Added Link */}
        {/* <li><Link to="/breathe">Breathe</Link></li> Added Link */} 
        {/* <li><Link to="/settings">Settings</Link></li> */}
        
        <li><Link to="/login">Login</Link></li>

      </ul>
    </nav>
  );
}

export default Navbar;