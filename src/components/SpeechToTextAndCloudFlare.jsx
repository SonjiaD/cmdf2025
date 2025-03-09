import React, { useState, useEffect } from "react";
import "../CSS/SpeechToTextAndCloudFlare.css";
import CloudFlare from "./CloudFlare";
import GetText from "./GetText";

const SpeechToTextAndCloudFlare = () => {
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false); // Track visibility of chatbox

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);
  };

  const handleStopRecording = () => {
    setShouldFetch(true); // Trigger CloudFlare fetch
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

  useEffect(() => {
    if (shouldFetch && transcript) {
      handleUserMessage(transcript); // Add user's message
      setShouldFetch(false); // Prevent double-fetching
    }
  }, [shouldFetch, transcript]);

  return (
    <div className="relative">
      {/* Button to toggle chat visibility with "+" symbol */}
      <button
        className="toggle-chat-button"
        onClick={() => setIsChatVisible((prev) => !prev)}
      >
        +
      </button>

      {/* Conditionally render the chatbox */}
      {isChatVisible && (
        <div
          className={`max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg ${
            isChatVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-2xl font-semibold text-orange-500 mb-4 text-center">
            Chat with Our AI Speech Therapy Assistant
          </h2>
          <div className="h-80 overflow-y-scroll mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded ${
                  msg.type === "user" ? "bg-blue-200" : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="text-center my-2">
                <p>Loading...</p>
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
        </div>
      )}
    </div>
  );
};

export default SpeechToTextAndCloudFlare;
