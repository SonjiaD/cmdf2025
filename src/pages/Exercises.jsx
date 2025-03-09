import React from "react";
import { useNavigate } from "react-router-dom";
import "./Exercises.css";
import AnimatedHeading from "../components/AnimatedHeading";
import exerciseBanner from "/src/assets/banner.svg";


function Exercises() {
  const navigate = useNavigate();

  return (
    <>
      <img className="Banner" src={exerciseBanner} alt="Exercise Banner" />
      
      <div className="title-container">
      <div className="text-container">
        <AnimatedHeading className="title" text="What would you like to learn?" />
      </div>
    </div>      

<div className="board-row">
        <button
          className="board-box board-box-articulation"
          onClick={() => navigate("/speech-to-text")}
        >
          <span>Articulation</span>
        </button>
        <button
          className="board-box board-box-fluency"
          onClick={() => navigate("/fluency")}
        >
          <span>Fluency</span>
        </button>
      </div>
      <div className="board-row">
        <button
          className="board-box board-box-language"
          onClick={() => navigate("/language")}
        >
          <span>Language</span>
        </button>
        <button
          className="board-box board-box-understanding"
          onClick={() => navigate("/understanding")}
        >
          <span>Understanding</span>
        </button>
      </div>
    </>
  );
}

export default Exercises;
