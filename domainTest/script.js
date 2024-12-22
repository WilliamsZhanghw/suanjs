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
            return "Rising Sun Divination (Great): Able to accomplish great deeds, very auspicious. Represents prestige, longevity, health, and development, capable of achieving great things.";
        case 2:
            return "Branches Grow Disorderly Divination (Unfavorable): Lacking judgment, facing hardships and failures, difficult to achieve great things. Represents incompetence, indecision, and being trapped, like a bird in a cage, facing turmoil, making progress difficult, and prone to illness and calamity.";
        case 3:
            return "Both Fame and Fortune Divination (Great): Smooth progress, capable of becoming renowned worldwide. Yin and yang harmonize, everything falls into place. Auspicious with thick blessings, minor difficulties can be controlled with virtue, leading to prosperity and wealth, benefiting descendants.";
        case 4:
            return "Destruction and Disintegration Divination (Unfavorable): Disasters and changes, bleak and desolate, signs of adversity, hardship, and separation. Represents precarious situations, increased severity if combined with other bad numbers. May lead to madness or disability, though sometimes produces geniuses or people with integrity.";
        case 5:
            return "Double Blessings of Fortune and Longevity Divination (Great): Family prospers, blessings, fortune, and longevity align. Harmony leads to great success, often achieved in a distant place. Staying in one's birthplace may be less favorable.";
        case 6:
            return "Prosperity and Peace Divination (Great): Great wealth and honor, stable and prosperous life. Family flourishes with abundant talent, though overly prosperous situations may lead to decline. Caution, moderation, and reflection during prosperity are advised.";
        case 7:
            return "Strong and Stubborn Divination (Great): Decisive and resolute, advancing boldly to achieve success. Excessive aggression may lead to failure. Women may adopt masculine tendencies; gentleness and peace are recommended.";
        case 8:
            return "Firmness and Self-Restraint Divination (Fair): Suitable for gradual progress. Indicates strong willpower but warns against internal and external aggression. Encourages self-restraint and measured advancement.";
        case 9:
            return "Poverty and Adversity Divination (Unfavorable): Many successes also bring many failures. Indicates loneliness, poor fortune, and possible legal troubles or illness. Occasionally produces eminent monks or unique individuals.";
        case 10:
            return "Death and Destruction Divination (Unfavorable): A symbol of extreme adversity and poverty, leading to family ruin and short life. Represents ultimate sorrow and misfortune.";
        case 11:
            return "Renewal of All Things Divination (Great): Unexpected rise and revitalization of family fortunes. Harmony leads to prosperity, wealth, honor, and thriving descendants. Indicates full-scale advancement and successful development.";
        case 12:
            return "Weakness and Setbacks Divination (Unfavorable): Prone to sinking, aspirations hard to achieve. Limited interpersonal relationships and thin family ties lead to dissatisfaction and hardship, especially in middle and old age.";
        case 13:
            return "Talented and Skilled Divination (Great): Exceptional wisdom and learning, though self-righteousness may cause misfortune. Indicates achievements in arts and sciences, with tendencies toward psychological difficulties.";
        case 14:
            return "Floating and Sinking Divination (Unfavorable): Destruction, loneliness, and suffering. Thin family ties and frequent loss of relatives lead to labor without reward and difficulties, especially when away from home.";
        case 15:
            return "Kindness and Virtue Highly Respected Divination (Great): Blessed with fortune, longevity, and happiness. Supported by elders and noble persons, this number signifies wealth, honor, and prosperity, favoring late-life blessings.";
        case 16:
            return "Home-Loving and Benevolent Divination (Great): Indicates strong leadership and support from influential persons. Represents kindness, high positions, and great accomplishments, suitable for both men and women.";
        case 17:
            return "Firm and Unyielding Divination (Fair): Strong perseverance and authority, breaking through difficulties. Lacks harmony with others, risking trouble due to inflexibility. Encourages gentleness within strength.";
        case 18:
            return "Holding Power and Reaching Influence Divination (Fair): Authority and wisdom with a lack of tolerance. Indicates success and fame but warns against difficulties due to rigidity. Women should use with caution.";
        case 19:
            return "Failure and Adversity Divination (Unfavorable): Lacks support and faces setbacks, leading to danger and failure. Indicates loneliness, disability, and a short life, though may produce unique individuals.";
        case 20:
            return "Destruction and Decline Divination (Unfavorable): Facing numerous hardships and failures, leading to decay and misfortune. Indicates serious illness and loss, with initial sweetness followed by bitterness.";
        case 21:
            return "Independence and Authority Divination (Great): Leadership qualities and universal respect. Signifies wealth, honor, and a prosperous career, though less favorable for women unless astrological compatibility is suitable.";
        case 22:
            return "Autumn Grass Encountering Frost Divination (Unfavorable): Continuous disasters and bleak future. Indicates broken aspirations, adversity, and romantic misfortunes, with suffering and loss.";
        case 23:
            return "Magnificent and Courageous Divination (Great): Overcoming difficulties with courage and determination. Warns against excessive rigidity, suggesting balance for success. Advises women to maintain harmony in relationships.";
        case 24:
            return "Abundant Wealth and Blessings Divination (Great): Starting from scratch and achieving great success. Indicates immense wealth, health, and family prosperity, suitable for all genders.";
        case 25:
            return "Outstanding and Intelligent Divination (Fair): Exceptionally gifted, with favorable relationships blending strength and softness. Warns against arrogance and artistic temperament.";
        case 26:
            return "Turbulent Waves Divination (Unfavorable): Extraordinary talent with unpredictable challenges. Indicates suffering despite remarkable achievements. Associated with heroic endeavors and sacrifices.";
        case 27:
            return "Setbacks and Obstacles Divination (Fair): Prone to attacks and fluctuations, leading to difficulties and loneliness. Suggests a life filled with troubles and setbacks, particularly in old age.";
        case 28:
            return "Calamities and Separations Divination (Unfavorable): Frequent disasters and familial suffering. Indicates a life of hardship and severed family ties, with continuous misfortune.";
        case 29:
            return "Distinguished Intellect and Strategy Divination (Great): Brings fortune with auspicious signs and challenges with inauspicious ones. Encourages avoiding recklessness for successful outcomes.";
        case 30:
            return "Fluctuating Fortunes Divination (Fair): Uncertain success influenced by external factors. Indicates a life of ups and downs, requiring adaptability and resilience.";
        case 31:
            return "Harmony and Perfection Divination (Great): Possessing intelligence, benevolence, and courage, capable of achieving great success. This number is highly auspicious for all endeavors.";
        case 32:
            return "Fertile Prosperity Divination (Great): Represents thriving in every aspect, with auspicious signs for wealth and health. A balance of effort and fortune leads to long-term stability.";
        case 33:
            return "Brilliant Fortune Divination (Great): A peak number symbolizing ultimate achievement, balance, and wisdom. Great fortune in career and family, with widespread admiration.";
        case 34:
            return "Chaotic Waves Divination (Unfavorable): A mix of talent and hardship. Indicates struggles and instability, requiring great effort to overcome challenges.";
        case 35:
            return "Steady Growth Divination (Fair): Encourages gradual and methodical progress. Success comes with patience and dedication, avoiding risks and haste.";
        case 36:
            return "Shattered Dreams Divination (Unfavorable): Frequent losses and unfulfilled aspirations. Indicates challenges requiring resilience and adaptability.";
        case 37:
            return "Eminent Success Divination (Great): Indicates remarkable achievements and widespread recognition. Success in various endeavors brings lasting rewards.";
        case 38:
            return "Mixed Blessings Divination (Fair): A blend of fortune and adversity. Encourages careful planning and adaptability to navigate challenges.";
        case 39:
            return "Fortune and Longevity Divination (Great): Signifies enduring success and happiness. A harmonious blend of wealth, health, and family prosperity.";
        case 40:
            return "Severed Bonds Divination (Unfavorable): Indicates isolation and struggles in relationships. Requires effort to rebuild trust and connections.";
        case 41:
            return "Flourishing Stability Divination (Great): Represents solid foundations and enduring prosperity. A number of great auspiciousness for long-term success.";
        case 42:
            return "Noble Support Divination (Fair): Indicates assistance from influential individuals. Success comes through partnerships and collaboration.";
        case 43:
            return "Overwhelming Challenges Divination (Unfavorable): Frequent obstacles and setbacks. Requires resilience and support to overcome adversity.";
        case 44:
            return "Endless Struggles Divination (Unfavorable): A number of continuous hardships, requiring great perseverance to navigate.";
        case 45:
            return "Triumphant Progress Divination (Great): Represents victory over challenges, with enduring success and widespread admiration.";
        case 46:
            return "Fragile Balance Divination (Fair): Indicates periods of instability, requiring careful management and foresight.";
        case 47:
            return "Soaring Aspirations Divination (Great): Signifies achieving remarkable goals with determination and support.";
        case 48:
            return "Prosperity and Renewal Divination (Great): Represents rebirth and flourishing success. A highly auspicious number for growth and harmony.";
        case 49:
            return "Volatile Fortune Divination (Fair): A mix of high peaks and low troughs. Encourages adaptability and resilience to maintain progress.";
        case 50:
            return "Transitional Challenges Divination (Fair): Indicates a phase of significant changes, requiring flexibility and perseverance.";
        case 51:
            return "Renewed Vitality Divination (Great): Symbolizes revitalization and new beginnings, leading to success and prosperity.";
        case 52:
            return "Enduring Hardships Divination (Unfavorable): Frequent struggles and setbacks, requiring strength and determination to overcome.";
        case 53:
            return "Harmonious Growth Divination (Great): Represents steady and balanced progress, leading to enduring success.";
        case 54:
            return "Unstable Foundations Divination (Unfavorable): Indicates potential for collapse and struggles. Requires caution and strong support systems.";
        case 55:
            return "Exceptional Fortune Divination (Great): A number of ultimate success and prosperity, symbolizing widespread admiration and harmony.";
        case 56:
            return "Burdened Progress Divination (Fair): Indicates progress hampered by challenges, requiring resilience and support to succeed.";
        case 57:
            return "Nurtured Success Divination (Great): Represents achievements built on strong foundations and guidance from mentors.";
        case 58:
            return "Challenging Prosperity Divination (Fair): Success achieved through overcoming significant obstacles, requiring effort and adaptability.";
        case 59:
            return "Perpetual Struggles Divination (Unfavorable): Continuous challenges and hardships, requiring extraordinary effort and support to navigate.";
        case 60:
            return "Golden Prosperity Divination (Great): Represents flourishing wealth, happiness, and harmonious family relationships. Indicates an ideal balance of personal and professional success.";
        case 61:
            return "Resilient Foundations Divination (Fair): Reflects steady progress through persistent effort. Advises maintaining balance and avoiding reckless decisions to achieve long-term success.";
        case 62:
            return "Shadowed Paths Divination (Unfavorable): Indicates difficulties in decision-making and potential for conflict. Encourages careful planning and seeking wise counsel to navigate challenges.";
        case 63:
            return "Boundless Harmony Divination (Great): Symbolizes ultimate peace, success, and fulfillment. Indicates prosperity, happiness, and excellent interpersonal relationships.";
        case 64:
            return "Fleeting Triumphs Divination (Fair): Reflects short-lived successes that require continuous effort to sustain. Encourages humility and adaptability to ensure future achievements.";
        case 65:
            return "Radiant Growth Divination (Great): Represents continuous advancement and flourishing opportunities. Advises staying grounded and nurturing relationships to sustain prosperity.";
        case 66:
            return "Overburdened Fortune Divination (Fair): Indicates success overshadowed by responsibilities and stress. Encourages delegation and seeking support to maintain balance.";
        case 67:
            return "Enduring Legacy Divination (Great): Reflects achievements that leave a lasting impact. Encourages patience, wisdom, and generosity to build a strong legacy.";
        case 68:
            return "Chaotic Ventures Divination (Unfavorable): Suggests ventures marked by confusion and risk. Advises caution and strategic planning to overcome difficulties.";
        case 69:
            return "Hopeful Renewal Divination (Fair): Reflects a period of transformation with challenges that lead to growth. Encourages optimism and perseverance.";
        case 70:
            return "Endless Cycles Divination (Unfavorable): Indicates repetitive challenges and lack of progress. Encourages breaking out of old patterns to find new opportunities.";
        case 71:
            return "Pioneering Spirit Divination (Great): Symbolizes innovation and groundbreaking achievements. Advises combining creativity with discipline to maximize success.";
        case 72:
            return "Serene Stability Divination (Fair): Reflects a calm and steady period with opportunities for reflection and growth. Encourages maintaining focus and building on existing strengths.";
        case 73:
            return "Mystic Prosperity Divination (Great): Represents deep wisdom and unconventional success. Encourages embracing unique talents and opportunities to thrive.";
        case 74:
            return "Fragile Gains Divination (Unfavorable): Indicates temporary success that can easily collapse. Advises caution and solidifying foundations before pursuing further growth.";
        case 75:
            return "Brilliant Endeavors Divination (Great): Reflects dazzling achievements through effort and support. Encourages sharing success to foster goodwill and collaboration.";
        case 76:
            return "Shifting Fortunes Divination (Fair): Reflects unpredictability in success and challenges. Encourages flexibility and a proactive approach to secure stability.";
        case 77:
            return "Unyielding Triumph Divination (Great): Represents overcoming great odds to achieve success. Encourages resilience, determination, and strategic alliances.";
        case 78:
            return "Ethereal Harmony Divination (Great): Symbolizes profound balance, peace, and fulfillment. Reflects spiritual growth and harmonious achievements.";
        case 79:
            return "Tumultuous Progress Divination (Fair): Indicates achievements tempered by periods of instability. Encourages careful planning to maintain momentum.";
        case 80:
            return "Eclipsed Success Divination (Unfavorable): Reflects successes overshadowed by setbacks. Encourages perseverance and finding new strategies to overcome adversity.";
        case 81:
            return "Transcendent Victory Divination (Great): Represents ultimate achievement and recognition. Encourages sharing wisdom and fostering growth for future generations.";
        default:
            return "Unknown Domain name:Please try another one.";
    }
}




    


