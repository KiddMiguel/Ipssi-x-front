import React, { useEffect, useState } from "react";

const WsConnection = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8088");
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      const initialMessage = JSON.stringify({
        type: "connection",
        message: "New client connected",
      });
      socket.send(initialMessage);
    };

    socket.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log("Received message:", receivedMessage);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `WebSocket connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("WebSocket connection closed unexpectedly");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageObject = { type: "message", message };
      ws.send(JSON.stringify(messageObject));
      setMessage(""); // Clear the input after sending the message
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div>
      <h1>WebSocket Connection</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default WsConnection;
