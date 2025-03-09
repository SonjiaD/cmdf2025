import React, { useState, useEffect } from "react";
import "../CSS/SpeechToTextAndCloudFlare.css";
import { motion } from "framer-motion";
import CloudFlare from "./CloudFlare";
import GetText from "./GetText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const SpeechToTextAndCloudFlare = () => {
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);
  };

  const handleStopRecording = () => {
    setShouldFetch(true);
  };

  const handleBotResponse = (response) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: response },
    ]);
  };

  const handleUserMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: message },
    ]);
  };

  const handleSpeakMessage = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    const selectedVoice =
      voices.find((voice) => voice.name.includes("Google US English")) ||
      voices[0];
    utterance.voice = selectedVoice;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (shouldFetch && transcript) {
      handleUserMessage(transcript);
      setShouldFetch(false);
    }
  }, [shouldFetch, transcript]);

  return (
    <div className="relative">
      {/* Toggle chat visibility */}
      <button
        className="fixed bottom-4 right-4 text-white p-3 rounded-full shadow-lg z-50 toggle-chat-button"
        onClick={() => setIsChatVisible((prev) => !prev)}
      >
        {isChatVisible ? "×" : "+"}
      </button>

      {/* Draggable chatbox */}
      {isChatVisible && (
        <motion.div
          drag
          dragElastic={0.2}
          dragConstraints={{ top: -700, bottom: 500, left: -500, right: 500 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 w-80 max-w-md p-4 bg-white rounded-lg shadow-lg z-40"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Chat with Our AI
          </h2>
          <div className="h-80 overflow-y-scroll mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded ${
                  msg.type === "user" ? "bg-blue-200" : "bg-gray-200"
                }`}
                onClick={() =>
                  msg.type === "bot" && handleSpeakMessage(msg.text)
                }
              >
                {msg.text}
                {msg.type === "bot" && (
                  <span
                    className="speaker-icon"
                    onClick={() => handleSpeakMessage(msg.text)}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </span>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="text-center my-2 load">
                <p>Thinking...</p>
              </div>
            )}
          </div>
          <GetText
            onTranscriptChange={handleTranscriptChange}
            onStopRecording={handleStopRecording}
          />
          {shouldFetch && (
            <CloudFlare
              inputValue={transcript}
              onBotResponse={handleBotResponse}
              onLoadingChange={setIsLoading}
            />
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SpeechToTextAndCloudFlare;
