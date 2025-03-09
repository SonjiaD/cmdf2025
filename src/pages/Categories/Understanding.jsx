import React, { useState, useEffect } from "react";
import useProgressStore from "../../useProgressStore";
import "../ProgressBar.css";
import AlligatorImage from "../../assets/PGalligator.svg";
import RainbowImage from "../../assets/PGrainbow.svg";
import FootballImage from "../../assets/PGfootball.svg";
import MMImage from "../../assets/PGm&m.svg";
import CarrotImage from "../../assets/PGcarrot.svg";

// Levenshtein Distance function to compare strings (text comparison)
const getLevenshteinDistance = (a, b) => {
  const tmp = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;

  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[a.length][b.length];
};

// List of words associated with images
const words = [
  "Alligator",
  "Rainbow",
  "Football",
  "M&M",
  "Carrot"
];

// List of images
const images = [
  AlligatorImage, 
  RainbowImage, 
  FootballImage, 
  MMImage, 
  CarrotImage
];
  
  
const Understanding = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [targetWord, setTargetWord] = useState(words[0]);  // Start with the first word
  const [targetImage, setTargetImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);  // Track the current word
  const [currentDone, setCurrentDone] = useState(0); 
  const [attempts, setAttempts] = useState(0); // Track number of attempts
  const [requiredAccuracy, setRequiredAccuracy] = useState(80);
  const { progress, increaseProgress, setMatchAccuracy } = useProgressStore();

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = "en-US";

      speechRecognition.onresult = (event) => {
        let finalTranscript = "";
        for (let i = 0; i < event.results.length; i++) {
          finalTranscript += event.results[i][0].transcript;
        }
        setTranscript(finalTranscript);
        console.log(event);

        // Phonetic matching
        const userTranscript = finalTranscript.toLowerCase();
        const distance = getLevenshteinDistance(userTranscript, targetWord.toLowerCase());
        const maxLength = Math.max(userTranscript.length, targetWord.length);
        const matchAccuracy = ((1 - distance / maxLength) * 100).toFixed(2);

        setAccuracy(matchAccuracy);
        setMatchAccuracy(matchAccuracy); // set global accuracy
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      setRecognition(speechRecognition);
    } else {
      console.warn("Web Speech API is not supported in this browser.");
    }
  }, [targetWord]);

  // Adjust accuracy requirement based on attempts
  useEffect(() => {
    if (attempts >= 3) {
      // Lower accuracy if too many attempts
      setRequiredAccuracy(70);
    } else if (attempts === 0) {
       // Default starting accuracy
      setRequiredAccuracy(80);
    }
  }, [attempts]);

  {/*Start recording audio*/}
  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  {/*Stop recording audio*/}
  const stopRecording = () => {
    if (recognition) {
      setIsRecording(false);
      recognition.stop();
    }
  };

  // calculate a random int between the 0th index and the length of the list - 1
  function randomInt() {
    return Math.floor(Math.random() * (words.length - 1));
  }

  const handleNextWord = () => {
    if (currentDone < 4) {
      const nextIndex = randomInt();
      const nextDone = currentDone + 1;
      setCurrentIndex(nextIndex);
      setCurrentDone(nextDone);
      setTargetWord(words[nextIndex]);
      setTargetImage(images[nextIndex]);
      setTranscript("");
      setAccuracy(null);
    } else {
      alert("You have completed all words! Great job!");
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold" style={{ marginTop: "150px" }}>🎙️ Image Identification</h2>


      {/* Display progress bar */}
      <div className="progress-container">
        <div className="progress-filler" style={{width: `${progress}%` }}>
        </div>
      </div>

      {/* Display Image */}
      <div className="mt-4">
        <img src={targetImage} alt={targetWord} className="mx-auto h-40" />
      </div>
      
      {/* Display current target word */}
      <div className="mt-4">
        <h3 className="text-xl">Target Descriptor: <span className="font-semibold">{targetWord}</span></h3>
      </div>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`mt-4 px-4 py-2 text-white rounded ${isRecording ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <p className="mt-4 text-lg">
        {transcript ? `📝 ${transcript}` : "No transcription yet..."}
      </p>

      {/* Display accuracy score */}
      {accuracy !== null && (
        <p className="mt-4">
          <strong>Accuracy: </strong>{accuracy}% (Target Descriptor: {targetWord})
        </p>
      )}

      {/* Button to go to the next word */}
      {accuracy >= requiredAccuracy && (
        <button
          onClick={function(event){handleNextWord(); increaseProgress();}}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Next Image
        </button>
      )}
      
    </div>
  );
};

export default Understanding;