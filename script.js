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

    const data = event.data;
    console.log("event.data:",data);
    // 确认消息的事件类型是 error，并且消息内容是 "用户未登录"
    if (((data.action === "error") ||(data.event === "error"))  && data.message === "用户未登录") {
        // 在页面上显示未登录提示，或者进行其他处理
        console.log("您尚未登录，请先登录！");
        appendMessage(`Please Log In Or Free Sign Up and Get 5 Points!`, 'bot');
        
    }
                        
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
                        appendMessage('Welcome, Seeker. The stars have guided you here. What burden weighs on your heart today?(Type your birthday and gender below to begin):', 'bot');
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
            
            // DeepSeek event listeners
            const deepseekSendBtn = document.getElementById('deepseek-send-btn');
            const deepseekInput = document.getElementById('deepseek-input');
            
            if (deepseekSendBtn) {
                deepseekSendBtn.addEventListener('click', sendDeepSeekMessage);
            }
            
            if (deepseekInput) {
                deepseekInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        sendDeepSeekMessage();
                    }
                });
            }
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
                { id: 'swipe', text: 'Please Swipe Left for More Questions', handler: 'handleSwipeQuestion' },
                { id: 'nature', text: 'If my personality were reflected in nature, would I be a tree, the sun, or a stream?', handler: 'handleNatureQuestion' },
                { id: 'confident', text: 'Am I a confident person?', handler: 'handleConfidentQuestion' },
                { id: 'calm', text: 'Am I someone who can handle situations calmly?', handler: 'handleCalmQuestion' },
                { id: 'adaptable', text: 'Am I adaptable when handling situations?', handler: 'handleAdaptableQuestion' },
                { id: 'courageous', text: 'Am I a courageous person?', handler: 'handleCourageousQuestion' },
                { id: 'compassionate', text: 'Am I a compassionate person?', handler: 'handleCompassionateQuestion' },
                { id: 'promises', text: 'Am I someone who values promises?', handler: 'handlePromisesQuestion' },
                { id: 'stranger', text: 'What impression do I leave on strangers?', handler: 'handleStrangerQuestion' },
                { id: 'familiar', text: 'How am I perceived by those who are familiar with me?', handler: 'handleFamiliarQuestion' },
                { id: 'myself', text: 'What is my true inner self?', handler: 'handleMyselfQuestion' }
                        
            ],
            Love: [
                { id: 'ideal', text: "What are my expectations for an ideal partner?", handler: 'handleIdealPartnerQuestion' },
                { id: 'sexpopular', text: 'Am I someone who is popular with the opposite sex?', handler: 'handleSexPopularQuestion' }
            ],
            Wealth: [
                { id: 'wealth', text: 'Do I value wealth?', handler: 'handleWealthQuestion' },
                { id: 'purpose', text: 'Do I have a sense of purpose in what I do?', handler: 'handlePurposeQuestion' },
                { id: 'opinions', text: "Am I someone who is good at listening to others' opinions?", handler: 'handleOpinionsQuestion' },
                { id: 'support', text: "Do I have a higher chance of getting help from benefactors?", handler: 'handleSupportQuestion' }
                       
            ],
        };
        function handleSexPopularQuestion(){
                   let input = userInteraction.baziWuxing;
                   let gender = userInteraction.gender;
                   result = analyzeSexPopular(input,gender);
                    
                    const response = result;
                    
                    displayResponseGradually(response);
        }
        function handleIdealPartnerQuestion(){
                   let input = userInteraction.bazi;
                   let gender = userInteraction.gender;
                   result = analyzeIdealPartner(input,gender);
                    
                    const response = result;
                    
                    displayResponseGradually(response);
        }
        function handleSupportQuestion(){
                   let input = userInteraction.baziWuxing;
                   result = analyzeSupport(input);
                    
                    const response = result;
                    
                    displayResponseGradually(response);
        }
        function handleOpinionsQuestion(){
                   let input = userInteraction.baziWuxing;
                   result = analyzeOpinion(input);
                    
                    const response = result;
                    
                    displayResponseGradually(response);
        }
        function handlePurposeQuestion(){
                   let input = userInteraction.baziWuxing;
                   result = analyzePurpose(input);
                    
                    const response = result;
                    
                    displayResponseGradually(response);
        }
        function handleWealthQuestion(){
                    let input = userInteraction.baziWuxing;
                    
                    /*let input = "金水木火金水木土";
                    result = analyzeWealth(input);//surface yes
                    console.log("Wealth1:",result);
                    input = "金水火火金火土土";//no 
                    result = analyzeWealth(input);
                    console.log("Wealth2:",result);
                    input = "金水火木金水木土";// very
                    result = analyzeWealth(input);
                    console.log("Wealth3:",result);
                    input = "金木水火金水木土";//surface no
                    result = analyzeWealth(input);
                    console.log("Wealth4:",result);
                    input = "木木水火金水木土";//normal
                    result = analyzeWealth(input);
                    console.log("Wealth4:",result);
                    */
                    
                    result = analyzeWealth(input);
                    
                    const response = result;
                    
                    displayResponseGradually(response);
        }

        function    handleSwipeQuestion(){
                        const tooltip = document.getElementById('tooltip');
                        // 点击时显示提示文案   
                        tooltip.style.display = 'block'; // 显示提示   
                        console.log("display indicate...");
                        setTimeout(() => {
                                    tooltip.style.display = 'none'; // 延时隐藏提示
                                }, 4000); // 3秒后隐藏
                
        }
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
            
            // Add DeepSeek button
            const deepseekButton = document.createElement('button');
            deepseekButton.textContent = '🔮 Fate Free Inquiry';
            deepseekButton.onclick = toggleDeepSeekChat;
            optionsDiv.appendChild(deepseekButton);
        }
        
        // Toggle DeepSeek chat interface
        function toggleDeepSeekChat() {
            const deepseekGroup = document.getElementById('deepseek-chat-group');
            if (!deepseekGroup) return;
            
            if (deepseekGroup.style.display === 'none' || !deepseekGroup.style.display) {
                deepseekGroup.style.display = 'flex';
                // Focus on input
                const deepseekInput = document.getElementById('deepseek-input');
                if (deepseekInput) {
                    deepseekInput.focus();
                }
            } else {
                deepseekGroup.style.display = 'none';
            }
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
function adjustTime(inputDate) {
    // 输入时间
    const inputTime = new Date(inputDate);
    
    // 当前日期
    const currentDate = new Date(inputTime.getFullYear(), inputTime.getMonth(), inputTime.getDate());
    
    // 定义22:59的时间点
    const cutoffTime = new Date(currentDate);
    cutoffTime.setHours(22, 59, 0, 0);
    
    // 如果输入时间超过22:59
    if (inputTime > cutoffTime) {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1); // 设置到第二天
        nextDay.setHours(0, 30, 0, 0); // 设置时间到00:30
        return nextDay;
    }
    
    // 否则返回原始时间
    return inputTime;
}


        function updateBaziZodiac() {
            //birthDate = new Date(1979, 02, 01, 04, 30); // 1983年1月10日12:30
            // birthDate = new Date(); // 1983年1月10日12:30
            //const lunar = new Lunar(new Date());
            mypaipan = new PaiPanFinal();
            const dateObject1 = new Date(userInteraction.birthday);
            let dateObject = adjustTime(dateObject1);
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

        // Format Bazi string to "年干年支 月干月支 日干日支 时干时支" format
        function formatBaziString(bazi) {
            if (!bazi) return '';
            const parts = String(bazi).split(',');
            // Format: zodiac,年干,年支,月干,月支,日干,日支,时干,时支
            if (parts.length >= 9) {
                // Index: 1=年干, 2=年支, 3=月干, 4=月支, 5=日干, 6=日支, 7=时干, 8=时支
                return `${parts[1]}${parts[2]} ${parts[3]}${parts[4]} ${parts[5]}${parts[6]} ${parts[7]}${parts[8]}`;
            }
            return '';
        }
        
        // Convert gender to Chinese
        function formatGender(gender) {
            if (!gender) return '';
            return gender === 'Male' ? '男' : (gender === 'Female' ? '女' : '');
        }
        
        // Backend API endpoint - For Wix, this should be set to your Wix HTTP Function URL
        // See WIX_SETUP.md for configuration instructions
        // Note: Using /functions/ (without underscore) as /_functions/ returns 404
        const DEEPSEEK_API_PROXY = 'https://www.fatefinder.org/functions/deepseek-chat';
        // TODO: Update this to match your Wix HTTP Function URL
        
        // Call DeepSeek API through backend proxy
        async function callDeepSeekAPI(userMessage) {
            if (!userInteraction.birthday || !userInteraction.gender) {
                appendMessage('Please enter your birthday and gender first.', 'bot');
                return null;
            }
            
            if (!userInteraction.bazi || !userInteraction.gender) {
                appendMessage('Please enter your birthday and gender first.', 'bot');
                return null;
            }
            
            // Format Bazi and gender
            const formattedBazi = formatBaziString(userInteraction.bazi);
            const formattedGender = formatGender(userInteraction.gender);
            
            if (!formattedBazi || !formattedGender) {
                appendMessage('Bazi or gender information is incomplete. Please re-enter your birthday and gender.', 'bot');
                return null;
            }
            
            // Build the prompt with dynamic values
            const systemPrompt = `My question is: ${userMessage}. You are a Bazi (Chinese astrology) master, help me answer this question based on this Bazi chart. The Bazi information is: ${formattedBazi}, Gender: ${formattedGender}. Answer in English, don't use too technical terms, but explain it in a way that Americans can understand. Remove the disclaimer at the end. Use second person, not third person. Do not mention Bazi in the answer. Do not use Chinese characters in the answer. Do not use any other languages in the answer. Keep your answer within 120 words.`;
            
            // Show thinking indicator with fortune-telling style
            const chatBox = document.getElementById('chat-box');
            let thinkingMsg = null;
            if (chatBox) {
                thinkingMsg = document.createElement('div');
                thinkingMsg.className = 'message bot';
                thinkingMsg.textContent = '🔮 Consulting the stars and reading your fate...';
                thinkingMsg.id = 'deepseek-thinking-msg';
                chatBox.appendChild(thinkingMsg);
                chatBox.scrollTop = chatBox.scrollHeight;
            }
            
            try {
                // Call backend proxy (Wix HTTP Function)
                const response = await fetch(DEEPSEEK_API_PROXY, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: systemPrompt
                    })
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    let errorMessage = data.error?.message || `HTTP error! status: ${response.status}`;
                    
                    // Handle specific error codes with user-friendly messages
                    if (response.status === 401) {
                        errorMessage = 'Invalid API Key. Server configuration error.';
                    } else if (response.status === 402) {
                        errorMessage = 'Insufficient Balance. The service account has insufficient credits. Please contact the administrator.';
                    } else if (response.status === 429) {
                        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
                    } else if (response.status === 500) {
                        errorMessage = data.message || 'Server error. Please try again later.';
                    } else if (response.status === 503) {
                        errorMessage = 'Service unavailable. The backend server may be down. Please try again later.';
                    }
                    
                    throw new Error(errorMessage);
                }
                
                // Remove thinking message
                if (thinkingMsg && thinkingMsg.parentNode) {
                    thinkingMsg.parentNode.removeChild(thinkingMsg);
                }
                
                // Include the prompt for manual verification (can be hidden in production)
                // Set SHOW_PROMPT_IN_RESPONSE to false when ready for production
                const SHOW_PROMPT_IN_RESPONSE = true; // Change to false for production
                
                let deepseekResponse = data.content || 'No response from DeepSeek.';
                
                // Limit response to 120 words
                function limitWords(text, maxWords) {
                    // Remove extra whitespace and split into words
                    const words = text.trim().split(/\s+/);
                    if (words.length <= maxWords) {
                        return text;
                    }
                    // Take first maxWords words and join them
                    const limitedWords = words.slice(0, maxWords);
                    // Try to end at a sentence boundary if possible
                    let result = limitedWords.join(' ');
                    // If the last character is not punctuation, try to find the last sentence end
                    const lastSentenceEnd = result.lastIndexOf('.');
                    if (lastSentenceEnd > result.length * 0.7) {
                        // If we found a sentence end in the last 30% of the text, use it
                        result = result.substring(0, lastSentenceEnd + 1);
                    } else {
                        // Otherwise, just add ellipsis
                        result = result + '...';
                    }
                    return result;
                }
                
                // Apply word limit to response (only to the actual response, not the prompt)
                const limitedResponse = limitWords(deepseekResponse, 120);
                
                if (SHOW_PROMPT_IN_RESPONSE) {
                    // Return response with prompt for verification
                    return `[PROMPT SENT TO DEEPSEEK]\n${systemPrompt}\n\n[RESPONSE]\n${limitedResponse}`;
                } else {
                    // Return only the response for production
                    return limitedResponse;
                }
            } catch (error) {
                console.error('DeepSeek API Error:', error);
                // Remove thinking message on error
                if (thinkingMsg && thinkingMsg.parentNode) {
                    thinkingMsg.parentNode.removeChild(thinkingMsg);
                }
                
                // Handle network errors
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    appendMessage('❌ Unable to connect to the server. Please check if the backend server is running.', 'bot');
                } else {
                    appendMessage(`❌ ${error.message}`, 'bot');
                }
                return null;
            }
        }
        
        // Send message to DeepSeek
        async function sendDeepSeekMessage() {
            const deepseekInput = document.getElementById('deepseek-input');
            
            if (!deepseekInput) return;
            
            const userMessage = deepseekInput.value.trim();
            if (!userMessage) {
                appendMessage('Please enter a message.', 'bot');
                return;
            }
            
            // Display user message
            appendMessage(userMessage, 'user');
            deepseekInput.value = '';
            
            // Call DeepSeek API through backend proxy
            const response = await callDeepSeekAPI(userMessage);
            if (response) {
                displayResponseGradually(response);
            }
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
