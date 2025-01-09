const userInteraction = {
            birthday: null, // Store the user's birthday
            currentCategory: null, // Track the current category
            bazi: null, //shengxiao + bazi
            riyuan : null,
            yuezhi : null,
            baziWuxing : null,
            gender: null,
        };

        document.addEventListener('DOMContentLoaded', () => {
                 window.parent.postMessage({ action: 'fetchBirthday' }, '*');
                 const tooltip = document.getElementById('tooltip');
                        // 点击时显示提示文案   
                        tooltip.style.display = 'none'; // 显示提示   
                        console.log("display1 indicate...");
                    
                   //alert("fetch birthday.");
            // Listen for messages from the main page
            window.addEventListener('message', (event) => {
                console.log("get message from parent to handle this:",event.data.action);

    
                        
    const genderModal = document.getElementById('genderModal');
    const maleButton = document.getElementById('maleButton');
    const femaleButton = document.getElementById('femaleButton');

    // 生日输入完成后触发弹框
    document.getElementById('birthday-input').addEventListener('change', () => {
        genderModal.style.display = 'block';
    });

    // 处理用户选择性别
    maleButton.addEventListener('click', () => {
        handleGenderSelection('Male');
    });

    femaleButton.addEventListener('click', () => {
        handleGenderSelection('Female');
    });

    function handleGenderSelection(gender) {
        genderModal.style.display = 'none';
        console.log('选择的性别是:', gender);
        // 在这里调用其他逻辑，比如计算结果
        userInteraction.gender = gender;
    }

    
                if (event.data.action === 'fetchedBirthday') {
                    const userBirthday = event.data.birthday;
                    if (!userBirthday) {
                        appendMessage('Please enter your date and time of birth:', 'bot');
                        showInputGroup();
                    } else {
                        console.log("get message from parent to handle this birthday message:",event.data.action);
                        //alert("display birthday.");   
                        const [birthday, gender] = userBirthday.split('.');
                        userInteraction.birthday = birthday;
                        userInteraction.gender = gender;
                        updateBaziZodiac();
                        appendMessage(`Welcome back! Currently, the provided birthday and gender are: ${userBirthday}`, 'bot');
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
        function saveUserBirthdayGender(bd,gender) {
            const birthday = bd+'.'+gender;
            window.parent.postMessage({ action: 'saveBirthday', birthday }, '*');
            
        }

        // Define categories and questions
        const categories = {
            Self: [
                { id: 'ioe', text: 'Am I an Introvert (I) or an Extrovert (E)?', handler: 'handleIOEQuestion' },
                { id: 'zodiac', text: 'What is my Chinese zodiac sign?', handler: 'handleZodiacQuestion' },
                { id: 'nature', text: 'If my personality were reflected in nature, would I be a tree, the sun, or a stream?', handler: 'handleNatureQuestion' },
                { id: 'stranger', text: 'What impression do I leave on strangers?', handler: 'handleStrangerQuestion' },
                { id: 'familiar', text: 'How am I perceived by those who are familiar with me?', handler: 'handleFamiliarQuestion' },
                { id: 'confident', text: 'Am I a confident person?', handler: 'handleConfidentQuestion' },
                { id: 'calm', text: 'Am I someone who can handle situations calmly?', handler: 'handleCalmQuestion' },
                { id: 'adaptable', text: 'Am I adaptable when handling situations?', handler: 'handleAdaptableQuestion' },
                { id: 'courageous', text: 'Am I a courageous person?', handler: 'handleCourageousQuestion' },
                { id: 'compassionate', text: 'Am I a compassionate person?', handler: 'handleCompassionateQuestion' },
                { id: 'promises', text: 'Am I someone who values promises?', handler: 'handlePromisesQuestion' },
                { id: 'myself', text: 'What is my true inner self?', handler: 'handleMyselfQuestion' }
                        
            ],
            Love: [
                { id: 'ideal', text: 'What does my ideal partner look like?', handler: 'handleIdealPartnerQuestion' },
                { id: 'sexpopular', text: 'Am I someone who is popular with the opposite sex?', handler: 'handleSexPopularQuestion' },        
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
            modifyButton.textContent = 'Modify Birthday & Gender';
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
                //添加滑动提示，如果遇到什么问题
                console.log("before display indicate...");
                if(question.text === 'What is my Chinese zodiac sign?'){
                        const tooltip = document.getElementById('tooltip');
                        // 点击时显示提示文案   
                        tooltip.style.display = 'block'; // 显示提示   
                        console.log("display indicate...");
                }
                console.log("after display indicate...");
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

function handleCalmQuestion() {
            let result = '';
            if( checkElementInString('金',userInteraction.baziWuxing) == false){
                        result = 'You are NOT a calm person at all.';
            }else if(checkCharacterAtPosition('金',userInteraction.baziWuxing,4) || checkCharacterAtPosition('金',userInteraction.baziWuxing,5) || checkCharacterAtPosition('金',userInteraction.baziWuxing,6)){
                        result = 'You are a typical calm person.';
            }else{
                        result = 'You are somewhat a calm person, but not in a very typical sense.';            
            
            }  
               
            const response = result;
            
            displayResponseGradually(response);
        }
function handleConfidentQuestion() {
            const response = `Actually you are `+determineConfidence(userInteraction.baziWuxing) +' person.';
            
            displayResponseGradually(response);
        }
function handleAdaptableQuestion() {
            let result = '';
            let ele = '水';
            const des = 'adaptable';
            if( checkElementInString(ele,userInteraction.baziWuxing) == false){
                        result = 'You are NOT an'+ des+' person at all.';
            }else if(checkCharacterAtPosition(ele,userInteraction.baziWuxing,4) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,5) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,6)){
                        result = 'You are a typical '+ des+' person.';
            }else{
                        result = 'You are somewhat an '+ des+' person, but not in a very typical sense.';            
            
            }  
               
            const response = result;
            
            displayResponseGradually(response);
        }
function handleCourageousQuestion() {
            let result = '';
            let ele = '木';
            const des = 'courageous';
            if( checkElementInString(ele,userInteraction.baziWuxing) == false){
                        result = 'You are NOT a'+ des+' person at all.';
            }else if(checkCharacterAtPosition(ele,userInteraction.baziWuxing,4) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,5) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,6)){
                        result = 'You are a typical '+ des+' person.';
            }else{
                        result = 'You are somewhat a '+ des+' person, but not in a very typical sense.';            
            
            }  
               
            const response = result;
            
            displayResponseGradually(response);
        }

function handleCompassionateQuestion() {
            let result = '';
            let ele = '火';
            const des = 'compassionate';
            if( checkElementInString(ele,userInteraction.baziWuxing) == false){
                        result = 'You are NOT a'+ des+' person at all.';
            }else if(checkCharacterAtPosition(ele,userInteraction.baziWuxing,4) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,5) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,6)){
                        result = 'You are a typical '+ des+' person.';
            }else{
                        result = 'You are somewhat a '+ des+' person, but not in a very typical sense.';            
            
            }  
               
            const response = result;
            
            displayResponseGradually(response);
        }
function handlePromisesQuestion() {
            let result = '';
            let ele = '土';
            const des = 'commitment-minded';
            if( checkElementInString(ele,userInteraction.baziWuxing) == false){
                        result = 'You are NOT a'+ des+' person at all.';
            }else if(checkCharacterAtPosition(ele,userInteraction.baziWuxing,4) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,5) || checkCharacterAtPosition(ele,userInteraction.baziWuxing,6)){
                        result = 'You are a typical '+ des+' person.';
            }else{
                        result = 'You are somewhat a '+ des+' person, but not in a very typical sense.';            
            
            }  
               
            const response = result;
            
            displayResponseGradually(response);
        }
 function getBaziByIndex(bazi,number){
                     const parts = String(bazi).split(','); // 使用逗号分割字符串
                            if (parts.length >= 6) {
                                return parts[number]; // 第六个逗号前的部分在数组中是第 5 个索引
                            }
                            return null; // 如果没有足够的部分，返回 null
        }


function handleMyselfQuestion() {
            let result = getDiZhiPersonality(getBaziByIndex(userInteraction.bazi,4));
            if(getBaziByIndex(userInteraction.bazi,4) !== getBaziByIndex(userInteraction.bazi,6)){
                        result += '\n\n '+getDiZhiPersonality(getBaziByIndex(userInteraction.bazi,6));
            }
            if(getBaziByIndex(userInteraction.bazi,2) !== getBaziByIndex(userInteraction.bazi,4) && getBaziByIndex(userInteraction.bazi,2) !== getBaziByIndex(userInteraction.bazi,6)){
                        result += '\n\n '+getDiZhiPersonality(getBaziByIndex(userInteraction.bazi,2));
            }
            const response = `This is what your true inner personality is like: \n\n ` + result +'';
            
            displayResponseGradually(response);
        }

function handleStrangerQuestion() {
            let result = getTianGanTraits(getBaziByIndex(userInteraction.bazi,1));
            if(getBaziByIndex(userInteraction.bazi,1) !== getBaziByIndex(userInteraction.bazi,3)){
                        result += '\n\n '+getTianGanTraits(getBaziByIndex(userInteraction.bazi,3));
            }
            const response = `This is the impression you leave on people when they first meet you: \n\n ` + result +'';
            
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
            userInteraction.baziWuxing = transformGanZhiToWuXing(userInteraction.bazi);

            console.log("此人信息【" + userInteraction.bazi + userInteraction.baziWuxing + "】"); 
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
            saveUserBirthdayGender(birthdayMessage,userInteraction.gender);
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
