import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageList from "../Components/MessageList/MessageList";
import "../assets/styles/pages/Messages.css";
import { getUsers } from "../redux/authSlice/authSlice";

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [ws, setWs] = useState(null);
  const { user, users, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Récupérer les users
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Mettre à jour les conversations quand les users changent
  useEffect(() => {
    if (status === "success" && users) {
      setConversations(users);
    }
  }, [status, users]);

  // Gestion de la connexion WebSocket
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8070");
    
    socket.onopen = () => {
      console.log("WebSocket connecté");
      // Envoyer l'ID de l'utilisateur pour l'identification
      socket.send(JSON.stringify({
        type: "CONNECT",
        userId: user._id,
      }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message reçu:", data);

        if (data.type === "MESSAGE") {
          setMessagesList(prev => [...prev, {
            sender: data.sender,
            receiver: data.receiver,
            content: data.content
          }]);
        }
      } catch (error) {
        console.error("Erreur parsing message:", error);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [user._id]);

  const sendMessage = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    if (ws && selectedUser && messageInput.trim() !== "") {
      const newMessage = {
        type: "MESSAGE",
        sender: user._id,
        receiver: selectedUser._id,
        content: messageInput
      };

      ws.send(JSON.stringify(newMessage));

      // Ajouter le message à la liste locale
      setMessagesList(prev => [...prev, {
        sender: user._id,
        receiver: selectedUser._id,
        content: messageInput
      }]);

      setMessageInput(""); // Vider l'input
    }
  };

  if (status === "loading") return <div>Chargement...</div>;
  if (status === "failed") return <div>Erreur de chargement</div>;

  return (
    <div className="messages-container">
      <div className="users-sidebar">
        <div className="sidebar-header">
          <h2>Conversations</h2>
          <input
            type="search"
            placeholder="Rechercher..."
            className="search-input"
          />
        </div>
        <MessageList
          conversations={conversations}
          onSelectUser={setSelectedUser}
          selectedUser={selectedUser}
        />
      </div>
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <h3>{selectedUser.username}</h3>
            </div>
            <div className="messages-list">
              {messagesList.map((message, index) => (
                <div
                  key={index}
                  className={`message-item ${
                    message.sender === user._id ? "sent" : "received"
                  }`}
                >
                  <div className="message-content">
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="message-input-container">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Écrivez votre message..."
              />
              <button type="submit">Envoyer</button>
            </form>
          </>
        ) : (
          <div className="no-conversation-selected">
            <p>Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
