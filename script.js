const userInteraction = {
    birthday: null, // Store the user's birthday
};

document.addEventListener('DOMContentLoaded', () => {
    window.parent.postMessage({ action: 'fetchBirthday' }, '*'); // Request user's birthday from the main page

    window.addEventListener('message', (event) => {
        if (event.data.action === 'fetchedBirthday') {
            const userBirthday = event.data.birthday;
            if (!userBirthday) {
                appendMessage('Please enter your date and time of birth:', 'bot');
                showInputGroup();
            } else {
                userInteraction.birthday = userBirthday;
                appendMessage(`Welcome back! Your birthday is detected as: ${userBirthday}`, 'bot');
                loadQuestions('category1'); // Load the first category of questions by default
            }
        } else if (event.data.action === 'saveBirthdayResult') {
            console.log('Birthday successfully saved to the main page database.');
        } else if (event.data.action === 'error') {
            appendMessage('System error. Please try again later.', 'bot');
        }
    });

    const categories = Object.keys(questions);
    const optionsDiv = document.getElementById('options');
    categories.forEach((category) => {
        const button = document.createElement('button');
        button.textContent = `Select ${category}`;
        button.onclick = () => loadQuestions(category);
        optionsDiv.appendChild(button);
    });
});

// Save user's birthday to the main page
function saveUserBirthday(birthday) {
    window.parent.postMessage({ action: 'saveBirthday', birthday }, '*');
}

// Questions and their handlers
const questions = {
    category1: [
        { id: 'marriage', text: 'How many marriages will I have?', handler: handleMarriageQuestion },
        { id: 'partner', text: 'What will my partner look like?', handler: handlePartnerQuestion }
    ],
    category2: [
        { id: 'bazi', text: 'What is my Bazi?', handler: handleBaziQuestion },
        { id: 'fortune', text: 'Domain fortune analysis', handler: handleFortuneQuestion }
    ]
};

function loadQuestions(category) {
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = ''; // Clear existing buttons

    questions[category].forEach((question) => {
        const button = document.createElement('button');
        button.textContent = question.text;
        button.onclick = () => handleQuestion(question.handler);
        optionsDiv.appendChild(button);
    });
}

function handleQuestion(handler) {
    if (!userInteraction.birthday) {
        appendMessage('Please enter your date and time of birth first:', 'bot');
        showInputGroup();
    } else {
        handler();
    }
}

function handleMarriageQuestion() {
    const fiveElements = generateFiveElements(userInteraction.birthday);
    const response = `Based on your Five Elements balance, here are the characteristics of your marriages... (Insert analysis here).`;
    displayResponseGradually(response);
}

function handlePartnerQuestion() {
    const fiveElements = generateFiveElements(userInteraction.birthday);
    const response = `Based on your Five Elements balance, your partner might have the following traits... (Insert analysis here).`;
    displayResponseGradually(response);
}

function handleBaziQuestion() {
    const myPaipan = new PaiPanFinal();
    const response = myPaipan.getBazi(new Date(userInteraction.birthday), true);
    displayResponseGradually(response);
}

function handleFortuneQuestion() {
    window.open('/domainTest/index.html', '_blank');
}

function sendMessage(event) {
    if (event.type === 'click' || event.key === 'Enter') {
        const birthdayInput = document.getElementById('birthday-input');
        const birthdayMessage = birthdayInput.value.trim();
        if (birthdayMessage === '') return;

        userInteraction.birthday = birthdayMessage;
        saveUserBirthday(birthdayMessage); // Save to the main page database
        birthdayInput.value = '';
        document.getElementById('input-group').style.display = 'none';
        appendMessage(`Your birthday has been saved: ${birthdayMessage}`, 'user');

        loadQuestions('category1'); // Load the first category of questions by default
    }
}

function appendMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    document.getElementById('chat-box').appendChild(messageElement);

    // Scroll chat box to the latest message
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function generateFiveElements(birthday) {
    // Example logic to calculate five elements based on the birthday
    const date = new Date(birthday);
    const wood = (date.getMonth() % 5) * 20 + 20;
    const fire = (date.getDate() % 5) * 20 + 20;
    const earth = (date.getFullYear() % 5) * 20 + 20;
    const metal = (100 - wood - fire - earth) / 2;
    const water = 100 - wood - fire - earth - metal;

    return { wood, fire, earth, metal, water };
}

function displayResponseGradually(response) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement('div');
    message.classList.add('message', 'bot');
    chatBox.appendChild(message);

    let index = 0;
    const interval = setInterval(() => {
        message.innerHTML = `<p>${response.slice(0, index)}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
        index++;
        if (index > response.length) clearInterval(interval);
    }, 50);
}

function showInputGroup() {
    const inputGroup = document.getElementById('input-group');
    inputGroup.style.display = 'flex';
    document.getElementById('birthday-input').focus();
}
