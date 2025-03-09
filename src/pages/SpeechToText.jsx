import React, { useState, useEffect } from "react";
import useProgressStore from "../useProgressStore";
import "./ProgressBar.css";

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

// List of longer tongue-twisters to practice
const words = [
    "Peter Piper picked a peck of pickled peppers",
    "She sells seashells by the seashore",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Fuzzy Wuzzy was a bear, Fuzzy Wuzzy had no hair",
    "Betty Botter bought some butter, but she said the butter’s bitter"
  ];
  
const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [targetWord, setTargetWord] = useState(words[0]);  // Start with the first word
  const [currentWordIndex, setCurrentWordIndex] = useState(0);  // Track the current word
  const { progress, increaseProgress } = useProgressStore();

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
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      setRecognition(speechRecognition);
    } else {
      console.warn("Web Speech API is not supported in this browser.");
    }
  }, [targetWord]);

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  //const increaseProgress = () => {
  //  setProgress((prev) => (prev >= 100 ? 100 : prev + 20));
  //};

  const stopRecording = () => {
    if (recognition) {
      setIsRecording(false);
      recognition.stop();
    }
  };

  const handleNextWord = () => {
    if (currentWordIndex < words.length - 1) {
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);
      setTargetWord(words[nextIndex]);
      setTranscript("");
      setAccuracy(null);
    } else {
      alert("You have completed all words! Great job!");
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold">🎙️ Speech-to-Text Practice</h2>

      {/* Display progress bar */}
      <div className="progress-container">
        <div className="progress-filler" style={{width: `${progress}%` }}>
        </div>
      </div>
      
      {/* Display current target word */}
      <div className="mt-4">
        <h3 className="text-xl">Target Phrase: <span className="font-semibold">{targetWord}</span></h3>
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
          <strong>Accuracy: </strong>{accuracy}% (Target Word: {targetWord})
        </p>
      )}

      {/* Button to go to the next word */}
      {accuracy >= 80 && (
        <button
          onClick={function(event){handleNextWord(); increaseProgress();}}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Next Phrase
        </button>
      )}
      
    </div>
  );
};

export default SpeechToText;
