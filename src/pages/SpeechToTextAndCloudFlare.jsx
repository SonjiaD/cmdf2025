// import React, { useState, useEffect } from "react";
// import { run } from "../index.js";

// const SpeechToText = ({ onTranscriptChange, onStopRecording }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [recognition, setRecognition] = useState(null);

//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       const speechRecognition = new window.webkitSpeechRecognition();
//       speechRecognition.continuous = true;
//       speechRecognition.interimResults = true;
//       speechRecognition.lang = "en-US";

//       speechRecognition.onresult = (event) => {
//         let finalTranscript = "";
//         for (let i = 0; i < event.results.length; i++) {
//           finalTranscript += event.results[i][0].transcript;
//         }
//         setTranscript(finalTranscript);
//       };

//       speechRecognition.onerror = (event) => {
//         console.error("Speech recognition error", event.error);
//       };

//       setRecognition(speechRecognition);
//     } else {
//       console.warn("Web Speech API is not supported in this browser.");
//     }
//   }, [onTranscriptChange]);

//   const startRecording = () => {
//     if (recognition) {
//       setIsRecording(true);
//       recognition.start();
//     } else {
//       alert("Speech recognition is not supported in this browser.");
//     }
//   };

//   const stopRecording = () => {
//     if (recognition) {
//       setIsRecording(false);
//       recognition.stop();
//     }
//   };

//   return (
//     <div className="p-4 text-center">
//       <h2 className="text-2xl font-bold">🎙️ Speech-to-Text</h2>
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className={`mt-4 px-4 py-2 text-white rounded ${
//           isRecording ? "bg-red-500" : "bg-blue-500"
//         }`}
//       >
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       <p className="mt-4 text-lg">
//         {transcript ? `📝 ${transcript}` : "No transcription yet..."}
//       </p>
//     </div>
//   );
// };

// const CloudFlare = ({ inputValue }) => {
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (inputValue) {
//       const input = {
//         messages: [
//           {
//             role: "system",
//             content:
//               "You are a therapist for people with speech disorders (like those caused by stroke, cerebral palsy, or autism) who have difficulty accessing speech therapy services.",
//           },
//           {
//             role: "user",
//             content: inputValue,
//           },
//         ],
//       };

//       const fetchData = async () => {
//         try {
//           const response = await run("@cf/meta/llama-3-8b-instruct", input);
//           setResponseData(response);
//         } catch (error) {
//           setError(error);
//         }
//       };

//       fetchData();
//     }
//   }, [inputValue]);

//   return (
//     <div>
//       <h2>API Response</h2>
//       {error && <div>Error: {error.message}</div>}
//       {!responseData ? (
//         <div>Loading...</div>
//       ) : (
//         <div>{responseData.result.response}</div>
//       )}
//     </div>
//   );
// };

// const SpeechToTextAndCloudFlare = () => {
//   const [transcript, setTranscript] = useState("");
//   const [shouldFetch, setShouldFetch] = useState(false);

//   const handleTranscriptChange = (newTranscript) => {
//     setTranscript(newTranscript);
//   };

//   const handleStopRecording = () => {
//     console.log("Recording stopped, calling API...");
//     setShouldFetch(true);
//   };

//   return (
//     <div>
//       <SpeechToText
//         onTranscriptChange={handleTranscriptChange}
//         onStopRecording={handleStopRecording}
//       />
//       <CloudFlare
//         inputValue={transcript}
//         onStopRecording={handleStopRecording}
//       />
//     </div>
//   );
// };

// export default SpeechToTextAndCloudFlare;

import React, { useState, useEffect } from "react";
import { run } from "../index.js";

const SpeechToText = ({ onTranscriptChange, onStopRecording }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState(null);

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
        onTranscriptChange(finalTranscript); // Ensure the parent component gets updated
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      setRecognition(speechRecognition);
    } else {
      console.warn("Web Speech API is not supported in this browser.");
    }
  }, [onTranscriptChange]);

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
      onStopRecording(); // Notify parent when recording stops
    }
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold">🎙️ Speech-to-Text</h2>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`mt-4 px-4 py-2 text-white rounded ${
          isRecording ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <p className="mt-4 text-lg">
        {transcript ? `📝 ${transcript}` : "No transcription yet..."}
      </p>
    </div>
  );
};

const CloudFlare = ({ inputValue }) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue) {
      const input = {
        messages: [
          {
            role: "system",
            content:
              "You are a therapist for people with speech disorders (like those caused by stroke, cerebral palsy, or autism) who have difficulty accessing speech therapy services.",
          },
          {
            role: "user",
            content: inputValue,
          },
        ],
      };

      const fetchData = async () => {
        try {
          const response = await run("@cf/meta/llama-3-8b-instruct", input);
          setResponseData(response);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    }
  }, [inputValue]);

  return (
    <div>
      <h2>API Response</h2>
      {error && <div>Error: {error.message}</div>}
      {!responseData ? (
        <div>Loading...</div>
      ) : (
        <div>{responseData.result.response}</div>
      )}
    </div>
  );
};

const SpeechToTextAndCloudFlare = () => {
  const [transcript, setTranscript] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleTranscriptChange = (newTranscript) => {
    setTranscript(newTranscript);
  };

  const handleStopRecording = () => {
    console.log("Recording stopped, calling API...");
    setShouldFetch(true);
  };

  return (
    <div>
      <SpeechToText
        onTranscriptChange={handleTranscriptChange}
        onStopRecording={handleStopRecording}
      />
      {shouldFetch && <CloudFlare inputValue={transcript} />}
    </div>
  );
};

export default SpeechToTextAndCloudFlare;
