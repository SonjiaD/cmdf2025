import React from "react"; 
import { useNavigate } from "react-router-dom";
import "./Exercises.css";
import AnimatedHeading from "../components/AnimatedHeading";
import exerciseBanner from "/src/assets/learn.jpg";

function Exercises() {
  const navigate = useNavigate();

  const exercises = [
    { name: "Articulation", path: "/speech-to-text", description: "Improve speech clarity and pronunciation.", className: "board-box-articulation" },
    { name: "Fluency", path: "/fluency", description: "Enhance speech flow and reduce stuttering.", className: "board-box-fluency" },
    { name: "Language", path: "/language", description: "Develop vocabulary and sentence structure.", className: "board-box-language" },
    { name: "Understanding", path: "/understanding", description: "Improve comprehension and listening skills.", className: "board-box-understanding" }
  ];

  return (
    <>
      <img className="banner" src={exerciseBanner} alt="Exercise Banner" />


      <div className="board">
        {exercises.map((exercise, index) => (
          <button 
            className={`board-box ${exercise.className}`} 
            key={index} 
            onClick={() => navigate(exercise.path)}
          >
            <span className="exercise-title">{exercise.name}</span>
            <p className="exercise-description">{exercise.description}</p>
          </button>
        ))}
      </div>
    </>
  );
}

export default Exercises;
