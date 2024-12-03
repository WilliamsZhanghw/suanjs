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
            return "1. Rising sun Divination. Able to accomplish great deeds, very auspicious. Represents prestige, longevity, health, and development, capable of achieving great things. (Good)";
        case 2:
            return "2. Branches grow disorderly Divination. Lacking judgment, hardships and failures, difficult to achieve great things. Represents incompetence, indecision, and being trapped, like a bird in a cage, facing internal and external turmoil, making progress difficult and prone to illness and calamity. (Bad)";
        case 3:
            return "3. Both fame and fortune Divination. Smooth progress, can become renowned worldwide. Yin and yang harmonize, everything in the world takes shape. Auspicious with thick blessings, with slight human difficulties, but with virtue, one can control difficult situations. This number suggests development, prosperity, and wealth, benefiting descendants. (Good)";
        case 4:
            return "4. Destruction and disintegration Divination. Disasters and changes, bleak and desolate, signs of death and decay. Represents adversity, hardship, and separation. Limited to precarious situations, if other numbers are also bad, the severity increases. Represents madness and disability. However, this number often produces geniuses or people with integrity. (Bad)";
        case 5:
            return "5. Double blessings of fortune and longevity Divination. Family prospering, blessings, fortune, and longevity complete. Yin and yang embrace, harmony, and perfection. Represents great success and prosperity, either with the potential for success or achieving great things in a distant place, avoiding staying in one's birthplace. (Good)";
        case 6:
            return "6. Prosperity and peace Divination. Great wealth and honor, life stable and prosperous. Family flourishing, abundance of talent, but this number is overly prosperous, indicating that prosperity will decline. Surface glory hides inner worries. This number should be cautious and vigilant, enjoying in moderation, and reflecting during prosperity. (Good)";
        case 7:
            return "7. Strong and stubborn Divination. Decisive and resolute, with the strength of a hero, advancing boldly and achieving great success. However, being too aggressive and hasty can lead to failure. Women may tend to be masculine upon seeing this number. It is advisable to be gentle and peaceful. (Good)";
        case 8:
            return "8. Firmness and self-restraint Divination. Suitable for gradual progress. This number has self-restraint, suitable for those who pursue goals steadily and with strong willpower. However, being overly aggressive internally and externally may lead to uncontrollable situations. This number indicates strong willpower but fears dangers. (Half Good)";
        case 9:
            return "9. Poverty, adversity Divination. And opposition, many successes also mean many failures, prosperity turns into decline, fame and fortune are all in vain, lonely and poor. This number is not conducive to family fortune or blood relations, and may even indicate illness, legal troubles, or short life. When combined with a good pattern, it may produce eminent monks or odd geniuses. (Bad)";
        case 10:
            return "10. Death and destruction Divination. Evil and ominous, dim and dismal, a symbol of extreme adversity. Represents a realm of spirits. People face poverty and family ruin, with cries and wails of ghosts and gods, the most sorrowful and miserable symbol. Bloodshed is unavoidable, illness, and short life. (Bad)";
        case 11:
            return "11. Renewal of all things Divination. Encountering a timely rain after a long drought, capable of turning around family fortunes. Represents an unexpected rise, with yin and yang in harmony, revitalizing the family and the clan, prosperity, wealth, and honor, with descendants thriving and excellent. Indicates full-scale advancement and the auspicious omen of successful development. (Good)";
        case 12:
            return "12. Weakness and setbacks Divination. Prone to sinking, aspirations difficult to achieve. Interpersonal relationships are limited to dire straits, with thin family ties, things breeding worms and filth, dissatisfaction prevailing, ultimately leading to fighting alone, with everyone against you. This number is especially unfavorable in middle and old age, otherwise, it will sink into hardship. (Bad)";
        case 13:
            return "13. Talented and skilled Divination. Exceeding in wisdom and learning, full of eccentricity. With wisdom and skill, achievements can be made in the arts and sciences, but unfortunately, being self-righteous can lead to misfortune. This number belongs to unusual plans and unusual patterns, capable of producing geniuses, but prone to psychological illnesses or depression, and facing difficulties even in success. (Good)";
        case 14:
            return "14. Floating and sinking Divination. Destruction and decay, lonely and suffering, unable to enjoy family happiness. A number with extremely thin family ties, often experiencing the loss of relatives, loss of children or siblings, with labor without reward, and difficulties abound. Dying in a foreign land, it is not advisable to go out, and those with good innate conditions will be lucky. (Bad)";
        case 15:
            return "15. Kindness and virtue highly respected Divination. Blessed with fortune, longevity, and complete happiness. This number indicates having elders and noble persons, friends, and subordinates supporting you, leading to complete happiness, prosperity, and honor. Building wealth and gathering fortunes will bring about descendants and wealth. It favors late-life blessings. (Good)";
        case 16:
            return "16. Home-loving and benevolent Divination. Surpassing in leadership, often assisted by influential persons, a leader's number, having fortune, longevity, and blessings, three virtues. Kind-hearted and often in a high position, with the support of the masses, one can accomplish great things. This number is also suitable for women, without the risk of excessive masculinity. (Good)";
        case 17:
            return "17. Firm and unyielding Divination. Possessing strong perseverance, often breaking through obstacles, heavy with authority, breaking through all difficulties. However, lacking harmony with people, there is a risk of inviting trouble due to a lack of accommodation, leading to difficulties. As long as there is gentleness within strength, dangers can be averted, but women using this number may tend towards masculine qualities. (Half Good)";
        case 18:
            return "18. Holding power and reaching influence Divination. Having authority and prestige, but lacking tolerance. Similar to the number 17, it has wisdom and strategy, as well as authority, but also lacks harmony with people, easily leading to difficulties due to a lack of tolerance. This number symbolizes achieving success and fame. For women, if combined with the Five Elements and Eight Characters, it can be used. (Half Good)";
        case 19:
            return "19. Failure and adversity Divination. Prone to setbacks, lacking support from noble persons, unfavorable for spouses, like facing turbulent currents after a storm, though possessing intelligence, the journey is filled with danger and failure, resulting in illness, disability, widowhood, and short life. This number may also produce odd geniuses or unique individuals. (Bad)";
        case 20:
            return "20. Destruction and decline Divination. Facing numerous difficulties and hardships. This number signifies failure in all endeavors, being at a loss with no progress, and is indicative of things falling into decay. It may lead to disability or serious illness, and is absolutely inauspicious. It symbolizes initial sweetness followed by bitterness. (Bad)";
        case 21:
            return "21. Independence and authority Divination. Universally respected, possessing leadership abilities. This number indicates leadership, being respected by others, and enjoying wealth and honor. It signifies the success of building a prosperous and glorious career, though it's unfavorable for women. However, with suitable compatibility in their astrological chart, it can be considered auspicious, even for strong-willed women. (Good)";
        case 22:
            return "22. Autumn grass encountering frost Divination. Facing continuous disasters, and experiencing a bleak future. This number suggests broken aspirations and faltering ambitions, leading to sickness, adversity, and setbacks. It also indicates the potential for romantic misfortunes, where women might be beautiful and talented but suffer from the loss of husband and children. (Bad)";
        case 23:
            return "23. Magnificent and courageous Divination. Soaring to great heights, overcoming all difficulties. This number embodies the spirit of overcoming all hardships with courage and determination, achieving great success. However, it warns against excessive rigidity and strength, which may lead to unfavorable outcomes. It's advisable for women to maintain a balance between strength and gentleness to avoid relationship issues. (Good)";
        case 24:
            return "24. Abundant wealth and blessings Divination. Exceptionally talented and frugal. This number suggests starting from scratch and achieving great success, gaining immense wealth, health, fame, and fortune. It's suitable for both men and women and brings prosperity to the family. It's the only auspicious number among the four. (Good)";
        case 25:
            return "25. Outstanding and intelligent Divination. Proud and talented, exceptionally gifted. This number represents exceptional talent and intelligence, with men being handsome and women being beautiful. It suggests favorable relationships with the opposite sex, blending softness with strength, leading to success and development. However, it may also indicate a tendency towards arrogance and artistic temperament. (Half Good)";
        case 26:
            return "26. Turbulent waves Divination. Characterized by intelligence and agility, with life full of changes. This number signifies extraordinary talent and unpredictability, akin to encountering turbulent waves at sea. It often leads to heroic endeavors and remarkable achievements but comes with challenges and suffering. While it fosters a sense of justice, it may also lead to sacrifices for noble causes. It's commonly associated with great individuals and martyrs, but women should avoid it to prevent conflicts. (Bad)";
        case 27:
            return "27. Setbacks and obstacles Divination. Prone to attacks and fluctuations. This number suggests a lack of popularity, setbacks, and slander, leading to difficulties in accomplishing goals. It signifies a life filled with troubles, including legal issues, illnesses, loneliness, and setbacks in old age, symbolizing a state of melancholy. (Half Good)";
        case 28:
            return "28. Calamities and separations Divination. Frequent disasters and separations. This number, also known as the misfortune and disaster number, signifies failure despite heroic efforts, bringing about familial suffering. It suggests a life of hardship and toil, with family ties being severed. For women, it indicates widowhood and continuous misfortune, including loss of wealth and marriage. (Bad)";
        case 29:
            return "29. Distinguished intellect and strategy Divination. Stepping into prosperity despite endless trials. This number brings fortune when encountered with auspicious signs and misfortune when confronted with inauspicious signs. It's a noble number in numerology, signifying intelligence, strategy, and success. However, recklessness and overconfidence should be avoided, as it may lead to complications. When used by women, it enhances their grace and dignity. (Good)";
        case 30:
            return "30. Fluctuating fortunes Divination. Uncertain success, but encountering opportunities in adversity. This number indicates taking risks, where success or failure depends on external factors and fate. It suggests a life filled with uncertainty, with significant ups and downs, successes, and failures, influenced by external circumstances and destiny. It's associated with the concept of destiny in numerology. (Half Good)";
        case 31:
            return "31. Harmony and perfection Divination. Possessing intelligence, benevolence, and courage, capable of achieving great success. This number is considered extremely auspicious, suitable for both men and women. It signifies leadership, possessing intelligence, benevolence, and courage, which lead to great accomplishments, prosperity, and honor. It's associated with happiness and good fortune. (Good)";
        case 32:
            return "32. Fortunate encounters and success against all odds Divination. This number suggests that despite facing obstacles, success can be achieved through fortunate encounters and assistance from superior figures. It signifies achieving success with ease, supported by influential figures, leading to rapid progress. It's a number of minor achievements and small gains, achievable with courage and determination. (Good)";
        case 33:
            return "33. Firm and decisive Divination. Reaching the peak of success, but may be too rigid. This number represents a union of phoenix and dragon, indicating a rise to fame and fortune, with one's name echoing across the world. However, excessive rigidity and strength may lead to unfavorable outcomes. For women, compatibility with the Five Elements in their astrological chart is essential to mitigate any adverse effects on relationships. (Good)";
        case 34:
            return "34. Ruin and demise Divination. Encountering madness, facing loneliness and misery. This number symbolizes ruin and decline, with life characterized by hardship, despair, and separation. It suggests the possibility of mental illness, short life spans, bloodshed, and familial discord. It signifies a state of loneliness and sorrow, where individuals experience profound suffering and sorrow. (Bad)";
        case 35:
            return "35. Conservative and peaceful Divination. Gentle and just, meticulous and righteous. This number suggests gentleness and righteousness, leading to success and fulfillment. It signifies qualities of femininity and morality, suitable for artistic and technical endeavors, leading to achievements and success. This number favors women and brings about family prosperity, but men may tend towards minor achievements and passivity, requiring courage. With proper alignment with the Five Elements, it becomes auspicious. (Good)";
        case 36:
            return "36. Turbulent waves Divination. Characterized by myriad changes and fluctuations. This number signifies the adventurous spirit, where success or failure depends on external factors and fate. It suggests a life filled with ups and downs, significant achievements, and failures, influenced by external circumstances and destiny. It's associated with extraordinary individuals and risky endeavors, but women should avoid it to prevent adversities. (Half Good)";
        case 37:
            return "37. Kindness and loyalty Divination. Enjoying authority and wealth. This number represents independent authority and lasting prosperity, signifying a life of wealth, honor, and longevity. It suggests being sincere and trustworthy, overcoming all obstacles to achieve greatness, leading to a life of wealth and honor. However, individuals should be cautious of arrogance and cultivate moral virtues for sustained happiness. (Good)";
        case 38:
            return "38. Weakness and mediocrity Divination. Lacking willpower and prone to giving up halfway. This number suggests feelings of regret and disappointment, indicating a lack of leadership and prestige. It signifies a lack of talent in leading others, but individuals may find success in personal abilities, especially in artistic skills. (Half Good)";
        case 39:
            return "39. Glory and wealth Divination. Overcoming adversity to achieve breakthroughs. This number symbolizes the rise from adversity to prominence, achieving fame, fortune, and longevity. It signifies wisdom, strategy, and grace, bringing blessings to oneself and future generations. However, due to its extreme nature, women should avoid it, unless their astrological chart indicates compatibility. (Half Good)";
        case 40:
            return "40. Fluctuations and changes Divination. Vigorous and arrogant, fond of speculation and risk-taking. This number suggests retreat and downfall, despite being rich in strategy and courage. It warns against arrogance and slander, attracting misfortune and leading to sickness, short life spans, and widowhood. It's advisable to avoid using this number. (Half Good)";
        case 41:
            return "41. Integrity and virtue Divination. Striving for excellence with a single-minded focus. This number represents pure positive energy, indicating fame, fortune, and longevity. It's considered one of the most auspicious numbers in numerology, leading to great achievements and prosperity for both men and women. It signifies a noble character and a strong desire for success and progress. (Good)";
        case 42:
            return "42. Broad knowledge and talents Divination. But lacking perseverance. This number represents versatility and proficiency, indicating expertise in various fields. It's an odd number in numerology, suggesting both good and bad aspects. It signifies adaptability and intelligence, leading to success or failure depending on circumstances. It can be used effectively when aligned with the Five Elements. (Half Good)";
        case 43:
            return "43. Weakness and scatterbrained Divination. Lacking firm beliefs, adept at wielding power and influence. This number signifies bankruptcy in name and spirit, despite possessing talent. It suggests superficial achievements, internal failures, and extravagance. Women who use this number may fall into temptation and instability, leading to significant risks. (Bad)";
        case 44:
            return "44. Adversity and depression Divination. Facing constant obstacles and experiencing a bleak future. This number symbolizes a broken family and a ruined life, indicating frustration and failure despite one's heroic efforts. It suggests mental illness, short life spans, martyrdom, or great inventions. Women who use this number may face widowhood and must focus on spiritual cultivation. (Bad)";
        case 45:
            return "45. Great virtue and generosity Divination. Sailing with the wind, embarking on a great journey. This number represents smooth sailing and great success, leading to fame, wealth, and happiness. However, it warns against complacency and division during success, as it may lead to danger or calamity. (Good)";
        case 46:
            return "46. Bearing treasures but sinking ships Divination.Caught in a net of heaven and earth. This number signifies unexpected achievements and unique talents, akin to entering a treasure mountain but returning empty-handed. It suggests a lack of energy, leading to destruction and danger. While it may bring temporary success, it's not long-lasting. Women should avoid using this number to prevent widowhood and loneliness. (Half Good)";
        case 47:
            return "47. Auspicious and Celebratory Divination. Grass and trees in spring, beneficial for partnership in business. One of the great auspicious numbers, beautiful flowers and fruits, obtaining power, honor, and wealth. It signifies success in both attack and defense, enjoying the happiness of descendants and wisdom, a great auspicious number for a happy family. Suitable for both men and women. (Good)";
        case 48:
            return "48. Wise and Virtuous Divination. Plenty of wisdom, suitable for advisors and counselors. This number represents virtue, great advantage of wise teachers, full of intelligence and talent, able to assist others in achieving great things. It signifies having virtue and trustworthiness, achieving fame, fortune, longevity, and completeness in both wealth and life. Can receive wealth from heaven. (Good)";
        case 49:
            return "49. Changing to Benevolence Divination. Goodness mixed with evil, evil mixed with goodness. Half auspicious and half inauspicious, encountering good fortune turns into good fortune, encountering bad fortune turns into bad fortune. It must be coordinated with other numbers for interpretation. It stands on a high peak, with success and failure determined by one's virtue and thoughts. Women should avoid using this number. (Half auspicious)";
        case 50:
            return "50. Lonely and Sorrowful Divination. A momentary fame, may achieve temporary glory. First sweet, then bitter. This number represents one success and one failure. In old age, it brings great danger and misery, leading to calamities such as punishment, injury, loneliness, and disasters. A good heart, virtue, and wisdom can remedy this. (Half auspicious)";
        case 51:
            return "51. Victory then Decline Divination. Half-life of prosperity and decline, success followed by failure. Similar to the number fifty, this number indicates one success and one failure. It brings sudden disasters during success, and instability and difficulty in achieving great things in old age. High buildings collapse, treasures are lost at sea. It is a rarely seen inauspicious number among single-digit numbers. (Half auspicious)";
        case 52:
            return "52. Distinguished and Wise Divination. Deep planning and far-sightedness, with foresight. It has the strength to achieve great things, with fame, fortune, and both name and gain. It indicates the ability to see ahead, with both fame and fortune. Suitable for both men and women as a great auspicious number. This number contains the seeds of success, but is not conducive to love affairs. Those with weak constitutions can use it without affecting marriage. (Good)";
        case 53:
            return "53. Difficulties and Inner Worries Divination. Sunset in the west, stable and reliable for self-preservation. This number can achieve temporary success, but setbacks come quickly, failing to achieve great things in life. Good fortune hides great dangers. Half-life is rich and noble, half-life is full of disasters. Encountering bad luck will bring more misfortune and invite disaster and death to the family. (Bad)";
        case 54:
            return "54. Decline and Unreached Divination. Many disasters and hardships, barely breathing. Similar to the number thirty-four, both are very inauspicious numbers in numerology. They bring bankruptcy, family collapse, illness, and separation, unable to achieve great things and ending in failure. This number must never be used. Both men and women should avoid it. (Bad)";
        case 55:
            return "55. External Glory, Internal Decline Divination. Outward glory but inner decline, extreme auspiciousness brings calamity. This number has an outward appearance of prosperity but poor substance. It is an inauspicious number. Both men and women should avoid using it. Those who have it are prone to nervous breakdowns. Despite ambitious goals, they harm themselves and find it difficult to achieve great things. (Half auspicious)";
        case 56:
            return "56. Defeated and Unsteady Divination. Lack of perseverance and persistence, constant setbacks. This number lacks willpower and often gives up halfway. It indicates failure due to lack of courage and achievement due to lack of energy. It symbolizes the hindrance and defeat of energy and mental strength, leading to failure, financial loss, death, and family collapse, with a restless mind. However, there can be improvement through self-cultivation and virtue. (Bad)";
        case 57:
            return "57. Achievements and Risks Divination. Persistence and determination, extraordinary courage and confidence. This number can achieve great success but must face a major danger to succeed. Happiness from natural blessings leads to great wealth and honor. However, it should not be used for improper acts, otherwise it will invite great misfortune. (Good)";
        case 58:
            return "58. Bitter then Sweet Divination. Early hardships, later sweetness. This number indicates early hardships and later sweetness, with extraordinary talents rising above thousands of obstacles and achieving great success. It brings prosperity in old age, with abundant family wealth. This number has a solid virtue and good popularity, leading to success. (Half auspicious)";
        case 59:
            return "59. Willpower and Defeat Divination. Lack of willpower, indecision, and confusion when faced with challenges. This number brings failure and disappointment due to weak personal will. Although there is sufficient innate conditions, one needs great courage and popularity. Indulgence in pleasure and arrogance leads to sudden failure. Women should avoid using it, otherwise they will fall into loneliness and widowhood. (Bad)";
        case 60:
            return "60. Unplanned and Lost Divination. Indecisiveness, lack of initiative and goals. This number indicates lack of planning, poor judgment, and walking alone, stubbornly sticking to one's own views and inviting great dangers. Good advice may fall on deaf ears. This number is not conducive to business, but human nature is inherently good. Without virtue and wisdom, one easily brings about evil consequences. (Bad)";
        case 61:
            return "61. Prosperous and Flourishing Divination. Prosperity and success, both fame and fortune. This number is one of the greatest auspicious numbers, representing prosperity and prosperity, enjoying divine blessings, and having a flourishing and prosperous life. It is a great auspicious number in the study of names. (Good)";
        case 62:
            return "62. Adding Frost to Snow Divination. Instability, lack of trustworthiness. Similar to the number twenty-two, it has the same inauspiciousness. It lacks energy and strength, things go against one's wishes, and aspirations are hard to fulfill. It is not conducive to career development, and disasters come one after another. Women have the disaster of romantic entanglement, leading a lonely life. (Bad)";
        case 63:
            return "63. Wealthy and Precious Divination. Smooth and easy, with children and grandchildren flourishing. All things receive the blessings of heaven and earth to achieve great success. It is a good cause-and-effect number, gathering wealth, fame, and honor in one's body. If one accumulates virtue and wisdom, one's children and grandchildren will thrive. It is a great auspicious number in the study of names. (Good)";
        case 64:
            return "64. Dull and Ordinary Divination. Life is turbulent and uncertain, with family members dispersing. Like entering turbulent waves, setbacks lead to family collapse and personal tragedies. This number contains the word 'dull', leading to dangers such as illness, short life, debauchery, and loss of children. It must not be used. (Bad)";
        case 65:
            return "65. Fame and Fortune Divination. Fame and wealth come together, longevity and wealth. This number represents the time when all things prosper and wealth is abundant, enjoying fame and wealth, wisdom and talent, and enjoying the blessings of heaven. It is a great auspicious number in the study of names. (Good)";
        case 66:
            return "66. Retreat and Leisure Divination. Losing trust, internal and external disharmony. This number enjoys oneself, internal and external disharmony, advance and retreat are difficult to decide, suffering and trouble come one after another, but with great wisdom, one can retreat and enjoy oneself, which can bring about blessings and wisdom. This number also produces extraordinary people. (Bad)";
        case 67:
            return "67. Self-Improvement Divination. Starting from scratch, with the courage to be independent. This number indicates steady progress, like climbing stairs, establishing oneself and prospering the family, achieving great fame and fortune with bare hands. Those with weak constitutions can achieve great success, with good health, reputation, and wealth, and auspiciousness at the family gate. (Good)";
        case 68:
            return "68. Dominant and Benevolent Divination. Loyalty, honesty, and establishment of a family and career. It is endowed with intelligence and enlightenment, with the spirit of chivalry and heroes. It is great for starting a business and has the ambition to achieve great things. However, being too arrogant invites jealousy, and having good human relations is essential. This number also produces heroes, martyrs, or eccentric people. (Good)";
        case 69:
            return "69. Sinking and Difficult Divination. Hard to settle down, prone to restlessness. Family ties are thin, unsatisfactory, and insufficient. It leads to loneliness, weakness, and failure. If other fortunes are bad, it is easy to invite unexpected disasters. Be careful in middle and old age, otherwise, you will sink into silence. (Bad)";
        case 70:
            return "70. Destruction and Defeat Divination. Weakness and extreme misfortune, prone to extreme misfortune. Misfortune accumulates, both internally and externally, and everything is difficult to resolve. It is a number of misfortune and disaster, with internal and external worries, difficulties in everything, short life, and disasters such as punishment, disease, and death. It is not conducive to achievement. (Bad)";
        case 71:
            return "71. Mixed Fortunes Divination. Pillows are held all night, and achievements can only be achieved with hard work. Advance and retreat are difficult, and good and bad luck are unpredictable, like being at sea, at a loss. This number changes from auspicious to inauspicious, and from inauspicious to auspicious. However, in the midst of prosperity, it is difficult to control, but those with human luck and innate virtue can be saved. (Half auspicious)";
        case 72:
            return "72. External Luck, Internal Misfortune Divination. Sweetness turns to bitterness, caution is advised early on. Endowed with talents and energy, but strength does not match ambition. Although there is a prosperous and harmonious beginning, it will eventually fall into a predicament. Favoring appearances, it's auspicious on the outside but harbors misfortune within. This number is particularly dangerous for women, as it leads to external beauty but internal worries and dangers. (Half auspicious)";
        case 73:
            return "73. Ambitious but Lacking Talent Divination. Grand ambitions but lacking in ability. This number has authority and weight, but ambitions outweigh abilities. Eyes are high but hands are low, failing to display courage. There's a tendency towards arrogance and pride, leading to failure and downfall. However, there are times when one can turn the tide through opportunities, making it a mixed fortune number. (Half auspicious)";
        case 74:
            return "74. Sinking and Harmful Divination. Lack of intelligence, leading a fruitless life. Unable to achieve due to lack of effort, like drifting with the wind, leading to the collapse of the family and personal tragedies. Suffering from sickness, short life, debauchery, and drastic changes. Women should avoid using it, as it leads to loneliness or female ailments. (Bad)";
        case 75:
            return "75. Wise and Retiring Divination. Misfortune follows effort, safety in retreat. Women are beautiful, and men are handsome, but lacking in great masculine energy, not conducive to major achievements. Only suitable for retreating and protecting oneself, enjoying one's own body, and not being restless. (Bad)";
        case 76:
            return "76. Illness and Danger Divination. Danger and challenges, leading a life of uncertainty. Facing danger and challenges, life is full of difficulties. Although there are moments of glory, they are fleeting. This number is peculiar, creating extraordinary individuals, heroes, or martyrs. However, it is not favorable for marriage, leading to loneliness or widowhood. Women are particularly endangered. (Bad)";
        case 77:
            return "77. Half Sorrow, Half Joy Divination. Hard work in early life, happiness in later years. Family prosperity, but suddenly facing loneliness. It's a mixture of joy and sorrow, with talents and arrogance, finding joy within oneself and not seeking external prosperity. This number also creates peculiar and heroic individuals, with good fortune hidden within misfortune. However, when prosperity reaches its peak, decline is inevitable, and women should avoid using it. (Half auspicious)";
        case 78:
            return "78. Diligent and Wise Divination. Ideal in early life, lonely in later years. This number is full of talent and wisdom, but lacks in achievement. One success, one failure, only a moment apart, like a person in the waves, unable to control oneself. This number can turn wealthy and healthy when encountering auspiciousness, but it's difficult to achieve when encountering misfortune. (Bad)";
        case 79:
            return "79. Internal and External Details Divination. Courage without strategy, lacking comprehensive planning. This number is the nobleman's gua, but lacks energy. Despite temporary prosperity, there is a tendency to cling to old ways and arrogance. Although noble people may help, it's difficult to understand one's ambitions. (Bad)";
        case 80:
            return "80. Surging Waves Divination. Turbulent waves, a life of hardship. Failures and calamities, everything goes against one's wishes, unable to achieve anything. It's a number of failure and disaster, like being in turbulent waves all the time. This number also produces peculiar individuals like heroes, martyrs, filial sons, and virtuous women, but they all suffer from poor health. (Bad)";
        case 81:
            return "81. Spring Breeze Divination. The spring breeze is delightful, great honor and wealth. The most auspicious number, representing the greatest honor and wealth, enjoying all blessings, achieving great things. It's the most auspicious number, suitable for both men and women, capable of achieving great success, and thriving descendants. (Good)";
        default:
            return "Invalid score. Please enter a valid domain.";

    }
}



    


