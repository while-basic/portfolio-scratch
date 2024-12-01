import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button, Notification } from 'shadcn';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = supabase.auth.session();
    setIsAuthenticated(!!session);

    if (session) {
      fetchMessages();
    }
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) setNotification(error.message);
    else setMessages(data);
  };

  const handleSendMessage = async () => {
    if (!isAuthenticated) {
      setNotification('Please sign in to send messages.');
      return;
    }
    const { error } = await supabase.from('messages').insert([{ content: newMessage }]);
    if (error) setNotification(error.message);
    else {
      setNewMessage('');
      fetchMessages();
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <div className="chat-history">
            {messages.map((msg, index) => (
              <div key={index}>{msg.content}</div>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      ) : (
        <Notification>Please sign in to use the chat feature.</Notification>
      )}
      {notification && <Notification>{notification}</Notification>}
    </div>
  );
};

export default Chat;
