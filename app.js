// ...existing code...
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appreciationForm');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const messagesDiv = document.getElementById('messages');
    const popup = document.getElementById('thankYouPopup');
    const closePopup = document.getElementById('closePopup');

    function getMessages() {
        return JSON.parse(localStorage.getItem('messages') || '[]');
    }

    function saveMessages(messages) {
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function renderMessages() {
        messagesDiv.innerHTML = '';
        const messages = getMessages();
        messages.forEach(msg => {
            const card = document.createElement('div');
            card.className = 'card';
            if (msg.name) {
                const name = document.createElement('div');
                name.className = 'name';
                name.textContent = msg.name;
                card.appendChild(name);
            }
            const message = document.createElement('div');
            message.textContent = msg.message;
            card.appendChild(message);
            messagesDiv.appendChild(card);
        });
    }

    function showPopup() {
        popup.style.display = 'flex';
    }
    function hidePopup() {
        popup.style.display = 'none';
    }
    closePopup.onclick = hidePopup;
    popup.onclick = function(e) {
        if (e.target === popup) hidePopup();
    };

    form.onsubmit = function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        if (message.length < 10) {
            messageInput.style.borderColor = '#ff4e50';
            messageInput.focus();
            return;
        }
        messageInput.style.borderColor = '#ffd700';
        const messages = getMessages();
        messages.push({ name, message });
        saveMessages(messages);
        renderMessages();
        form.reset();
        showPopup();
    };

    renderMessages();
});
// ...existing code...
