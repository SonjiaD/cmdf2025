import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef(null);

  const API_KEY = "44102e14281a4bb7bdee0a893c63691d"; // 🔑 Replace with your key

  const startRecording = async () => {
    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new RecordRTC(stream, { type: "audio" });
      recorder.startRecording();
      recorderRef.current = recorder;
    } catch (error) {
      console.error("Microphone access denied:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    const recorder = recorderRef.current;
    recorder.stopRecording(async () => {
      const audioBlob = recorder.getBlob();
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const uploadResponse = await fetch("https://api.assemblyai.com/v2/upload", {
        method: "POST",
        headers: { "authorization": API_KEY },
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      console.log("Upload URL:", uploadData.upload_url);

      const transcribeResponse = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
          "authorization": API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({ audio_url: uploadData.upload_url }),
      });

      const transcribeData = await transcribeResponse.json();
      console.log("Transcription ID:", transcribeData.id);

      // Poll for the transcription result
      let transcription = "";
      while (!transcription) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const resultResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcribeData.id}`, {
          headers: { "authorization": API_KEY },
        });
        const resultData = await resultResponse.json();
        if (resultData.status === "completed") {
          transcription = resultData.text;
          setText(transcription);
        }
      }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Speech to Text Converter</h2>
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <p><strong>Converted Text:</strong> {text}</p>
    </div>
  );
};

export default SpeechToText;
