import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

const Chatbot = () => {
  const location = useLocation();
  const { replicaName, replicaDescription, replicaPersona } = location.state;

  const generateRandomThreadId = () => {
    return String(nanoid(9));
  };

  const newThreadId = generateRandomThreadId();

  useEffect(() => {
    const scriptId = "chatbot-main-script";
    const scriptSrc = "https://chatbot-embed.viasocket.com/chatbot-prod.js";
    const chatbotToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMjA2OSIsImNoYXRib3RfaWQiOiI2Nzc2MjQ1MzVlMTBlMTY2MzdlMzVlY2EiLCJ1c2VyX2lkIjoiaGdqZ2poIn0.g_leEwfTrGZHAmQxkU-gpjvDY5Fwmds3tMfK0B-DpT8";

    // Remove existing script if it exists
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = scriptSrc;
    script.async = true;
    script.setAttribute("embedToken", chatbotToken);
    script.setAttribute("hideIcon", "true"); // Hide the floating icon since we're opening full screen

    script.onload = () => {
      if (window.openChatbot && window.SendDataToChatbot) {
        // Open chatbot in full screen mode
        window.openChatbot();

        // Send data to initialize the chatbot
        window.SendDataToChatbot({
          bridgeName: "Assistant",
          threadId: String(newThreadId),
          fullScreen: "true", // Ensure full screen mode
          variables: {
            name: replicaName,
            description: replicaDescription,
            persona: replicaPersona,
          },
        });
      }
    };

    script.onerror = () => {
      console.error("Failed to load chatbot script");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [replicaName, replicaDescription, replicaPersona, newThreadId]);

  // Return null since we're opening the chatbot in full screen
  return null;
};

export default Chatbot;
