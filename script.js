const userInteraction = {
            birthday: null, // Store the user's birthday
            currentCategory: null, // Track the current category
            bazi: null, //shengxiao + bazi
            riyuan : null,
            yuezhi : null,
        };

        document.addEventListener('DOMContentLoaded', () => {
                 window.parent.postMessage({ action: 'fetchBirthday' }, '*');
                   //alert("fetch birthday.");
            // Listen for messages from the main page
            window.addEventListener('message', (event) => {
                console.log("get message from parent to handle this:",event.data.action);
                        
                if (event.data.action === 'fetchedBirthday') {
                    const userBirthday = event.data.birthday;
                    if (!userBirthday) {
                        appendMessage('Please enter your date and time of birth:', 'bot');
                        showInputGroup();
                    } else {
                        console.log("get message from parent to handle this birthday message:",event.data.action);
                        //alert("display birthday.");        
                        userInteraction.birthday = userBirthday;
                        updateBaziZodiac();
                        appendMessage(`Welcome back! Your birthday is detected as: ${userBirthday}`, 'bot');
                        loadCategories();
                    }
                } else if (event.data.action === 'pointsDeducted') {
                        
                    
                        //alert("get pointsDeducted message."+event.data.handler.handler);
                        console.log("get message from parent to handle this handler:",event.data.handler.handler);
                        handleQuestion(event.data.handler.handler);
                    
                }
            });

            // Add event listeners for the birthday input and button
            const sendButton = document.getElementById('send-button');
            const birthdayInput = document.getElementById('birthday-input');
            sendButton.addEventListener('click', sendMessage);
            birthdayInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage(e);
                }
            });
        });

        // Save user's birthday to the main page
        function saveUserBirthday(birthday) {
            window.parent.postMessage({ action: 'saveBirthday', birthday }, '*');
        }

        // Define categories and questions
        const categories = {
            Self: [
                { id: 'ioe', text: 'Am I an Introvert (I) or an Extrovert (E)?', handler: 'handleIOEQuestion' },
                { id: 'zodiac', text: 'What is my zodiac sign?', handler: 'handleZodiacQuestion' },
                { id: 'marriage', text: 'How many marriages will I have?', handler: 'handleMarriageQuestion' },
                { id: 'partner', text: 'What will my partner look like?', handler: 'handlePartnerQuestion' }
            ],
            Love: [
                { id: 'compatibility', text: 'How compatible are we?', handler: 'handleCompatibilityQuestion' },
                { id: 'love-future', text: 'What is my love future?', handler: 'handleLoveFutureQuestion' }
            ],
            Work: [
                { id: 'career-path', text: 'What is my career path?', handler: 'handleCareerPathQuestion' },
                { id: 'success', text: 'What will bring me success?', handler: 'handleSuccessQuestion' }
            ],
        };

        // Load categories
        function loadCategories() {
            const optionsDiv = document.getElementById('options');
            optionsDiv.innerHTML = ''; // Clear existing buttons

            Object.keys(categories).forEach((category) => {
                const button = document.createElement('button');
                button.textContent = category;
                button.onclick = () => loadQuestions(category);
                optionsDiv.appendChild(button);
            });

            // Add Modify Birthday button
            const modifyButton = document.createElement('button');
            modifyButton.textContent = 'Modify Birthday';
            modifyButton.onclick = showInputGroup;
            optionsDiv.appendChild(modifyButton);
        }

        // Load questions for a selected category
        function loadQuestions(category) {
            userInteraction.currentCategory = category;
            const optionsDiv = document.getElementById('options');
            optionsDiv.innerHTML = ''; // Clear existing buttons

            categories[category].forEach((question) => {
                const button = document.createElement('button');
                button.textContent = question.text;
                button.onclick = () => {
                    window.parent.postMessage({ action: 'deductPoints', handler: question.handler }, '*');
                };
                optionsDiv.appendChild(button);
            });

            // Add Back button to return to categories
            const backButton = document.createElement('button');
            backButton.textContent = 'Back to Categories';
            backButton.onclick = loadCategories;
            optionsDiv.appendChild(backButton);
        }

        function handleQuestion(handlerName) {
            if (typeof window[handlerName] === 'function') {
                window[handlerName]();
            } else {
                appendMessage('Error: Invalid handler specified.', 'bot');
            }
        }
        function getRiYuan(inputString) {
                        
                        const parts = String(inputString).split(','); // 使用逗号分割字符串
                            if (parts.length >= 6) {
                                return parts[5]; // 第六个逗号前的部分在数组中是第 5 个索引
                            }
                            return null; // 如果没有足够的部分，返回 null
            }
         function getYueZhi(inputString) {
                        const parts = String(inputString).split(','); // 使用逗号分割字符串
                            if (parts.length >= 6) {
                                return parts[4]; // 第六个逗号前的部分在数组中是第 4 个索引
                            }
                            return null; // 如果没有足够的部分，返回 null
            }
        function updateBaziZodiac() {
            //birthDate = new Date(1979, 02, 01, 04, 30); // 1983年1月10日12:30
            // birthDate = new Date(); // 1983年1月10日12:30
            //const lunar = new Lunar(new Date());
            mypaipan = new PaiPanFinal();
            const dateObject = new Date(userInteraction.birthday);
            userInteraction.bazi = mypaipan.getBazi(dateObject,true);
            userInteraction.riyuan = getRiYuan(userInteraction.bazi);
            userInteraction.yuezhi = getYueZhi(userInteraction.bazi);


            console.log("此人信息【" + userInteraction.bazi + "】"); 
        }
        function checkIOE() {
                inputChar = userInteraction.riyuan;
                const tianGanE = ['甲', '丙', '戊', '庚', '壬']; // 定义返回 'E' 的天干
                return tianGanE.includes(inputChar) ? 'Extrovert (E)' : 'Introvert (I)';
        }
        function handleIOEQuestion() {
            const response = `You likely fall into the  `+checkIOE() +' category, if you were to take the MBTI test.';
            
            displayResponseGradually(response);
        }
        function getZodiac() {
                        inputString = userInteraction.bazi;
                        const parts = String(inputString).split(','); // 使用逗号分割字符串
                            if (parts.length >= 6) {
                                return parts[0]; // 第六个逗号前的部分在数组中是第 0 个索引
                            }
                            return null; // 如果没有足够的部分，返回 null
            }
        function handleZodiacQuestion() {
            const response = ` Your Chinese zodiac sign is  `+getZodiac() +' .';
            
            displayResponseGradually(response);
        }
            
        function handleMarriageQuestion() {
            const response = `Based on your Five Elements balance, here are the characteristics of your marriages...`;
            displayResponseGradually(response);
        }

        function handlePartnerQuestion() {
            const response = `Based on your Five Elements balance, your partner might have the following traits...`;
            displayResponseGradually(response);
        }

        function handleCompatibilityQuestion() {
            const response = `Compatibility analysis based on your Five Elements balance...`;
            displayResponseGradually(response);
        }

        function handleLoveFutureQuestion() {
            const response = `Your love future looks promising...`;
            displayResponseGradually(response);
        }

        function handleCareerPathQuestion() {
            const response = `Your career path analysis suggests...`;
            displayResponseGradually(response);
        }

        function handleSuccessQuestion() {
            const response = `Success will come through diligence and...`;
            displayResponseGradually(response);
        }

        function sendMessage(event) {
            const birthdayInput = document.getElementById('birthday-input');
            const birthdayMessage = birthdayInput.value.trim();
            if (!birthdayMessage) {
                appendMessage('Please enter a valid date and time of birth.', 'bot');
                return;
            }

            userInteraction.birthday = birthdayMessage;
            updateBaziZodiac();
            saveUserBirthday(birthdayMessage);
            birthdayInput.value = '';
            document.getElementById('input-group').style.display = 'none';
            appendMessage(`Your birthday has been saved: ${birthdayMessage}`, 'user');
            loadCategories();
        }

        function appendMessage(text, sender) {
            const chatBox = document.getElementById('chat-box');
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender}`;
            messageElement.textContent = text;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight;
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
