import { useState, useCallback } from 'react';
import { generateId, generateChatTitle, simulateAIResponse } from '../utils/chatUtils';

export const useChat = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  const currentSession = sessions.find(session => session.id === currentSessionId);

  const createNewChat = useCallback(() => {
    const newSession = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  }, []);

 const sendMessage = useCallback(async (content) => {
  if (!currentSessionId) return;

  const userMessage = {
    id: generateId(),
    content,
    sender: 'user',
    timestamp: new Date(),
  };

  setSessions(prev => prev.map(session => {
    if (session.id === currentSessionId) {
      const updatedMessages = [...session.messages, userMessage];
      const title = session.messages.length === 0 ? generateChatTitle(content) : session.title;
      return {
        ...session,
        title,
        messages: updatedMessages,
        updatedAt: new Date(),
      };
    }
    return session;
  }));

  try {
    const res = await fetch('http://localhost:8080/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    });

    const data = await res.json();

    let aiMessage = {
      id: generateId(),
      sender: 'ai',
      timestamp: new Date(),
      content: '',         // human-readable summary (query or message)
      rawResults: null,    // tabular data, if any
    };

    // Prepare output for SQL queries
    if (data.query && Array.isArray(data.results)) {
      aiMessage.content = `🔍 Query: ${data.query}`;
      aiMessage.rawResults = data.results;
    } else {
      // Non-SQL response (e.g., general reply)
      aiMessage.content = data.query || data.message || '⚠️ Unexpected response';
    }

    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, aiMessage],
          updatedAt: new Date(),
        };
      }
      return session;
    }));
  } catch (error) {
    const aiMessage = {
      id: generateId(),
      content: 'Error: Unable to get response from AI.',
      sender: 'ai',
      timestamp: new Date(),
    };
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        return {
          ...session,
          messages: [...session.messages, aiMessage],
          updatedAt: new Date(),
        };
      }
      return session;
    }));
  }
}, [currentSessionId]);


  const selectChat = useCallback((sessionId) => {
    setCurrentSessionId(sessionId);
  }, []);

  return {
    sessions,
    currentSession,
    createNewChat,
    sendMessage,
    selectChat,
  };
};