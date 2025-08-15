import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';

export const ChatArea = ({
  messages,
  onSendMessage,
  hasActiveChat,
}) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!hasActiveChat) {
    return (
      <div className="chat-area">
        <div className="welcome-screen">
          <div className="welcome-content">
            <h1>Welcome to Chat App</h1>
            <p>Start a new conversation by clicking "New Chat" in the sidebar</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <h2>Start a conversation</h2>
            <p>Type your message below to begin chatting</p>
          </div>
        ) : (
          <div className="messages-list">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};