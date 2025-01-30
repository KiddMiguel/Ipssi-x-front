import './MessageList.css';

const MessageList = ({ conversations, onSelectUser, selectedUser }) => {
  return (
    <div className="message-list">
      {conversations.map((conversation) => (
        <div 
          key={conversation.id}
          className={`conversation-item ${selectedUser?.id === conversation.id ? 'selected' : ''}`}
          onClick={() => onSelectUser(conversation)}
        >
          <div className="conversation-avatar">
            {conversation.username.charAt(0)}
          </div>
          <div className="conversation-info">
            <h4>{conversation.username}</h4>
            <p>{conversation.lastMessage}</p>
          </div>
          {conversation.unread > 0 && (
            <div className="unread-badge">{conversation.unread}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
