document.addEventListener('DOMContentLoaded', (event) => {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    function addMessage(message, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.classList.add('typing-indicator');
        indicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    function removeTypingIndicator(indicator) {
        chatMessages.removeChild(indicator);
    }

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';

            const typingIndicator = addTypingIndicator();

            fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            })
            .then(response => response.json())
            .then(data => {
                removeTypingIndicator(typingIndicator);
                addMessage(data.response);
            })
            .catch((error) => {
                console.error('Error:', error);
                removeTypingIndicator(typingIndicator);
                addMessage('Sorry, there was an error processing your request.');
            });
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial greeting
    setTimeout(() => {
        addMessage("Hello! I'm the August Biomedical Assistant. I'm here to help you with any questions about our organic body care products. How can I assist you today?");
    }, 1000);
});