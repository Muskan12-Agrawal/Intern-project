import  { useState } from 'react';
import { Send, X } from 'lucide-react';
import { useNotesStore } from '../store';
import { getAIResponse } from '../services/aiService';

interface ChatInterfaceProps {
  onClose: () => void;
}

const ChatInterface = ({ onClose }: ChatInterfaceProps) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addMessage, notes, activeNoteId } = useNotesStore();
  
  const activeNote = notes.find(note => note.id === activeNoteId);
  const messages = activeNote?.messages || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !activeNoteId) return;
    
    // Add user message
    addMessage(activeNoteId, prompt, true);
    setPrompt('');
    
    // Get AI response
    setIsLoading(true);
    try {
      const response = await getAIResponse(prompt);
      addMessage(activeNoteId, response, false);
    } catch (error) {
      addMessage(activeNoteId, "Sorry, I couldn't process your request.", false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 md:left-auto md:right-6 md:w-96 bg-white rounded-t-lg shadow-xl border border-gray-200 z-10">
      <div className="flex items-center justify-between p-3 border-b">
        <h3 className="font-medium">AI Assistant</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={18} />
        </button>
      </div>
      
      <div className="p-4 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Ask me anything about your note!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 bg-gray-100 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t flex">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
          disabled={isLoading || !prompt.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
 