import React, { useEffect, useState } from "react";

const WsConnection = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isConnected) {
      const socket = new WebSocket("ws://localhost:8088");
      setWs(socket);

      socket.onopen = () => {
        console.log("WebSocket connection established");
        const initialMessage = JSON.stringify({
          type: "connection",
          message: userName,
        });
        socket.send(initialMessage);
      };

      socket.onmessage = (event) => {
        try {
          const receivedMessage = JSON.parse(event.data);
          console.log("Received message:", receivedMessage);

          if (receivedMessage.type === "users") {
            setUsers(receivedMessage.users);
          } else if (receivedMessage.type === "message") {
            setMessages((prevMessages) => [
              ...prevMessages,
              { from: receivedMessage.from, message: receivedMessage.message },
            ]);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
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
    }
  }, [isConnected, userName]);

  const handleSendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN && selectedUser) {
      const messageObject = {
        type: "message",
        from: userName,
        to: selectedUser.id,
        message,
      };
      ws.send(JSON.stringify(messageObject));
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: userName, message },
      ]);
      setMessage(""); // Clear the input after sending the message
    } else {
      console.error("WebSocket is not open or no user selected");
    }
  };

  const handleConnect = () => {
    if (userName.trim() !== "") {
      setIsConnected(true);
    } else {
      alert("Please enter your name to connect.");
    }
  };

  return (
    <div>
      {!isConnected ? (
        <div>
          <h1>Enter your name to connect</h1>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleConnect}>Connect</button>
        </div>
      ) : (
        <div>
          <h1>WebSocket Connection</h1>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage}>Send</button>
          <h2>Connected Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedUser?.id === user.id ? "bold" : "normal",
                }}
              >
                {user.name}
              </li>
            ))}
          </ul>
          <h2>Messages</h2>
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.from === userName ? "sent" : "received"
                }`}
              >
                <strong>{msg.from}:</strong> {msg.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WsConnection;
