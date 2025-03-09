import { useState } from 'react';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProgressBar from "./components/Progressbar";

function Home() {
  return <h1>Home Page</h1>;
}

function Exercises() {
  return <h1>Exercises</h1>;
}

function Progress() {
  const [progress, setProgress] = useState(0);

  const increaseProgress = () => {
    setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Progress Bar Example</h1>
      <ProgressBar progress={progress} />
      <button onClick={increaseProgress} style={styles.button}>
        Increase Progress
      </button>
    </div>
  );
}

function Settings() {
  return <>
    <h1>Settings</h1>
    <p>This is the settings page</p>
    <div class="settingsContainer">
      <p>Name: </p>
      <input></input>
    </div>
    </>;
}

function App() {
  /*const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  let recognition;

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setText(transcript);
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert('Speech recognition not supported');
    }
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
    setIsListening(false);
  };
*/
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

/*
<div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Speech to Text</h1>
        <textarea
          className="w-full max-w-2xl h-80 p-4 border border-gray-300 rounded-md mb-4"
          value={text}
          placeholder="Your speech will appear here..."
          readOnly />
        <div className="flex gap-4">
          <button
            className={`px-6 py-2 rounded-md text-white ${isListening ? 'bg-red-500' : 'bg-blue-500'}`}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
        </div>
      </div></>
*/

const styles = {
  button: {
    padding: "10px 20px",
    marginTop: "10px",
    background: "#4caf50",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px"
  }
};

export default App;
