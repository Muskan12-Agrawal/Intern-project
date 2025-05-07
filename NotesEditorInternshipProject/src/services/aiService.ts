//  This simulates an API call to an AI service
export const getAIResponse = async (prompt: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock responses
  const responses = [
    "I've analyzed your request and here are my thoughts on that topic.",
    "That's an interesting question. Based on my knowledge, I would suggest...",
    "Here's what I found about your question. Let me break it down for you.",
    "I understand what you're asking. From my perspective, there are several approaches to consider.",
    "Thanks for your question! I've processed the information and here's my response.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
 