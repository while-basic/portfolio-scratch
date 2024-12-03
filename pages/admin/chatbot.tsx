import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { MessageSquare, Send, Settings, Trash2, Download } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: 'Hello! How can I help you today?', timestamp: '10:00 AM' },
    { id: 2, type: 'user', content: 'How do I create a new project?', timestamp: '10:01 AM' },
    { id: 3, type: 'bot', content: 'To create a new project, go to the Projects section and click the "Add Project" button. Fill in the required details and save.', timestamp: '10:01 AM' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        type: 'user',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <MessageSquare className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold">Chatbot</h1>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Chat
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Configure Bot
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <form onSubmit={handleSend} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="font-semibold mb-4">Quick Responses</h2>
              <div className="space-y-2">
                {[
                  'Hello! How can I help?',
                  'Could you please provide more details?',
                  'Let me check that for you.',
                  'Is there anything else you need help with?'
                ].map((response, index) => (
                  <button
                    key={index}
                    onClick={() => setNewMessage(response)}
                    className="w-full text-left p-2 rounded hover:bg-gray-100 text-sm"
                  >
                    {response}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Chatbot;
