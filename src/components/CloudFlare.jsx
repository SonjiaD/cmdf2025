import React, { useState, useEffect } from "react";
import { run } from "../index.js";

const CloudFlare = ({
  inputValue,
  onBotResponse,
  onLoadingChange,
  onFetchComplete,
}) => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue) {
      const input = {
        messages: [
          {
            role: "system",
            content:
              "You are a therapist for people with speech disorders (like those caused by stroke, cerebral palsy, or autism) who have difficulty accessing speech therapy services. Your responses should be less than 3 sentences unless it really needs to be more than that.",
          },
          {
            role: "user",
            content: inputValue,
          },
        ],
      };

      const fetchData = async () => {
        onLoadingChange(true);

        try {
          const response = await run("@cf/meta/llama-3-8b-instruct", input);
          setResponseData(response);
          onBotResponse(response.result.response); // Send bot response to parent
        } catch (error) {
          setError(error);
        } finally {
          onLoadingChange(false);
          onFetchComplete(); // Notify parent that fetch is complete
        }
      };

      fetchData();
    }
  }, [inputValue, onBotResponse, onLoadingChange, onFetchComplete]);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {!responseData ? (
        <div className="loading">Thinking...</div>
      ) : (
        <div>{responseData.result.response}</div>
      )}
    </div>
  );
};

export default CloudFlare;
