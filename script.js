// script.js

let selectedQuestion = null;
let birthday = null;

function selectQuestion(questionNumber) {
    selectedQuestion = questionNumber;
    if (questionNumber === 1) {
        appendMessage('您选择了问题：我的婚姻会有几次', 'bot');
    } else if (questionNumber === 2) {
        appendMessage('您选择了问题：我的女朋友长什么样子', 'bot');
    } else if (questionNumber === 3) {
        window.open('/domainTest/index.html', '_blank');
        return; // Do not proceed further for domainTest
    } else if (questionNumber === 4) {
        window.open('/luckyTest/index.html', '_blank');
        return; // Do not proceed further for luckyTest
    } else if (questionNumber === 5) {
        appendMessage('您选择了问题：我的八字是什么', 'bot');
    } else {
        selectCustomQuestion();
        return; // Do not proceed further for custom question
    }

    if (birthday === null) {
        appendMessage('请输入您的生日和时间：', 'bot');
        document.getElementById('input-group').style.display = 'flex';
        document.getElementById('birthday-input').focus();
    } else {
        processMessage();
    }
}

function switchBirthday() {
    birthday = null;
    appendMessage('请重新输入您的生日和时间：', 'bot');
    document.getElementById('input-group').style.display = 'flex';
    document.getElementById('birthday-input').focus();
}

function selectCustomQuestion() {
    appendMessage('定制问题，请联系WhatsAPP: +18328736076 Mr. Guess', 'bot');
}

function sendMessage(event) {
    if (event.type === 'click' || event.key === 'Enter') {
        const birthdayInput = document.getElementById('birthday-input');
        const birthdayMessage = birthdayInput.value.trim();
        if (birthdayMessage === '') return;

        birthday = birthdayMessage;
        birthdayInput.value = '';
        document.getElementById('input-group').style.display = 'none';
        appendMessage(birthdayMessage, 'user');

        if (selectedQuestion !== null) {
            processMessage();
        }
    }
}

function appendMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    document.getElementById('chat-box').appendChild(messageElement);
}

document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('send-button');
    const birthdayInput = document.getElementById('birthday-input');

    sendButton.addEventListener('click', sendMessage);
    birthdayInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage(e);
        }
    });
});

function processMessage() {
    let response = '';
    const fiveElements = generateFiveElements(birthday);

    if (selectedQuestion === 1) {
        response = `根据您的五行比例，您的婚姻会有以下特点...（这里提供具体分析）。`;
    } else if (selectedQuestion === 2) {
        response = `根据您的五行比例，您的女朋友可能会有以下特点...（这里提供具体分析）。`;
    }else if (selectedQuestion === 5) {
        myPaipan = new PaiPanFinal();
        response = myPaipan.getBazi(new Date(birthday),true);
    }

    displayThinkingAnimation();

    setTimeout(() => {
        removeThinkingAnimation();
        displayResponseGradually(response);
    }, 2000 + Math.random() * 2000); // Simulate thinking time between 2 to 4 seconds
}

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regex)) return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

function generateFiveElements(birthday) {
    const date = new Date(birthday);
    const wood = (date.getMonth() % 5) * 20 + 20;
    const fire = (date.getDate() % 5) * 20 + 20;
    const earth = (date.getFullYear() % 5) * 20 + 20;
    const metal = (100 - wood - fire - earth) / 2;
    const water = 100 - wood - fire - earth - metal;

    return {
        wood,
        fire,
        earth,
        metal,
        water
    };
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

function displayThinkingAnimation() {
    const chatBox = document.getElementById('chat-box');
    const thinking = document.createElement('div');
    thinking.classList.add('thinking');
    thinking.innerHTML = '<span></span><span></span><span></span>';
    chatBox.appendChild(thinking);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeThinkingAnimation() {
    const thinking = document.querySelector('.thinking');
    if (thinking) {
        thinking.remove();
    }
}

// Display welcome message when the page loads
window.onload = function() {
    appendMessage('欢迎来到五行算性格网站！您可以选择以下问题开始：', 'bot');
    appendMessage('1. 我的婚姻会有几次\n2. 我的女朋友长什么样子\n3. 域名吉凶测算\n4. 定制问题\n请点击相应的按钮来选择问题。', 'bot');
}

// Event listener for enter key
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage(event);
    }
});

// Event listener for send button click
document.getElementById('send-button').addEventListener('click', sendMessage);

document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value;
        if (message.trim() !== '') {
            addMessage(message, 'user');
            userInput.value = '';
            processMessage(message);
        }
    }

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        if (sender === 'bot') {
            const logoElement = document.createElement('img');
            logoElement.src = 'logo.webp';
            logoElement.classList.add('logo');
            messageElement.appendChild(logoElement);
        }
        messageElement.appendChild(document.createTextNode(text));
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    
});
