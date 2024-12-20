import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";


const Chatbot = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      // Fetch employee data (assuming you have an endpoint for this)
      const employeeResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/employee`
      );
      const employeeData = employeeResponse.data;

      // Fetch history data
      const historyResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/checkin/history/all`
      );
      const historyData = historyResponse.data;

      // Combine data into a context string
      const employeeContext = JSON.stringify(employeeData);
      const historyContext = JSON.stringify(historyData);

      const combinedPrompt = ` 
      Given the following data:
      Employee Data: ${employeeContext}
      Checkin History Data: ${historyContext}.
      checkInTime field in Checkin History Data is the time that the employee checked in who has the employee_id field in CheckIn History and Employee Data.
      Check the data and answer the following question with specific result not coding:
      User Prompt: ${input}
    `;

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/chatbot`,
        {
          prompt: combinedPrompt,
        }
      );


      const geminiMessage = {
        id: messages.length + 2,
        text: response.data.text,
        sender: "gemini",
      };

      setMessages((prevMessages) => [...prevMessages, geminiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error here
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "80%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        margin: "2rem",
        mb: "24px",
      }}
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              justifyContent:
                message.sender === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            {message.sender === "gemini" && (
              <Avatar sx={{ mr: 1 }}>G</Avatar> // Replace 'G' with an appropriate icon or image for Gemini
            )}
            <Paper
              elevation={1}
              sx={{
                p: 1.5,
                maxWidth: "70%",
                bgcolor: message.sender === "user" ? theme.palette.primary[500] : theme.palette.primary[200],
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ p: 1, display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          }}
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default Chatbot;
