import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Dynamically add the chatbot script
    const script = document.createElement("script");
    script.id = "chatbot-main-script";
    script.src = "https://chatbot-embed.viasocket.com/chatbot-prod.js";
    script.async = true;
    script.setAttribute(
      "embedToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMjA2OSIsImNoYXRib3RfaWQiOiI2Nzc2MjQ1MzVlMTBlMTY2MzdlMzVlY2EiLCJ1c2VyX2lkIjoiaGdqZ2poIn0.g_leEwfTrGZHAmQxkU-gpjvDY5Fwmds3tMfK0B-DpT8"
      //   "hideIcon":true
    );
    script.setAttribute("hideIcon", true);
    document.head.appendChild(script);

    // Once the script is loaded, send data to the chatbot
    script.onload = () => {
      if (window.SendDataToChatbot) {
        window.SendDataToChatbot({
          bridgeName: "Assistant",
          threadId: 123456,
          hideIcon: false,
        });
      }
    };

    return () => {
      document.head.removeChild(script); // Clean up the script when component unmounts
    };
  }, []);

  return <div id="chatbot-container"></div>;
};

export default Chatbot;
