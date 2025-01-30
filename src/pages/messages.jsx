import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessageList from '../Components/MessageList/MessageList';
import '../assets/styles/pages/Messages.css';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useSelector((state) => state.auth);

  // Simuler des données de conversation (à remplacer par votre API)
  useEffect(() => {
    setConversations([
      { id: 1, username: "John Doe", lastMessage: "Salut !", unread: 2 },
      { id: 2, username: "Jane Smith", lastMessage: "À plus tard!", unread: 0 },
      // Ajoutez plus de conversations ici
    ]);
  }, []);

  return (
    <div className="messages-container">
      <div className="users-sidebar">
        <div className="sidebar-header">
          <h2>Conversations</h2>
          <input type="search" placeholder="Rechercher..." className="search-input" />
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
              {/* Messages will be displayed here */}
            </div>
            <div className="message-input-container">
              <input type="text" placeholder="Écrivez votre message..." />
              <button>Envoyer</button>
            </div>
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
