import React from 'react';
import { Plus, MessageSquare } from 'lucide-react';

export const Sidebar = ({
  sessions,
  currentSessionId,
  onNewChat,
  onSelectChat,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button 
          onClick={onNewChat}
          className="new-chat-btn"
        >
          <Plus size={20} />
          New Chat
        </button>
      </div>
      
      <div className="chat-history">
        <h3 className="history-title">Recent Chats</h3>
        <div className="history-list">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSelectChat(session.id)}
              className={`history-item ${
                currentSessionId === session.id ? 'active' : ''
              }`}
            >
              <MessageSquare size={16} />
              <span className="history-item-title">{session.title}</span>
            </button>
          ))}
          {sessions.length === 0 && (
            <div className="empty-history">
              <p>No chat history yet</p>
              <p>Start a new conversation!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};