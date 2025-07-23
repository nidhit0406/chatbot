import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const res = await axios.post('https://5271e692bfef.ngrok-free.app/chat', {
        message: input,
      });

      const aiReply = { role: 'assistant', content: res.data.reply };
      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'AI Error occurred.' }]);
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
