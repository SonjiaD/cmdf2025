import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Exercises() {
  const navigate = useNavigate();

  return <>
    <h3>What would you like to work on today?</h3>
    <div className="board-row">
        <div className="board-row-01"><button  onClick={() => navigate("/speech-to-text")}>Articulation</button></div>
        <button className="board-row-02" onClick={() => navigate("/fluency")}>Fluency</button>
      </div>
      <div className="board-row">
        <button  className="board-row-03" onClick={() => navigate("/language")}>Language</button>
        <button  className="board-row-04" onClick={() => navigate("/understanding")}>Understanding</button>
      </div>
    </>;
}

export default Exercises;
