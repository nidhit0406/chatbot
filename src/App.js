import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  //   useEffect(() => {
  //   // Listen for messages from parent window (Shopify admin)
  //   window.addEventListener('message', (event) => {
  //     if (event.data.type === 'shopify:init') {
  //       // You can handle shop-specific initialization here
  //     }
  //   });
    
  //   // Tell Shopify admin we're ready
  //   if (window.parent !== window) {
  //     window.parent.postMessage({ type: 'app:ready' }, '*');
  //   }
  // }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages([...messages, newMessage]);
    setInput('');
    console.log(process.env.REACT_APP_BACKEND_URL);
    

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
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
