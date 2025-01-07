import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const scriptRef = useRef(null);

  const CHATBOT_ORIGIN = "https://chatbot-embed.viasocket.com";
  const EMBED_TOKEN =
    "eyJvcmdfaWQiOiIxMjA2OSIsImNoYXRib3RfaWQiOiI2Nzc2MjQ1MzVlMTBlMTY2MzdlMzVlY2EiLCJ1c2VyX2lkIjoiMDNmYmIzZjNhMjQ5ZmZhMmE2NGE1Yjk1NDliODFlYTciLCJ2YXJpYWJsZXMiOnsia2V5IjoiV0V3aHFabDAwNUVyTWsifSwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.dKRj8kLHyn8dBPWBjCsBRRo3X_smh9CBaExX_Blu75E"; // Replace with your embed token

  // Utility function to add a message to chat history
  const addMessage = (sender, message) => {
    setChatHistory((prev) => [...prev, { sender, message }]);
  };

  // Function to send data to the chatbot
  const sendDataToChatbot = async () => {
    if (!userInput.trim()) return; // Avoid sending empty messages
    addMessage("user", userInput);

    try {
      const response = await fetch(`${CHATBOT_ORIGIN}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${EMBED_TOKEN}`, // Include your token if required
        },
        body: JSON.stringify({
          message: userInput,
          bridgeName: "Assistant", // Replace with your bridge name
          threadId: "567567", // Replace with a unique thread ID
        }),
      });

      if (!response.ok) {
        throw new Error(`Chatbot API returned status ${response.status}`);
      }

      const data = await response.json();
      addMessage("chatbot", data.reply || "No response from chatbot");
    } catch (error) {
      console.error("Error communicating with chatbot API:", error);
      addMessage("chatbot", "Error: Unable to communicate with chatbot.");
    }

    setUserInput(""); // Clear the input field
  };

  // Handle messages received from the chatbot
  const handleMessage = (event) => {
    if (event.origin !== CHATBOT_ORIGIN) {
      console.warn("Message received from an unexpected origin:", event.origin);
      return;
    }

    const receivedData = event.data;
    const chatbotMessage =
      typeof receivedData === "string"
        ? receivedData
        : JSON.stringify(receivedData); // Convert object to string if necessary

    addMessage("chatbot", chatbotMessage);
  };

  // Dynamically load the chatbot script
  useEffect(() => {
    if (!scriptRef.current) {
      const script = document.createElement("script");
      script.id = "chatbot-main-script";
      script.src = `${CHATBOT_ORIGIN}/chatbot-prod.js`;
      script.async = true;
      script.onload = () => {
        script.setAttribute("embedToken", EMBED_TOKEN);
        console.log("Chatbot script loaded successfully.");
      };
      script.onerror = (error) => {
        console.error("Error loading chatbot script:", error);
      };
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    window.addEventListener("message", handleMessage);

    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="chatbot-container" id="chatbot-container">
      <h1>ReplicaVerse</h1>
      <div className="chat-interface">
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chat-message ${
                chat.sender === "user" ? "user-message" : "chatbot-message"
              }`}
            >
              <strong>{chat.sender === "user" ? "You" : "Chatbot"}:</strong>{" "}
              {chat.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendDataToChatbot}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
