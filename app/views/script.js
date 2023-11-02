let socket = io();

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('content');

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(messageInput); // Ubah content menjadi messageInput
  const payload = new URLSearchParams(formData);

  const response = await fetch('/message/send', {
    method: 'POST',
    body: payload,
  });
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}