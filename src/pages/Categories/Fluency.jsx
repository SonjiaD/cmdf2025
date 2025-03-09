import React from "react";
import { useNavigate } from "react-router-dom";
import '/src/CSS/Fluency.css';

function Fluency() {
  const navigate = useNavigate();

  const goToBreathing = () => {
    navigate("/breathe"); 
  };

  return (
    <div>
    <h1 className="title" style={{ marginTop: "150px" }}>Fluency practice</h1>
      
      <button className="button button1">Slow speech</button>
      <button className="button button2" onClick={goToBreathing}>Deep breathing</button>
      <button className="button button3">Pausing</button>
    </div>
  );
}

export default Fluency;
