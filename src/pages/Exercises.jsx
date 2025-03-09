import React from "react";

function Exercises() {
  return <>
    <h3>What would you like to work on today?</h3>
    <div className="board-row">
        <button className="square">Articulation</button>
        <button className="square">Fluency</button>
      </div>
      <div className="board-row">
        <button className="square">Speaking</button>
        <button className="square">Understanding</button>
      </div>
    </>;
}

export default Exercises;
