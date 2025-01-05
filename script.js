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
                { id: 'nature', text: 'If my personality were reflected in nature, would I be a tree, the sun, or a stream?', handler: 'handleNatureQuestion' },
                { id: 'stranger', text: 'What impression do I leave on strangers?', handler: 'handleStrangerQuestion' },
                { id: 'familiar', text: 'How am I perceived by those who are familiar with me?', handler: 'handleFamiliarQuestion' },
                { id: 'myself', text: 'What is my true inner self?', handler: 'handleMyselfQuestion' }
                        
            ],
            Love: [
                { id: 'compatibility', text: 'How compatible are we?', handler: 'handleCompatibilityQuestion' },
                { id: 'love-future', text: 'What is my love future?', handler: 'handleLoveFutureQuestion' },        
                { id: 'marriage', text: 'How many marriages will I have?', handler: 'handleMarriageQuestion' },
                { id: 'partner', text: 'What will my partner look like?', handler: 'handlePartnerQuestion' }
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
 function getBaziByIndex(bazi,number){
                     const parts = String(bazi).split(','); // 使用逗号分割字符串
                            if (parts.length >= 6) {
                                return parts[number]; // 第六个逗号前的部分在数组中是第 5 个索引
                            }
                            return null; // 如果没有足够的部分，返回 null
        }

function getTianGanTraits(tianGan) {
    const tianGanTraits = {
        "甲": "Strong-willed, upright, and ambitious, like a towering tree. However, can be stubborn, inflexible, and overly aggressive.",
        "乙": "Gentle, adaptable, and creative, like a graceful vine. However, may be indecisive, overly sensitive, and prone to self-doubt.",
        "丙": "Optimistic, enthusiastic, and passionate, like the blazing sun. However, can be impulsive, impatient, and easily frustrated.",
        "丁": "Thoughtful, caring, and resourceful, like a lamp in the dark. However, may be overly cautious, overthink, and emotionally vulnerable.",
        "戊": "Stable, dependable, and protective, like solid walls. However, can be rigid, resistant to change, and overly protective.",
        "己": "Empathetic, nurturing, and patient, like the earth. However, may be overly accommodating, lack assertiveness, and prone to self-sacrifice.",
        "庚": "Resolute, determined, and sharp-minded, like a blade. However, can be harsh, uncompromising, and overly critical.",
        "辛": "Delicate, elegant, and meticulous, like fine silver. However, may be overly perfectionistic, hesitant, and lack spontaneity.",
        "壬": "Bold, visionary, and dynamic, like a grand river. However, can be restless, overly ambitious, and prone to emotional outbursts.",
        "癸": "Quiet, introspective, and intuitive, like a gentle stream. However, may be overly introverted, avoid confrontation, and lack initiative."
    };

    return tianGanTraits[tianGan] || "Invalid input: Please enter a valid Heavenly Stem character.";
}
function getDiZhiPersonality(diZhi) {
    const diZhiPersonality = {
        "子": "Smart, adaptable, and charming, but can be secretive and restless.",
        "丑": "Hardworking, reliable, and patient, but can be overly cautious and stubborn.",
        "寅": "Ambitious, confident, and brave, but may be impulsive and aggressive.",
        "卯": "Gentle, kind, and artistic, but can be overly sensitive and indecisive.",
        "辰": "Charismatic, imaginative, and resourceful, but can be proud and unpredictable.",
        "巳": "Wise, passionate, and intuitive, but may be jealous and manipulative.",
        "午": "Energetic, enthusiastic, and open-hearted, but can be impatient and reckless.",
        "未": "Compassionate, creative, and dependable, but may be shy and overly self-critical.",
        "申": "Clever, versatile, and curious, but can be mischievous and unreliable.",
        "酉": "Diligent, detail-oriented, and independent, but may be vain and critical.",
        "戌": "Loyal, honest, and protective, but can be pessimistic and stubborn.",
        "亥": "Compassionate, intuitive, and idealistic, but may be naive and escapist."
    };

    return diZhiPersonality[diZhi] || "Invalid input: Please enter a valid Earthly Branch character.";
}
function handleMyselfQuestion() {
            const response = `This is what your true inner personality is like: \n\n `+getDiZhiPersonality(getBaziByIndex(userInteraction.bazi,4)) +'\n\n'+getDiZhiPersonality(getBaziByIndex(userInteraction.bazi,6))+'\n\n'+getDiZhiPersonality(getBaziByIndex(userInteraction.bazi,2)) +'';
            
            displayResponseGradually(response);
        }

function handleStrangerQuestion() {
            const response = `This is the impression you leave on people when they first meet you: \n\n `+getTianGanTraits(getBaziByIndex(userInteraction.bazi,1)) +'\n\n'+getTianGanTraits(getBaziByIndex(userInteraction.bazi,3)) +'';
            
            displayResponseGradually(response);
        }

function handleFamiliarQuestion() {
            const response = `Here's the impression you leave on people who are familiar with you: \n\n `+getTianGanTraits(getBaziByIndex(userInteraction.bazi,5)) +'\n\n' +'';
            
            displayResponseGradually(response);
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
function getRiYuanDescription(tianGan) {
            
    const tianGanMap = {
        "甲": "A towering tree under the vast sky",
        "乙": "A winding and graceful vine",
        "丙": "The blazing and radiant sun",
        "丁": "A lamp in the dark night",
        "戊": "Solid walls and sturdy dikes",
        "己": "The nurturing earth embracing all",
        "庚": "A sharp and imposing blade or axe",
        "辛": "Delicate and exquisite silver jewelry",
        "壬": "A grand and majestic river",
        "癸": "A gentle and quiet flowing stream"
    };

    return tianGanMap[tianGan] || "Invalid input: Please enter a valid Heavenly Stem character.";
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

 function handleNatureQuestion() {
            const response = `If your personality were reflected in nature, you would be: `+getRiYuanDescription( userInteraction.riyuan) +' .';
            
            displayResponseGradually(response);
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

        function displayResponseGradually(responseOrigin) {

            const response = responseOrigin.replace(/\n/g, '<br>');
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
