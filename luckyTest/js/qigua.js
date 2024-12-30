
// qigua.js

// import wixData from 'wix-data';
// import wixUsers from 'wix-users';

// console.log("Debug message:");
// let user = wixUsers.currentUser;
// console.log("Debug message:", user.FullData.firstName);


function calculateJiXiong(mode) {
    var result;

    if (mode === 'single') {
        result = getJiXiongResultSingle();
        displayResultGradually(result, 'resultTextSingle', 'resultSingle', 'resultMultiple');
    } else if (mode === 'multiple') {
        result = getJiXiongResultMultiple();
        displayResultGradually(result, 'resultTextMultiple', 'resultMultiple', 'resultSingle');
    }
}


function displayResultGradually(result, resultTextId, resultDivId, otherResultDivId) {
    const resultTextElement = document.getElementById(resultTextId);
    const resultDivElement = document.getElementById(resultDivId);
    const otherResultDivElement = document.getElementById(otherResultDivId);

    resultTextElement.innerHTML = '';
    resultDivElement.style.display = 'block';
    otherResultDivElement.style.display = 'none';

    let index = 0;
    const interval = setInterval(() => {
        resultTextElement.innerHTML = `<p>${result.slice(0, index)}</p>`;
        index++;
        if (index > result.length) clearInterval(interval);
    }, 150); // 每50毫秒显示一个字符
}



function getJiXiongResultSingle() {
    // 计算一日一卦的吉凶逻辑
    initGuaJie();
    return getOneJixiongPerDay();
}

function getJiXiongResultMultiple() {
    // 计算一日多占的吉凶逻辑
    initGuaJie();
    return getMultiJixiongPerDay();
}


function getOneJixiongPerDay(){
                                var now = new Date();

                                var hh = now.getHours();            //时
                                var mm = now.getMinutes(); 
                                var ss = now.getSeconds();

                                var hh1 = parseInt(hh);
                                var mm1 = parseInt(mm);
                                var ss1 = parseInt(ss);

                                
                                
                                var shangGuaShu = hh1%8;
                                if(shangGuaShu==0){
                                    shangGuaShu = 8;
                                }
                                
                                var xiaGuaShu = mm1%8;
                                if(xiaGuaShu==0){
                                    xiaGuaShu=8;
                                }

                                var dongYao = parseInt((hh1+mm1)%6);
                                if(dongYao==0){
                                    dongYao=6;
                                }
                               
                                //另外一种起卦方式：直接相加余8得到上卦和下卦，总数余6得到动爻
                                var result = "";
                                shangGua = parseInt(hh1);
                                shangGuaShu = shangGua%8;
                                if(shangGuaShu==0){
                                    shangGuaShu = 8;
                                }
                                xiaGua = parseInt(mm1);
                                xiaGuaShu = xiaGua%8;

                                
                                if(xiaGuaShu==0){
                                    xiaGuaShu=8;
                                }
                                dongYao = (xiaGua+shangGua)%6;
                                if(dongYao==0){
                                    dongYao = 6;
                                }
                                var pretext = "";
                                pretext =  "分："+hh+" "+mm+" "+ shangGuaShu +" "+xiaGuaShu+" "+ dongYao +" ";       
                                result= pretext+guaJie[shangGuaShu.toString()+xiaGuaShu.toString()][0]+" "+ guaJie[shangGuaShu.toString()+xiaGuaShu.toString()][dongYao];
                                result= guaJie[shangGuaShu.toString()+xiaGuaShu.toString()][dongYao];
                                
                                return result;
}
function getMultiJixiongPerDay(){
                                var now = new Date();

                                var hh = now.getHours();            //时
                                var mm = now.getMinutes(); 
                                var ss = now.getSeconds();

                                var hh1 = parseInt(hh);
                                var mm1 = parseInt(mm);
                                var ss1 = parseInt(ss);

                                
                                
                                var shangGuaShu = hh1%8;
                                if(shangGuaShu==0){
                                    shangGuaShu = 8;
                                }
                                
                                var xiaGuaShu = mm1%8;
                                if(xiaGuaShu==0){
                                    xiaGuaShu=8;
                                }

                                var dongYao = parseInt((hh1+mm1)%6);
                                if(dongYao==0){
                                    dongYao=6;
                                }
                               
                                //另外一种起卦方式：直接相加余8得到上卦和下卦，总数余6得到动爻
                                var result = "";
                                shangGua = parseInt(hh1);
                                shangGuaShu = shangGua%8;
                                if(shangGuaShu==0){
                                    shangGuaShu = 8;
                                }
                                xiaGua = parseInt(mm1);
                                xiaGuaShu = xiaGua%8;

                                
                                if(xiaGuaShu==0){
                                    xiaGuaShu=8;
                                }
                                dongYao = (xiaGua+shangGua)%6;
                                if(dongYao==0)
                                        dongYao = 6;
                                //result+= "分："+hh+" "+mm+" " + shangGuaShu +" "+xiaGuaShu+" "+ dongYao +" "+ guaJie[shangGuaShu.toString()+xiaGuaShu.toString()][dongYao];
                                
                                //秒级
                                shangGua = parseInt(mm1);
                                shangGuaShu = shangGua%8;
                                if(shangGuaShu==0){
                                    shangGuaShu = 8;
                                }
                                xiaGua = parseInt(ss1);
                                xiaGuaShu = xiaGua%8;

                                
                                if(xiaGuaShu==0){
                                    xiaGuaShu=8;
                                }
                                dongYao = (xiaGua+shangGua)%6;
                                if(dongYao==0){
                                    dongYao = 6;
                                }
                                var pretext = "";
                                pretext =  "秒："+mm+" "+ss+" " + shangGuaShu +" "+xiaGuaShu+" "+ dongYao +" ";       
                                result= pretext+guaJie[shangGuaShu.toString()+xiaGuaShu.toString()][0]+" "+ guaJie[shangGuaShu.toString()+xiaGuaShu.toString()][dongYao];

                                result= guaJie[shangGuaShu.toString()+xiaGuaShu.toString()][dongYao];
                                
                                return result;
}

var guaJie = [[[""],[""]],[[""],[""]]];


                                
function initGuaJie(){
                                guaJie["11"] = [
        "Qian Hexagram",
        "Cannot be used, no opportunity to act",
        "Good for meetings",
        "Diligent, in difficulty, but ultimately no disaster",
        "Able to act without disaster",
        "Great accomplishments",
        "Beautiful sunset, but close to twilight"
    ];
    guaJie["88"] = [
        "Kun Hexagram",
        "Autumn's arrival foretells winter",
        "Safe to proceed",
        "Fairly satisfying, no achievement but a good ending",
        "Cautious behavior, neither good nor bad",
        "Yellow, great fortune",
        "Conflict leads to poverty"
    ];
    guaJie["64"] = [
        "Tun Hexagram",
        "Hesitation and indecision, suitable for settling down",
        "A woman remains barren for a long time",
        "Lacking guidance and confidence, it's better to give up",
        "Proceeding is auspicious",
        "Asking about small matters brings good fortune; asking about big matters brings misfortune",
        "Silent weeping, tears flowing"
    ];
    guaJie["76"] = [
        "Meng Hexagram",
        "Do not let the enemy go",
        "This is a good omen, especially for marriage",
        "Not favorable for marriage",
        "Living alone away from society is not advisable",
        "Gentle obedience brings good fortune",
        "With the support of many, victory is certain"
    ];
    guaJie["61"] = [
        "Xu Hexagram",
        "Patience and perseverance lead to safety",
        "Delays may lead to lost opportunities, but the outcome is still positive",
        "Dangerous environment, disaster is near. Caution and adaptability will avoid loss",
        "Initially stranded in blood but eventually escaping danger",
        "Waiting at a feast, favorable conditions await",
        "An uninvited guest comes; treating them with respect brings good fortune"
    ];
    guaJie["16"] = [
        "Song Hexagram",
        "Things will not remain as they are; small mistakes lead to favorable outcomes",
        "Failure in lawsuits, retreating home is inevitable",
        "Fortunes rely on ancestral blessings",
        "Failure in litigation, submission to judgment",
        "Legal disputes bring great fortune",
        "Virtue mismatch brings temporary victory"
    ];
    guaJie["86"] = [
        "Shi Hexagram",
        "Victory relies on discipline, disobedience brings danger",
        "Commanders lead the troops effectively, auspicious without disaster",
        "Defeat in battle, casualties returning. Ominous sign",
        "Judgment based on circumstances avoids danger",
        "Inappropriate assignments",
        "Recognize achievements but avoid promoting unworthy individuals"
    ];
    guaJie["68"] = [
        "Bi Hexagram",
        "Capture prisoners and pacify them, no disasters",
        "Harmony within leads to prosperity",
        "Associating with vile characters is regrettable",
        "Form alliances and friendships, auspicious",
        "Maintaining a balanced approach brings fortune",
        "Conflicts prevent unity, ominous"
    ];
    guaJie["51"] = [
        "Xiao Xu Hexagram",
        "Return on the original path, auspicious",
        "Guidance brings fortune",
        "A broken wheel, strife between spouses",
        "Concerns diminish but vigilance is required",
        "Sharing resources brings fortune",
        "After long rain, fields flourish"
    ];
    guaJie["12"] = [
        "Tian Ze Lü Hexagram",
        "Acting with simplicity avoids disaster",
        "Integrity and sincerity bring fortune",
        "Struggles bring danger",
        "Overcoming risks leads to fortune",
        "Impatience leads to peril",
        "Caution and thoroughness yield great fortune"
    ];
    guaJie["81"] = [
        "Tai Hexagram",
        "Uprooting troubles leads to fortune",
        "Lost wealth restored through others' help",
        "Overcome challenges without fear of loss",
        "Deceit invites calamity",
        "Marriage brings blessings, auspicious",
        "Half-hearted efforts bring misfortune"
    ];
    guaJie["18"] = [
        "Pi Hexagram",
        "Cleaning corruption brings fortune",
        "Household harmony reflects contentment",
        "Shame reflects misalignment of virtue",
        "Rewards bring harmony",
        "Vigilance prevents destruction",
        "Bad fortune turns to good with persistence"
    ];
    guaJie["13"] = [
        "Tong Ren Hexagram",
        "Unity brings great achievements",
        "Seeking guidance during challenges",
        "Patience secures favorable outcomes",
        "Boldness achieves victory",
        "Strengthening bonds results in success",
        "Celebrations for victories, no regrets"
    ];
    guaJie["31"] = [
        "Da You Hexagram",
        "Avoid harm to others, no misfortune",
        "Carrying goods to a clear destination, no harm",
        "Royal feasts for the worthy, excluding the unworthy",
        "Fighting evil brings safety",
        "Inspiring awe ensures peace",
        "Heaven’s blessings bring great success"
    ];
    guaJie["87"] = [
        "Qian Hexagram",
        "Humble virtues lead to prosperity",
        "Wisdom and humility bring fortune",
        "Diligence ensures good outcomes",
        "Everything favorable through courage and caution",
        "Poverty inspires action against invaders",
        "Wisdom leads to successful conquests"
    ];
    guaJie["48"] = [
        "Yu Hexagram",
        "Indulgence invites misfortune",
        "Saved from calamity through intervention",
        "Idleness brings regret",
        "Hunting yields great success",
        "Longevity despite prolonged illness",
        "Pleasure amidst impending doom"
    ];
    guaJie["24"] = [
        "Sui Hexagram",
        "Following principles brings shared success",
        "Catching small gains, losing bigger opportunities",
        "Focus on greater achievements, auspicious",
        "Greed invites misfortune",
        "Securing prisoners brings peace",
        "Entrapment signifies hardship"
    ];
                            guaJie["75"] = [
        "Mountain Wind Gu",
        "Inheriting the father's business and having a filial son, there is no disaster. Even if faced with danger, the outcome is auspicious",
        "Inheriting the mother's business is unpredictable",
        "Inheriting the father's business, even with slight mistakes, will not result in major issues",
        "Expanding the father's business faces numerous difficulties",
        "Inheriting the father's business earns praise",
        "Not serving the lords because one values their self-worth"
    ];
    guaJie["82"] = [
        "Earth Lake Lin",
        "Governing the people with compassionate policies brings auspicious signs",
        "Ruling with gentle policies brings fortune",
        "Ruling with oppressive policies yields no benefit. Reflecting and regretting can avert disaster",
        "Personally governing the country brings no harm",
        "Wisely ruling the people gains the trust of the king, naturally auspicious",
        "Ruling with kindness and integrity brings great fortune"
    ];
    guaJie["58"] = [
        "Wind Earth Guan",
        "Short-sightedness may be harmless to ordinary people but can be disastrous for significant figures",
        "Being confined to a narrow perspective is favorable for women",
        "Observing family intentions to decide governance strategies",
        "Observing the nation’s achievements and customs reflects the visit of distinguished guests",
        "Understanding family intentions helps gentlemen avoid errors",
        "Observing the intentions of other tribes ensures no mistakes for gentlemen"
    ];
    guaJie["34"] = [
        "Fire Thunder Shi Ke",
        "Dragging chains and injuring toes but without major disaster",
        "People enjoy undeserved blessings but face no significant misfortune",
        "Encountering troubles, but not extremely severe",
        "Fortune inquiring about difficult matters",
        "Signs of danger but ultimately no disaster",
        "Ignoring advice and breaking laws leads to misfortune"
    ];
    guaJie["73"] = [
        "Mountain Fire Bi",
        "Abandoning a cart and walking to display the beauty of shoes",
        "An elderly person rejuvenating a country with the king",
        "Running forward, drenched in sweat, seeking fortune over an extended period",
        "It’s not robbery but marriage, doubts vanish with no disaster",
        "Initial difficulties but eventual success with joyful marriage",
        "Presenting white fabric adorned with colorful patterns without hindrance"
    ];
    guaJie["78"] = [
        "Mountain Earth Bo",
        "The bed legs break; no need to divine as this is a sign of danger",
        "The bed board breaks; no need to divine as this is a sign of danger",
        "Occupying the neighbor’s land and people without disaster",
        "Stripping the beddings signals imminent disaster",
        "Palace members receive favors in turn, beneficial",
        "Laborers don’t eat while idlers feast; gentlemen ride lavish chariots while commoners suffer in meager huts"
    ];
    guaJie["84"] = [
        "Earth Thunder Fu",
        "Returning shortly after leaving brings no major fault, greatly auspicious",
        "Returning fulfilled is auspicious",
        "Returning troubled indicates danger, retreat to avoid disaster",
        "Returning alone midway reflects adherence to righteousness",
        "Evaluating the situation and deciding to return avoids regret",
        "Getting lost and failing to return is dangerous with disaster, leading to defeat and national losses"
    ];
    guaJie["14"] = [
        "Heaven Thunder Wu Wang",
        "Avoid improper actions for auspicious outcomes",
        "Attempting gain without effort yields no wealth",
        "Unexpected disaster, akin to a stray ox being tied and stolen, causing losses",
        "Satisfactory divination with no disaster",
        "Recovering from unexpected illness without panic",
        "Avoid reckless actions to prevent misfortune"
    ];
    guaJie["71"] = [
        "Mountain Heaven Da Xu",
        "Danger looms but sacrifices can avert misfortune",
        "The wheel breaks, but no major concern",
        "Beneficial journeys align with intentions",
        "Celebratory events are forthcoming",
        "Enclosing a wild boar brings fortune",
        "Heavenly blessings bring great prosperity"
    ];
    guaJie["74"] = [
        "Mountain Thunder Yi",
        "Hoarding wealth while envying others invites misfortune",
        "Struggling to make ends meet through farming or robbery, a dangerous endeavor",
        "Living immorally leads to prolonged misfortune",
        "Seeking sustenance without malice ensures safety",
        "Farming provides a peaceful life, divination shows auspicious outcomes",
        "Following virtuous paths starts hard but ends auspicious"
    ];
    guaJie["25"] = [
        "Lake Wind Da Guo",
        "Respectfully presenting offerings averts disaster",
        "Old trees sprouting or old men marrying young women, without misfortune",
        "Sagging roof beams indicate danger",
        "Straightened beams bring fortune unless unexpected challenges arise",
        "Old trees flowering or old women remarrying show neutrality",
        "Wading blindly through deep waters leads to danger but no disaster"
    ];
    guaJie["66"] = [
        "Water",
        "Trapped in a series of pitfalls indicates danger",
        "Navigating risky paths yields minor gains",
        "Being stuck in these perilous areas leads to no achievement",
        "Serving wine and food signifies ceremonial respect despite confinement",
        "Partially filled pits and leveled hills indicate no disaster",
        "Binding and imprisoning in thorny surroundings results in prolonged hardship"
    ];
    guaJie["33"] = [
        "Fire",
        "Alertness to noises ensures no disaster",
        "Yellow rainbows bring great fortune",
        "Evening rainbows indicate ominous signs requiring communal offerings",
        "Sudden disasters with widespread destruction",
        "Post-disaster mourning ends with fortune",
        "Retaliation leads to victory"
    ];
    guaJie["27"] = [
        "Lake Mountain Xian",
        "Injury to the big toe",
        "Injuries to calves indicate staying indoors to recover",
        "Injuries to thighs and lower regions bring disaster when traveling",
        "Fortune in adhering to righteous paths",
        "Back injuries without disaster",
        "Injuries to cheeks and tongue"
    ];
    guaJie["45"] = [
        "Thunder Wind Heng",
        "Continuous digging risks collapse and disaster",
        "Persistence avoids regret",
        "Failing to uphold virtues results in shame and difficulties",
        "Prolonged adversity yields no benefit",
        "Consistency favors women but poses risks for men",
        "Endless motion leads to danger"
    ];
    guaJie["17"] = 
    [
        "Heaven Mountain Retreat",
        "When all virtuous individuals retreat, the country faces danger and becomes unproductive",
        "Tied tightly with yellow oxhide ropes, unable to escape",
        "The danger caused by being unable to retreat decisively is like being exhausted by illness; one should rest and recover instead of acting rashly",
        "Loving seclusion is auspicious for the virtuous but not necessarily for the unworthy",
        "Timely retreat is commendable, divination for the future indicates smooth and auspicious outcomes",
        "Fleeing far away to seclude oneself in the mountains brings no harm"
    ];
    guaJie["41"] = 
    [
        "Thunder Heaven Great Strength",
        "Injured toes. Going on an expedition is ominous but still yields some gains",
        "Auspicious sign",
        "A fool hunts with brute force, while the wise use nets. Divination indicates danger. A ram’s horns are caught in a fence, unable to advance or retreat",
        "Divination yields an auspicious sign with no regrets. The ram breaks free of the fence but gets hurt by a cart, caution is needed",
        "Being in the wrong position leads to minor losses but no major disasters",
        "A ram’s horns stuck in a fence signify a difficult situation, but eventual resolution will bring good fortune"
    ];
    guaJie["38"] = 
    [
        "Fire Earth Advance",
        "Attacking the enemy and defeating them, divination is auspicious. Victorious armies neither take prisoners nor plunder, ensuring no disaster",
        "Attack the enemy and suppress them, divination is auspicious because ancestral blessings bring great fortune",
        "Unified efforts lead to an all-out attack without regret",
        "Attacking timidly brings ominous outcomes",
        "No regrets after losing a battle; persistence turns defeat into victory. Everything becomes favorable",
        "Attack must weigh the strengths of both sides. Consider attacking the enemy city, but outcomes are unpredictable: it might be dangerous, auspicious, or neutral"
    ];
    guaJie["83"] = 
    [
        "Earth Fire Darkening",
        "Actions may lead to reprimands from others",
        "A virtuous person is injured but saved by a horse. Auspicious",
        "In southern hunting grounds, bow and arrow secure large beasts. Divination on illness is unfavorable",
        "Return to secluded places! Venturing into society reveals its dangers, prompting thoughts of retreat",
        "Escape to an eastern neighboring country for refuge, divination indicates good fortune",
        "The sun sets; it symbolizes the retreat of virtuous individuals"
    ];
    guaJie["53"] = 
    [
        "Wind Fire Family",
        "Prevent unexpected accidents in the family, and there will be no regrets",
        "A woman managing household affairs and meals ensures everything is auspicious",
        "A poor family struggles to feed everyone, but hard work can lead to prosperity. In contrast, a wealthy family indulges in luxury and leisure, leading to eventual ruin",
        "A happy family brings great fortune",
        "The king worships ancestors at the family shrine. No need to worry; ancestral blessings ensure prosperity",
        "The ruler wields authority with dignity, leading to auspicious outcomes"
    ];
    guaJie["32"] = 
    [
        "Fire Lake Opposition",
        "No regrets. Lost horses will return on their own; even encountering villains poses no danger",
        "Meeting a hospitable host poses no danger",
        "Like one trapped in despair, initial misfortune turns favorable with the help of a strong ally",
        "A lone traveler captured alongside a companion faces danger but ultimately no disaster",
        "No regrets. Witnessing kin sharing meat, a lonely traveler finds companionship and travels safely",
        "A traveler encounters someone seeking marriage. Initial distrust nearly leads to conflict, but mutual understanding resolves issues, allowing continued travel"
    ];
    guaJie["67"] = 
    [
        "Water Mountain Difficulty",
        "Difficult to leave, but returning is safe; know when to retreat and wait for the right time",
        "Repeatedly facing difficulties, not for personal gain",
        "Exiting is full of struggles, but returning brings joy",
        "Exiting is tough, but returning offers comfort and ease",
        "Enduring hardship ultimately brings great rewards",
        "Exiting is challenging, but returning with joy is auspicious, favorable for meeting nobles"
    ];
    guaJie["46"] = 
    [
        "Thunder Water Resolution",
        "No disasters",
        "Hunting yields three foxes, with prey carrying copper-tipped arrows. Divination indicates good fortune",
        "Carrying valuable goods attracts thieves, resulting in robbery. Divination indicates danger",
        "Earning money but becoming lazy leads to capture",
        "The virtuous are freed after imprisonment, bringing good fortune; the unworthy are punished",
        "On a high wall, a nobleman shoots and captures an eagle. This is auspicious"
    ];
    guaJie["72"] = 
    [
        "Mountain Lake Decrease",
        "Attend important sacrifices promptly to avoid disaster. Lavish offerings may be reduced",
        "Auspicious divination. Conquest of other nations is ominous, as it strengthens them instead",
        "Three people traveling together may lead to disagreements, isolating one. A lone traveler should seek companionship",
        "To cure illness, seek spiritual guidance; recovery is likely",
        "Blessed by the heavens with a divine turtle, indicating great fortune",
        "Do not decrease or increase; leaving things as they are avoids disaster. Divination indicates favorable outcomes, including gaining a servant"
    ];
    guaJie["54"] = 
    [
        "Wind Thunder Increase",
        "Favorable for large construction projects, bringing great fortune and no disasters",
        "Receiving a precious turtle worth ten coins; accepting the offer brings long-lasting fortune. Kings sacrificing to deities find auspicious results",
        "Adding offerings to deities during mourning is appropriate",
        "Unity between rulers and subjects strengthens bonds",
        "Capturing and pacifying prisoners earns their gratitude, showing that compassion fosters loyalty",
        "Lacking support and facing attacks, indecision leads to failure"
    ];
    guaJie["21"] = 
    [
        "Lake Heaven Decision",
        "Continuing despite physical strain leads to disaster",
        "Fear and alarm at night due to enemies, but no significant harm",
        "Facial injuries signify danger. Rushing alone in rain brings discomfort but no disaster",
        "Injured hips and stumbling while leading sheep; regret stems from ignoring advice",
        "A goat hopping on the road is harmless",
        "A dog’s howling forewarns impending danger"
    ];
    guaJie["15"] = 
    [
        "Heaven Wind Encounter",
        "Delicate threads tied to brass locks represent auspicious omens. Traveling leads to danger, like a reluctant pig being dragged back",
        "Fish without meat symbolizes modest prosperity; unsuitable for grand feasts",
        "Walking is difficult without assistance",
        "No fish in the kitchen foretells misfortune in actions",
        "Gourds entwined with trees bear beautiful patterns; one falls unexpectedly",
        "Encountering wild animals under their horns is not a good omen, though not disastrous"
    ];
    guaJie["28"] = 
    [
        "Lake Earth Gathering",
        "Captured prisoners escape, causing chaos and worry. Eventually, they are recaptured, bringing joy. Divination indicates bold actions without disaster",
        "Long-term good fortune with no disasters",
        "Sighing with sorrow brings no benefit. Traveling avoids disaster but includes minor troubles",
        "Great fortune and no disasters",
        "Diligent efforts lead only to avoiding disaster due to limited ability",
        "Sighing and weeping with worry, but no disaster"
    ];
    guaJie["85"] = 
    [
        "Earth Wind Rising",
        "Progress and development bring great fortune",
        "Sacrifices performed with sincerity lead to celebrations",
        "Climbing the city built on a hill signifies success",
        "Actions align with natural order",
        "Matters progress step by step",
        "Working tirelessly through the night aligns with this auspicious sign"
    ];
    guaJie["26"] = 
    [
        "Lake Water Difficulty",
        "Punished with a cane and imprisoned in darkness for three years",
        "Drunkenness invites barbarian invasion. Immediate sacrifices can help. Military action is dangerous, but other matters pose no disaster",
        "Tripping on stones and being pricked by thorns; hardships lead to a troubled home with a missing spouse. This is ominous",
        "Imprisoned in a cart but eventually released",
        "Nose and legs injured by barbarians; eventual escape is possible with sacrifices",
        "In such a difficult position, rash actions lead to regret. Divination for military action is favorable"
    ];
    guaJie["65"] = 
    [
        "Water Wind Well",
        "Muddy well water is undrinkable; traps fail to hold beasts",
        "Shooting small fish in the well reflects survival through meager means",
        "Seeing muddy well water distresses the ruler. Cleaning it benefits everyone",
        "Rebuilding the well progresses smoothly",
        "Pure and cold water is drinkable",
        "The trap's narrow top and wide bottom are well-concealed, capturing beasts for great fortune"
    ];
    guaJie["23"] = 
    [
        "Lake Fire Revolution",
        "Bound tightly, unable to act",
        "Changing the date of sacrifices likely foretells celebrations",
        "Defeat in battle signifies danger, but regrouping and trying again can lead to victory and capturing strong enemies",
        "No regrets. Divination for battle yields minor victories, but changing commanders ensures great fortune",
        "Great victories are achieved",
        "Uplifted spirits among leaders contrast with unrest among soldiers. Divination for warfare is dangerous, but peaceful matters are auspicious"
    ];
    guaJie["35"] = 
    [
        "Fire Wind Cauldron",
        "Eliminating evil brings fortune. Taking a concubine due to lack of children brings no disaster",
        "Having food while enemies suffer disease is auspicious",
        "A cauldron's handle breaks, causing trouble. Rationing food during hardship ensures eventual good fortune",
        "Lacking virtue and overburdened leads to danger",
        "A grand cauldron signifies fortune",
        "A cauldron made of metal with jade handles signifies great fortune"
    ];
    guaJie["44"] = 
    [
        "Thunder as Thunder",
        "Hearing thunder initially frightens but later brings calm, resulting in good fortune",
        "Thunderstorms bring danger; losing valuables leads to eventual recovery within days",
        "Thunder during travel causes unease, but continuing onward avoids disaster",
        "Sudden thunder scares someone into the mud, symbolizing lack of courage and knowledge",
        "Loud thunder brings danger, but caution avoids disaster",
        "Thunderstorms bring caution, vigilance, and eventual peace"
    ];
     guaJie["77"] = 
    [
        "Mountain as Mountain",
        "Rest and recuperate without acting impulsively to avoid disaster. This signifies long-term auspiciousness",
        "Stubbornness and refusal to listen to others bring misfortune",
        "Pursuing fame and fortune leads to disaster, as quick retreat and resignation become impossible",
        "Retreating for self-preservation ensures no harm",
        "Speaking less and carefully ensures no regrets",
        "Being steadfast and kind-hearted leads to a good end"
    ];
    guaJie["57"] = 
    [
        "Wind Mountain Gradual Progress",
        "Guard against children's mischief to avoid accidents. Parental intervention ensures no disaster",
        "Enjoying food and drink brings simple happiness",
        "A husband on a distant expedition may not return; a pregnant woman may face risks. However, it benefits defending against enemies",
        "Wild geese land on trees or riverbank logs, signifying no disaster",
        "A wife unable to conceive for years remains irreplaceable, bringing good fortune",
        "Maintaining a calm mind ensures auspicious outcomes"
    ];
    guaJie["42"] = 
    [
        "Thunder Lake Marrying Maiden",
        "Help from others ensures auspicious travel",
        "Favorable divination for prisoners, as staying true despite confinement leads to freedom",
        "Marrying off a daughter with her elder sister as accompaniment is inappropriate",
        "Delays in marriage beyond the ideal age signify waiting for the right time",
        "A woman marrying into a noble family on an auspicious day brings blessings",
        "An empty basket signifies no benefit"
    ];
    guaJie["43"] = 
    [
        "Thunder Fire Abundance",
        "A journey leads to meeting a widowed woman who becomes a spouse. There will be no criticism, but exceeding ten days may bring disaster",
        "Among companions, someone behaves irrationally. Stimulating them might restore clarity",
        "Adding more padding solves no problem; excessive effort leads to harm",
        "At noon, someone speaks of seeing stars, indicating recovery is incomplete. Meeting an old mentor brings peace",
        "Acquiring valuable jade earns widespread praise, an auspicious sign",
        "Expanding a house symbolizes ambition but attracts danger. Peering through a door shows emptiness, as the owner flees misfortune"
    ];
    guaJie["37"] = 
    [
        "Fire Mountain Traveling",
        "Indecisiveness and hesitation lead to leaving a residence and encountering misfortune",
        "Purchasing a male servant brings favorable divination, indicating no issues with the deal",
        "A traveler in a burning marketplace loses a recently bought servant in the chaos, signaling danger",
        "Returning to a temporary residence feels unsafe despite monetary gain, raising fears of theft",
        "Fame for archery skills spreads widely, earning recognition from higher-ups",
        "Burnt bird nests and looted towns leave refugees displaced, recalling past prosperity as days of hardship loom"
    ];
    guaJie["55"] = 
    [
        "Wind as Wind",
        "Advancing or retreating as commanded favors soldiers' divination",
        "A bedridden patient recovers after rituals to ward off misfortune, removing disaster",
        "Reluctant compliance without inner peace indicates a forced situation",
        "Hunting brings abundant rewards",
        "An auspicious omen ensures no regret and broad benefits. Despite a weak start, a strong conclusion on specific days promises success",
        "Hiding under a bed leads to robbery, signaling misfortune in divination"
    ];
    guaJie["22"] = 
    [
        "Lake as Lake",
        "Harmony and joy bring auspicious outcomes",
        "Treating others sincerely earns their genuine reciprocation, ensuring trust and favorable results",
        "Enjoying the obedience of others harbors danger due to overburdened responsibilities and greed",
        "Negotiating diplomatic restoration shows progress despite unresolved differences",
        "Prisoners from a defeated nation invite challenges; punishing provocations turns bad situations into good outcomes",
        "Guiding harmony among people may not always yield unanimous support"
    ];
    guaJie["56"] = 
    [
        "Wind Water Dispersal",
        "Sudden floods prompt horse-riding escapes, leading to injuries but avoiding drowning—an auspicious outcome",
        "Floodwaters destroy homes, sparing lives, marking a fortunate survival",
        "Floodwaters overtake someone who escapes with luck, a cause for gratitude",
        "Floodwaters reach crowds but stop at hills, avoiding devastation thanks to higher ground",
        "Floodwaters inundate the capital and palace, yet timely evacuation averts disaster",
        "Receding floodwaters remove worries, though vigilance prevents recurrence. Avoid bloodshed by maintaining distance"
    ];
    guaJie["62"] = 
    [
        "Water Lake Moderation",
        "Staying indoors prevents action, avoiding disaster due to blocked paths",
        "Remaining indoors also brings danger as opportunities are missed and mistakes accumulate",
        "Lack of thrift leads to poverty, but awareness and repentance avert disaster",
        "Living modestly ensures prosperity",
        "Finding joy in frugality attracts support and blessings",
        "Resenting frugality and failure brings regret, resembling entrapment in hardship"
    ];
    guaJie["52"] = 
    [
        "Wind Lake Sincerity",
        "Performing calming rituals honors ancestors and ensures blessings",
        "Old and young cranes harmonize, symbolizing heartfelt connection",
        "Defeating enemies brings mixed reactions of joy and concern as hidden dangers remain",
        "Mid-month loss of horses poses no major disaster but calls for vigilance",
        "Captive groups bound together signify safety",
        "A chicken flying into the sky cannot sustain flight, indicating misfortune in divination"
    ];
    guaJie["47"] = 
    [
        "Thunder Mountain Minor Passing",
        "Flying birds overhead signify unavoidable danger",
        "Delays bring no harm as efforts eventually succeed",
        "Avoid harsh criticism; guiding correction prevents disaster from indulgence",
        "Severe rebuke deters mistakes, as warnings against risky actions prevent failure",
        "Rain approaches as noble hunts target birds but catch beasts in caves",
        "Unrestrained errors lead to consequences like birds trapped in nets, signifying danger"
    ];
    guaJie["63"] = 
    [
        "Water Fire Completion",
        "Crossing rivers with wet clothing causes minor inconvenience but no harm",
        "Lost headscarves return within seven days, negating the need for searching",
        "A lengthy campaign against enemies concludes victoriously, avoiding reliance on the unworthy",
        "Leaky and patched boats cause constant anxiety",
        "Sparse sacrifices receive blessings as opposed to extravagant offerings",
        "Crossing rivers with heads submerged indicates unsustainable danger"
    ];
    guaJie["36"] = 
    [
        "Fire Water Incompletion",
        "Crossing rivers with wet clothes warns against ignoring caution",
        "Crossing rivers with belts lifted is auspicious",
        "Unable to cross rivers or travel, indicating ominous conditions",
        "Three years of consistent divination show no regrets, symbolizing fulfilled aspirations",
        "Victory and captured prisoners signify glory for the virtuous",
        "Celebrating victories with prisoners invites disaster if excess causes revolt"
    ];


                                

}

