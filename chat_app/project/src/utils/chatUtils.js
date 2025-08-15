export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const generateChatTitle = (firstMessage) => {
  // Generate a title from the first message (first 50 characters)
  const title = firstMessage.length > 50 
    ? firstMessage.substring(0, 50) + '...' 
    : firstMessage;
  return title || 'New Chat';
};

export const simulateAIResponse = (userMessage) => {
  const responses = [
    `I understand you're asking about "${userMessage.substring(0, 30)}...". That's an interesting question! Let me help you with that.`,
    `Thanks for your message about "${userMessage.substring(0, 20)}...". Here's what I think about this topic.`,
    `Great question! Regarding "${userMessage.substring(0, 25)}...", I'd be happy to provide some insights.`,
    `I see you're interested in "${userMessage.substring(0, 30)}...". This is definitely worth exploring further.`,
    `That's a thoughtful question about "${userMessage.substring(0, 20)}...". Let me break this down for you.`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};