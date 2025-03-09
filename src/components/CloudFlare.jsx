import React, { useState, useEffect } from "react";
import { run } from "../index.js";

const CloudFlare = ({ inputValue, onBotResponse, onLoadingChange }) => {
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
        onLoadingChange(true);

        try {
          const response = await run("@cf/meta/llama-3-8b-instruct", input);
          setResponseData(response);
          onBotResponse(response.result.response); // Send bot response to parent
        } catch (error) {
          setError(error);
        } finally {
          onLoadingChange(false);
        }
      };

      fetchData();
    }
  }, [inputValue, onBotResponse, onLoadingChange]);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {!responseData ? (
        <div>Loading...</div>
      ) : (
        <div>{responseData.result.response}</div>
      )}
    </div>
  );
};

export default CloudFlare;
