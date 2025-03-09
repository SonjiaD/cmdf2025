import { run } from "../index.js";
import { useEffect, useState } from "react";
import { FormControl, TextField } from "@mui/material";

function CloudFlare() {
  const [responseData, setResponseData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const input = {
      messages: [
        {
          role: "system",
          content:
            "You are a therapist for people with speech disorders (like those caused by stroke, cerebral palsy, or autism) who have difficulty accessing speech therapy services. ",
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

    if (inputValue) {
      fetchData();
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const input = {
        messages: [
          {
            role: "system",
            content: "You are a friendly assistant that helps write stories",
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
  };

  return (
    <div>
      <FormControl sx={{ width: "50ch", height: "100%" }}>
        <TextField
          id="outlined-basic"
          label="Text"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </FormControl>
      <h2>API Response</h2>
      {error && <div>Error: {error.message}</div>}
      {!responseData ? (
        <div>Loading...</div>
      ) : (
        <div>{responseData.result.response}</div>
      )}
    </div>
  );
}
export default CloudFlare;
