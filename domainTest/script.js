

document.addEventListener("DOMContentLoaded", function() {
            const button = document.getElementById("calculateFor");

            if (button) {
                button.addEventListener("click", function() {
                    // Inform parent window about the button click
                    window.parent.postMessage({ action: "deductPoints", data: "deductPoints" }, "*");
                    
                });
            } else {
                console.log("Button not found. Check ID.");
            }
        });

       window.addEventListener('message', (event) => {
                console.log("get message from parent to handle this:",event.data.action);
                const data = event.data;
                console.log("event.data:",data);
                // 确认消息的事件类型是 error，并且消息内容是 "用户未登录"
                if (((data.action === "error") ||(data.event === "error"))  && data.message === "用户未登录") {
                    // 在页面上显示未登录提示，或者进行其他处理
                    console.log("您尚未登录，请先登录！");
                    let result = `Please Log In Or Free Sign Up and Get 5 Points`;
                    displayAnimatedText("Wow!", result, "!");
                }
                            
                if (event.data.action === 'pointsDeducted') {
                        
                    
                        //alert("get pointsDeducted message."+event.data.handler.handler);
                        console.log("get message from parent to handle this handler:",event.data.handler.handler);
                        calculateFortune();
                    
                }
            });


function calculateFortune() {
    const domain = document.getElementById('domainInput').value.trim().toLowerCase();
    const resultElement = document.getElementById('result');

    if (!domain) {
        resultElement.textContent = 'Please enter a domain name';
        return;
    }

    const fortuneScore = getFortuneScore(domain);
    const fortuneMessage = getFortuneMessage(fortuneScore);

    const domainMessage = `Domain: ${domain}`;
    const fortuneMessageFull = `Fortune Result: ${fortuneMessage}`;
    displayAnimatedText(resultElement, domainMessage, fortuneMessageFull);
}

function displayAnimatedText(element, domainText, fortuneText) {
    element.innerHTML = '';

    const domainParagraph = document.createElement('p');
    const fortuneParagraph = document.createElement('p');
    
    element.appendChild(domainParagraph);
    element.appendChild(fortuneParagraph);

    let domainIndex = 0;
    let fortuneIndex = 0;

    function showNextCharacter() {
        if (domainIndex < domainText.length) {
            const span = document.createElement('span');
            span.textContent = domainText[domainIndex];
            domainParagraph.appendChild(span);
            domainIndex++;
        } else if (fortuneIndex < fortuneText.length) {
            const span = document.createElement('span');
            span.textContent = fortuneText[fortuneIndex];
            fortuneParagraph.appendChild(span);
            fortuneIndex++;
        } else {
            return; // All text has been displayed
        }
        setTimeout(showNextCharacter, 45); // Adjust the speed as needed
    }

    showNextCharacter();
}

document.getElementById('domainInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculateFortune();
    }
});




// function calculateFortune() {
//     const domain = document.getElementById('domainInput').value.trim().toLowerCase(); // Convert domain to lowercase
//     const resultElement = document.getElementById('result');

//     if (!domain) {
//         resultElement.textContent = 'Please enter a domain name';
//         return;
//     }

//     const fortuneScore = getFortuneScore(domain);
//     const fortuneMessage = getFortuneMessage(fortuneScore);

//     resultElement.innerHTML = `<p>Domain: ${domain}</p><p>Fortune Result: ${fortuneMessage}</p>`;

// }

function getFortuneScore(domain) {
    let score = 0;
    

    for (let i = 0; i < domain.length; i++) {
        let charCode = domain.charCodeAt(i);
        // 处理数字
        if (charCode >= 48 && charCode <= 57) {

            score += charCode - 49;
        }
        
        if ((charCode < 97 || charCode > 122) ) {
            score += 1;
        } else {
            charCode -= 97; // Convert character to number between 0 and 25
            charCode ++;
            // score += referenceArray[charCode];
            score += charCode;
        }
    }
    return score % 81; 
}



function getFortuneMessage(score) {
    switch (score) {
        case 1:
            return "Rising sun Divination(Great). Able to accomplish great deeds, very auspicious. Represents prestige, longevity, health, and development, capable of achieving great things.";
        case 2:
            return "Branches grow disorderly Divination(Unfavorable). Lacking judgment, hardships and failures, difficult to achieve great things. Represents incompetence, indecision, and being trapped, like a bird in a cage, facing internal and external turmoil, making progress difficult and prone to illness and calamity.";
        case 3:
            return "Both fame and fortune Divination(Great). Smooth progress, can become renowned worldwide. Yin and yang harmonize, everything in the world takes shape. Auspicious with thick blessings, with slight human difficulties, but with virtue, one can control difficult situations. This number suggests development, prosperity, and wealth, benefiting descendants.";
        case 4:
            return "Destruction and disintegration Divination(Unfavorable). Disasters and changes, bleak and desolate, signs of death and decay. Represents adversity, hardship, and separation. Limited to precarious situations, if other numbers are also bad, the severity increases. Represents madness and disability. However, this number often produces geniuses or people with integrity.";
        case 5:
            return "Double blessings of fortune and longevity Divination(Great). Family prospering, blessings, fortune, and longevity complete. Yin and yang embrace, harmony, and perfection. Represents great success and prosperity, either with the potential for success or achieving great things in a distant place, avoiding staying in one's birthplace.";
        case 6:
            return "Prosperity and peace Divination(Great). Great wealth and honor, life stable and prosperous. Family flourishing, abundance of talent, but this number is overly prosperous, indicating that prosperity will decline. Surface glory hides inner worries. This number should be cautious and vigilant, enjoying in moderation, and reflecting during prosperity.";
        case 7:
            return "Strong and stubborn Divination(Great). Decisive and resolute, with the strength of a hero, advancing boldly and achieving great success. However, being too aggressive and hasty can lead to failure. Women may tend to be masculine upon seeing this number. It is advisable to be gentle and peaceful.";
        case 8:
            return "Firmness and self-restraint Divination(Fair). Suitable for gradual progress. This number has self-restraint, suitable for those who pursue goals steadily and with strong willpower. However, being overly aggressive internally and externally may lead to uncontrollable situations. This number indicates strong willpower but fears dangers.";
        case 9:
            return "Poverty, adversity Divination(Unfavorable). And opposition, many successes also mean many failures, prosperity turns into decline, fame and fortune are all in vain, lonely and poor. This number is not conducive to family fortune or blood relations, and may even indicate illness, legal troubles, or short life. When combined with a good pattern, it may produce eminent monks or odd geniuses.";
        case 10:
            return "Death and destruction Divination(Unfavorable). Evil and ominous, dim and dismal, a symbol of extreme adversity. Represents a realm of spirits. People face poverty and family ruin, with cries and wails of ghosts and gods, the most sorrowful and miserable symbol. Bloodshed is unavoidable, illness, and short life.";
        case 11:
            return "Renewal of all things Divination(Great). Encountering a timely rain after a long drought, capable of turning around family fortunes. Represents an unexpected rise, with yin and yang in harmony, revitalizing the family and the clan, prosperity, wealth, and honor, with descendants thriving and excellent. Indicates full-scale advancement and the auspicious omen of successful development.";
        case 12:
            return "Weakness and setbacks Divination(Unfavorable). Prone to sinking, aspirations difficult to achieve. Interpersonal relationships are limited to dire straits, with thin family ties, things breeding worms and filth, dissatisfaction prevailing, ultimately leading to fighting alone, with everyone against you. This number is especially unfavorable in middle and old age, otherwise, it will sink into hardship.";
        case 13:
            return "Talented and skilled Divination(Great). Exceeding in wisdom and learning, full of eccentricity. With wisdom and skill, achievements can be made in the arts and sciences, but unfortunately, being self-righteous can lead to misfortune.";
        case 14:
            return "Floating and sinking Divination(Unfavorable). Destruction and decay, lonely and suffering, unable to enjoy family happiness. A number with extremely thin family ties, often experiencing the loss of relatives, loss of children or siblings, with labor without reward, and difficulties abound.";
        case 15:
            return "Kindness and virtue highly respected Divination(Great). Blessed with fortune, longevity, and complete happiness. This number indicates having elders and noble persons, friends, and subordinates supporting you, leading to complete happiness, prosperity, and honor.";
        case 16:
            return "Home-loving and benevolent Divination(Great). Surpassing in leadership, often assisted by influential persons, a leader's number, having fortune, longevity, and blessings, three virtues. Kind-hearted and often in a high position, with the support of the masses, one can accomplish great things.";
        case 17:
            return "Firm and unyielding Divination(Fair). Possessing strong perseverance, often breaking through obstacles, heavy with authority, breaking through all difficulties. However, lacking harmony with people, there is a risk of inviting trouble due to a lack of accommodation, leading to difficulties.";
        case 18:
            return "Holding power and reaching influence Divination(Fair). Having authority and prestige, but lacking tolerance. Similar to the number 17, it has wisdom and strategy, as well as authority, but also lacks harmony with people, easily leading to difficulties due to a lack of tolerance.";
        case 19:
            return "Failure and adversity Divination(Unfavorable). Prone to setbacks, lacking support from noble persons, unfavorable for spouses, like facing turbulent currents after a storm, though possessing intelligence, the journey is filled with danger and failure, resulting in illness, disability, widowhood, and short life.";
        case 20:
            return "Destruction and decline Divination(Unfavorable). Facing numerous difficulties and hardships. This number signifies failure in all endeavors, being at a loss with no progress, and is indicative of things falling into decay. It may lead to disability or serious illness, and is absolutely inauspicious.";
        case 21:
            return "Independence and authority Divination(Great). Universally respected, possessing leadership abilities. This number indicates leadership, being respected by others, and enjoying wealth and honor.";
        case 22:
            return "Autumn grass encountering frost Divination(Unfavorable). Facing continuous disasters, and experiencing a bleak future. This number suggests broken aspirations and faltering ambitions, leading to sickness, adversity, and setbacks.";
        case 23:
            return "Magnificent and courageous Divination(Great). Soaring to great heights, overcoming all difficulties. This number embodies the spirit of overcoming all hardships with courage and determination, achieving great success.";
        case 24:
            return "Abundant wealth and blessings Divination(Great). Exceptionally talented and frugal. This number suggests starting from scratch and achieving great success, gaining immense wealth, health, fame, and fortune.";
        case 25:
            return "Outstanding and intelligent Divination(Fair). Proud and talented, exceptionally gifted. This number represents exceptional talent and intelligence, with men being handsome and women being beautiful.";
        case 26:
            return "Turbulent waves Divination(Unfavorable). Characterized by intelligence and agility, with life full of changes. This number signifies extraordinary talent and unpredictability, akin to encountering turbulent waves at sea.";
        case 27:
            return "Setbacks and obstacles Divination(Fair). Prone to attacks and fluctuations. This number suggests a lack of popularity, setbacks, and slander, leading to difficulties in accomplishing goals.";
        case 28:
            return "Calamities and separations Divination(Unfavorable). Frequent disasters and separations. This number, also known as the misfortune and disaster number, signifies failure despite heroic efforts, bringing about familial suffering.";
        case 29:
            return "Distinguished intellect and strategy Divination(Great). Stepping into prosperity despite endless trials. This number brings fortune when encountered with auspicious signs and misfortune when confronted with inauspicious signs.";
        case 30:
            return "Fluctuating fortunes Divination(Fair). Uncertain success, but encountering opportunities in adversity. This number indicates taking risks, where success or failure depends on external factors and fate.";
        case 31:
            return "Harmony and perfection Divination(Great). Possessing intelligence, benevolence, and courage, capable of achieving great success. This number is considered extremely auspicious, suitable for both men and women.";
        case 32:
            return "Fortunate encounters and success against all odds Divination(Great). This number suggests that despite facing obstacles, success can be achieved through fortunate encounters and assistance from superior figures.";
        case 33:
            return "Firm and decisive Divination(Great). Reaching the peak of success, but may be too rigid. This number represents a union of phoenix and dragon, indicating a rise to fame and fortune.";
        case 34:
            return "Ruin and demise Divination(Unfavorable). Encountering madness, facing loneliness and misery. This number symbolizes ruin and decline, with life characterized by hardship, despair, and separation.";
        case 35:
            return "Conservative and peaceful Divination(Great). Gentle and just, meticulous and righteous. This number suggests gentleness and righteousness, leading to success and fulfillment.";
        case 36:
            return "Turbulent waves Divination(Fair). Characterized by myriad changes and fluctuations. This number signifies the adventurous spirit, where success or failure depends on external factors and fate.";
        case 37:
            return "Kindness and loyalty Divination(Great). Enjoying authority and wealth. This number represents independent authority and lasting prosperity, signifying a life of wealth, honor, and longevity.";
        case 38:
            return "Weakness and mediocrity Divination(Fair). Lacking willpower and prone to giving up halfway. This number suggests feelings of regret and disappointment, indicating a lack of leadership and prestige.";
        case 39:
            return "Glory and wealth Divination(Great). Overcoming adversity to achieve breakthroughs. This number symbolizes the rise from adversity to prominence, achieving fame, fortune, and longevity.";
        case 40:
            return "Fluctuations and changes Divination(Fair). Vigorous and arrogant, fond of speculation and risk-taking. This number suggests retreat and downfall, despite being rich in strategy and courage.";
        case 41:
            return "Integrity and virtue Divination(Great). Striving for excellence with a single-minded focus. This number represents pure positive energy, indicating fame, fortune, and longevity.";
        case 42:
            return "Broad knowledge and talents Divination(Fair). But lacking perseverance. This number represents versatility and proficiency, indicating expertise in various fields.";
        case 43:
            return "Weakness and scatterbrained Divination(Unfavorable). Lacking firm beliefs, adept at wielding power and influence. This number signifies bankruptcy in name and spirit, despite possessing talent.";
        case 44:
            return "Adversity and depression Divination(Unfavorable). Facing constant obstacles and experiencing a bleak future. This number symbolizes a broken family and a ruined life, indicating frustration and failure.";
        case 45:
            return "Great virtue and generosity Divination(Great). Sailing with the wind, embarking on a great journey. This number represents smooth sailing and great success, leading to fame, wealth, and happiness.";
        case 46:
            return "Bearing treasures but sinking ships Divination(Fair). Caught in a net of heaven and earth. This number signifies unexpected achievements and unique talents, akin to entering a treasure mountain but returning empty-handed.";
        case 47:
            return "Auspicious and Celebratory Divination(Great). Grass and trees in spring, beneficial for partnership in business. One of the great auspicious numbers, beautiful flowers and fruits, obtaining power, honor, and wealth.";
        case 48:
            return "Wise and Virtuous Divination(Great). Plenty of wisdom, suitable for advisors and counselors. This number represents virtue, great advantage of wise teachers, full of intelligence and talent.";
        case 49:
            return "Changing to Benevolence Divination(Fair). Goodness mixed with evil, evil mixed with goodness. Half auspicious and half inauspicious, encountering good fortune turns into good fortune, encountering bad fortune turns into bad fortune.";
        case 50:
            return "Lonely and Sorrowful Divination(Fair). A momentary fame, may achieve temporary glory. First sweet, then bitter. This number represents one success and one failure.";
        case 51:
            return "Victory then Decline Divination(Fair). Half-life of prosperity and decline, success followed by failure. Similar to the number fifty, this number indicates one success and one failure.";
        case 52:
            return "Distinguished and Wise Divination(Great). Deep planning and far-sightedness, with foresight. It has the strength to achieve great things, with fame, fortune, and both name and gain.";
        case 53:
            return "Difficulties and Inner Worries Divination(Unfavorable). Sunset in the west, stable and reliable for self-preservation. This number can achieve temporary success, but setbacks come quickly, failing to achieve great things in life.";
        case 54:
            return "Decline and Unreached Divination(Unfavorable). Many disasters and hardships, barely breathing. Similar to the number thirty-four, both are very inauspicious numbers in numerology.";
        case 55:
            return "External Glory, Internal Decline Divination(Fair). Outward glory but inner decline, extreme auspiciousness brings calamity. This number has an outward appearance of prosperity but poor substance.";
        case 56:
            return "Defeated and Unsteady Divination(Unfavorable). Lack of perseverance and persistence, constant setbacks. This number lacks willpower and often gives up halfway.";
        case 57:
            return "Achievements and Risks Divination(Great). Persistence and determination, extraordinary courage and confidence. This number can achieve great success but must face a major danger to succeed.";
        case 58:
            return "Bitter then Sweet Divination(Fair). Early hardships, later sweetness. This number indicates early hardships and later sweetness, with extraordinary talents rising above thousands of obstacles and achieving great success.";
        case 59:
            return "Willpower and Defeat Divination(Unfavorable). Lack of willpower, indecision, and confusion when faced with challenges. This number brings failure and disappointment due to weak personal will.";
        case 60:
            return "Unplanned and Lost Divination(Unfavorable). Indecisiveness, lack of initiative and goals. This number indicates lack of planning, poor judgment, and walking alone, stubbornly sticking to one's own views and inviting great dangers.";
        case 61:
            return "Prosperous and Flourishing Divination(Great). Prosperity and success, both fame and fortune. This number is one of the greatest auspicious numbers, representing prosperity and prosperity.";
        case 62:
            return "Adding Frost to Snow Divination(Unfavorable). Instability, lack of trustworthiness. Similar to the number twenty-two, it has the same inauspiciousness.";
        case 63:
            return "Wealthy and Precious Divination(Great). Smooth and easy, with children and grandchildren flourishing. All things receive the blessings of heaven and earth to achieve great success.";
        case 64:
            return "Dull and Ordinary Divination(Unfavorable). Life is turbulent and uncertain, with family members dispersing. Like entering turbulent waves, setbacks lead to family collapse and personal tragedies.";
        case 65:
            return "Fame and Fortune Divination(Great). Fame and wealth come together, longevity and wealth. This number represents the time when all things prosper and wealth is abundant, enjoying fame and wealth.";
        case 66:
            return "Retreat and Leisure Divination(Unfavorable). Losing trust, internal and external disharmony. This number enjoys oneself, internal and external disharmony, advance and retreat are difficult to decide.";
        case 67:
            return "Self-Improvement Divination(Great). Starting from scratch, with the courage to be independent. This number indicates steady progress, like climbing stairs, establishing oneself and prospering the family.";
        case 68:
            return "Dominant and Benevolent Divination(Great). Loyalty, honesty, and establishment of a family and career. It is endowed with intelligence and enlightenment, with the spirit of chivalry and heroes.";
        case 69:
            return "Sinking and Difficult Divination(Unfavorable). Hard to settle down, prone to restlessness. Family ties are thin, unsatisfactory, and insufficient.";
        case 70:
            return "Destruction and Defeat Divination(Unfavorable). Weakness and extreme misfortune, prone to extreme misfortune. Misfortune accumulates, both internally and externally.";
        case 71:
            return "Mixed Fortunes Divination(Fair). Pillows are held all night, and achievements can only be achieved with hard work. Advance and retreat are difficult, and good and bad luck are unpredictable.";
        case 72:
            return "External Luck, Internal Misfortune Divination(Fair). Sweetness turns to bitterness, caution is advised early on. Endowed with talents and energy, but strength does not match ambition.";
        case 73:
            return "Ambitious but Lacking Talent Divination(Fair). Grand ambitions but lacking in ability. This number has authority and weight, but ambitions outweigh abilities.";
        case 74:
            return "Sinking and Harmful Divination(Unfavorable). Lack of intelligence, leading a fruitless life. Unable to achieve due to lack of effort, like drifting with the wind, leading to the collapse of the family.";
        case 75:
            return "Wise and Retiring Divination(Unfavorable). Safety in retreat. Women are beautiful, and men are handsome, but lacking in great masculine energy, not conducive to major achievements. Only suitable for retreating and protecting oneself, enjoying one's own body, and not being restless.";
        case 76:
            return "Illness and Danger Divination(Unfavorable). Life full of difficulties and challenges. Facing danger and challenges, life is fraught with uncertainty. While fleeting moments of glory may occur, they are overshadowed by hardship.";
        case 77:
            return "Half Sorrow, Half Joy Divination(Fair). Hard work in the early stages, followed by happiness in later years. Family prosperity, but the possibility of loneliness later. This number is a blend of joy and sorrow, with talents and arrogance intertwined.";
        case 78:
            return "Diligent and Wise Divination(Unfavorable). Early life is ideal, but loneliness creeps in later years. This number is filled with talent and wisdom but lacks long-term achievements. Success is often fleeting and accompanied by struggles.";
        case 79:
            return "Internal and External Details Divination(Unfavorable). Courage without strategy, leading to an imbalance. While temporary prosperity may arise, old patterns and arrogance prevent true accomplishments. Loneliness often follows.";
        case 80:
            return "Surging Waves Divination(Unfavorable). A turbulent life filled with hardship. This number suggests ongoing struggles, with failures and calamities overshadowing attempts at progress. Longevity is often undermined by adversity.";
        case 81:
            return "Spring Breeze Divination(Great). A delightful number representing great honor and wealth. This number symbolizes the pinnacle of success, with blessings of fortune, prosperity, and thriving descendants.";
        default:
            return "Unknown Domain name, please try another one.";
    }
}




    


