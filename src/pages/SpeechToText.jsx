import React, { useState, useEffect } from "react";
import useProgressStore from "../useProgressStore";
import mascotImage from "/src/assets/logoMouth.svg"; 
import "./ProgressBar.css";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [targetWord, setTargetWord] = useState("Peter Piper picked a peck of pickled peppers");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
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

        const userTranscript = finalTranscript.toLowerCase();
        const distance = getLevenshteinDistance(userTranscript, targetWord.toLowerCase());
        const maxLength = Math.max(userTranscript.length, targetWord.length);
        const matchAccuracy = ((1 - distance / maxLength) * 100).toFixed(2);

        setAccuracy(matchAccuracy);
        setMatchAccuracy(matchAccuracy);
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

      <div className="progress-container">
        <div className="progress-filler" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="target-phrase-wrapper mt-4">
  <img src={mascotImage} alt="Mascot" className="mascot-image" />
  <div className="target-phrase-container">
    <h3 className="text-xl">Target Phrase: <span className="font-semibold">{targetWord}</span></h3>
  </div>
</div>



      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`mt-4 px-4 py-2 text-white rounded ${isRecording ? "bg-red-500" : "bg-blue-500"}`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <div className="chat-box">
        <p className="mt-4 text-lg">
          {transcript ? `📝 ${transcript}` : "No transcription yet..."}
        </p>
      </div>

      {accuracy !== null && (
        <p className="mt-4">
          <strong>Accuracy: </strong>{accuracy}% (Target Word: {targetWord})
        </p>
      )}

      {accuracy >= 80 && (
        <button
          onClick={function(event) { handleNextWord(); increaseProgress(); }}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Next Phrase
        </button>
      )}
    </div>
  );
};

export default SpeechToText;
