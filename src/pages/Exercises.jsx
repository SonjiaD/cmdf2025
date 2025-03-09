import React from "react";
import { useNavigate } from "react-router-dom";
import './Exercises.css';

function Exercises() {
  const navigate = useNavigate();

  return (
    <>
      <h3 className="exercises-Title">What would you like to work on today?</h3>
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
