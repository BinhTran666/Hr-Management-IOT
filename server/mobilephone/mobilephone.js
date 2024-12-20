import fetch from "node-fetch";

const BOT_TOKEN = "8092471964:AAGhLWjZ7pi1-OhMJC1rKAKBnnAkhynbHuY"; // Replace with your bot token
const CHAT_ID = "-1002299176643";     // Replace with the chat ID

export const sendTelegramMessage= async(message) => {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHAT_ID,
    text: message,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Message sent successfully!");
    } else {
      console.error("Failed to send message:", await response.text());
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Example usage
//sendTelegramMessage("Điểm danh em nhé");
