import React from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { ThemeToggle } from './components/ThemeToggle';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import './styles/App.css';

function App() {
  const { 
    sessions, 
    currentSession, 
    createNewChat, 
    sendMessage, 
    selectChat 
  } = useChat();
  
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <div className="app-header">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      
      <div className="app-content">
        <Sidebar
          sessions={sessions}
          currentSessionId={currentSession?.id || null}
          onNewChat={createNewChat}
          onSelectChat={selectChat}
        />
        
        <ChatArea
          messages={currentSession?.messages || []}
          onSendMessage={sendMessage}
          hasActiveChat={!!currentSession}
        />
      </div>
    </div>
  );
}

export default App;