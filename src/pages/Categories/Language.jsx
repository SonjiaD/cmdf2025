import React from "react";
import { useNavigate } from "react-router-dom"; 
import '/src/CSS/Fluency.css';

function Language() {
  const navigate = useNavigate();

  const goToVowelRep = () => {
    navigate("/vowelrep"); // Navigate to the VowelRep page
  };

    return (
      <div>
          {/* <h1>Language practice</h1> */}
          <h1 className="title" style={{ marginTop: "150px" }}>Language practice</h1>

          <button className="button button1">Writing</button>
          <button className="button button2" onClick={goToVowelRep}>Vowel Repetition</button>
      </div>
    );
}

const styles = {
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Language;