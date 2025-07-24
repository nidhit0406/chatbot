(function() {
  if (window.ChatbotLoaded) return;
  window.ChatbotLoaded = true;

  const iframe = document.createElement("iframe");
  iframe.src = "https://chatbot-iota-rose.vercel.app";
  iframe.style.cssText = `
    position: fixed; bottom: 20px; right: 20px;
    width: 380px; height: 600px;
    border: none; z-index: 99999;
    box-shadow: 0 0 15px rgba(0,0,0,0.3);
    display: none;
  `;
  document.body.appendChild(iframe);

  // Toggle button
  const btn = document.createElement('button');
  btn.textContent = '💬 AI Chat';
  btn.style.cssText = `
    position: fixed; bottom: 20px; right: 20px;
    padding: 10px 15px; background: #5c6ac4;
    color: white; border-radius: 4px; cursor: pointer;
  `;
  btn.onclick = () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  };
  document.body.appendChild(btn);
})();