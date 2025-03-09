import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Exercises() {
  const navigate = useNavigate();

  return <>
    <h3>What would you like to work on today?</h3>
    <div className="board-row">
        <button onClick={() => navigate("/articulation")}>Articulation</button>
        <button onClick={() => navigate("/fluency")}>Fluency</button>
      </div>
      <div className="board-row">
        <button onClick={() => navigate("/language")}>Language</button>
        <button onClick={() => navigate("/understanding")}>Understanding</button>
      </div>
    </>;
}

export default Exercises;
