
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
                            
                                guaJie[" 75"]= 
                                [
                                        "山风蛊",
                                        "继承父业，有一个孝顺的儿子，固然没有灾害，即使遇到危险，最后乃吉利",
                                        "继承母业，则吉凶不可卜问",
                                        "继承父业，即使稍有过错，也不会出大问题。 ",
                                        "光大父业，困难重重",
                                        "继承父业，博得了赞誉",
                                        "不服务于王侯，因为其人看重自身价值"

                                    ];
                                guaJie["82"]= 
                                [
                                        "地泽临",
                                        "以感化的政策治民，吉兆",
                                        "用温和的政策治民，吉利",
                                        "用压服的政策治民，没有什么好处。如果能有所忧悔，灾祸可以消除。",
                                        "亲自理国治民，没有害处",
                                        "以明智治民，得君王之体，自然吉利",
                                        "以敦厚之道治民，吉利  "

                                    ];
                                guaJie["58"]= 
                                [
                                        "风地观",
                                        "短视，对普通人无碍，对重要人物就会铸成大错",
                                        "囿于一孔之见，这是有利于女人的贞兆 ",
                                        "观察亲族的思想动向，从而决定为政的措",
                                        "观察国家政绩风俗的辉煌表现，此来者为贵宾。 ",
                                        "善于观察亲族之意向，君子可以无过错。 ",
                                        "观察其他部族的意向，君子可以无过错  "

                                    ];
                                guaJie["34"]= 
                                [
                                        "火雷噬嗑",
                                        "拖着刑具，磨破了脚趾，但没有大的灾难",
                                        "人享受非分之福，但没有大难",
                                        "碰上了麻烦，但不十分严重 ",
                                        "卜问艰难之事，结果是吉利的",
                                        "卜问得危险之兆，但最终可以无灾",
                                        "祸 人不听劝阻，触犯了刑律，凶   "

                                    ];
                                guaJie["73"]= 
                                [
                                        "山火贲",
                                        "舍车不乘，徒步而行，为显示鞋子之美丽",
                                        "老人不服老，帮助君王振兴国家",
                                        "奔跑向前，汗流浃背。卜问长时期的凶吉而得吉兆",
                                        "不是来抢劫，而是来娶亲，疑虑冰释，终无灾祸",
                                        "初遇困难，终则顺利，有婚姻之喜 ",
                                        "送上白底饰以诸色花纹的布帛，不会坏事。"

                                    ];
                                guaJie["78"]= 
                                [
                                        "山地剥",
                                        "床足脱落。无须占问，这是凶险之象",
                                        "床板脱落。无须占问，这是凶险之象",
                                        "割取邻国邻邑的土地人民，可以无灾祸。",
                                        "剥取床上的垫席，灾祸就在眼前。",
                                        "宫人依次当夕受宠，无所不利。",
                                        "劳者不得食，不劳者得食；君子乘坐华丽的车子，小人的草屋不蔽风雨。"

                                    ];
                                guaJie["84"]= 
                                [
                                        "地雷复",
                                        "出外不远就返回，没有大的过失，大吉大利",
                                        "圆满而归，吉利",
                                        "愁眉苦脸地回来，是遇到了危险，知难而退可以无灾祸",
                                        "中途独自返回，这是返回到道义上来 ",
                                        "经过考察，决定返回，可以无悔 ",
                                        "迷途难返，凶险，有灾祸。筮遇此爻，出兵打仗，终有大败，连累国君遭遇凶险，元气大伤，十年后还不能再举征伐   "

                                    ];
                                guaJie["14"]= 
                                [
                                        "天雷无妄",
                                        "不要妄行非正，吉利",
                                        "不耕种而想收获，这种空妄的念头不能带来财富 ",
                                        "意外的灾难。比喻说有人将牛系在不该系的地方，行人顺手牵牛获意外之得，邑人失牛受到意外之灾 ",
                                        "称心的占问，没有灾难 ",
                                        "患意外之病，不要忙乱服药，自可痊愈 ",
                                        "不要胡作妄行！将有灾殃，没有好处  "

                                    ];
                               guaJie["71"]= 
                                [
                                        "山天大畜",
                                        "将有危险，祭祀鬼神则能化凶为吉。 ",
                                        "车辐脱落车轮坏了，这种爻象表明毕竟没有忧患",
                                        "有所往则有利，所往必得，尚可符合心意",
                                        "将有喜庆之事 ",
                                        "将好奔突的大猪圈起来，吉利 ",
                                        "得到上天的福佑，大吉大利  "

                                    ];
                               guaJie["74"]= 
                                [
                                        "山雷颐",
                                        "自己储藏着大量的财宝，还要羡嫉人家的财物，必遭凶险之事。 ",
                                        "为了餬口，就得在山坡上开荒种地。为了生计而去抢劫别人，这是凶险之事。 ",
                                        "违背养生正道，靠歪门邪道过活，占问得凶兆。十年都得倒霉，永无好处 ",
                                        "所求不过餬口，害人之心不可存，吉利。虎视眈眈，防人之心不可无。这样就可以安享天年，悠然自得，无灾祸。 ",
                                        "开荒种地，平居度日，占问得吉兆。筮遇此爻，不可涉水渡河 ",
                                        "遵循生活正道，先艰难而终吉利。筮遇此爻，有利于涉水渡河 "

                                    ];
                               guaJie["25"]= 
                                [
                                        "泽风大过",
                                        "恭敬地用白茅垫着祭品，可以无灾祸。 ",
                                        "枯杨发芽，老头子娶少女为妻，并无不吉利",
                                        "屋梁弯曲，这是凶险之象",
                                        "屋梁挺直，吉利。但有意外之患则不好应付",
                                        "枯杨开花，老妇人嫁给一个年轻人，这件事不好也不坏",
                                        "盲目涉水，水深过顶，虽遇凶险，但终归没有灾难"

                                    ];
                               guaJie["66"]= 
                                [
                                        "坎为水",
                                        "坎坑之中又有坎坑，陷入重坑之中，凶险",
                                        "坑坑坎坎，道有险阻。敢于行险道，或小有收获。",
                                        "来到这多坎之地，终无功",
                                        "利 用铜樽盛酒，用圆簋盛饭。然而对于关押在坎窖里的犯人，只须用瓦盆子就行了，牢饭从天窗里送进取出，其人遭此噩运，但最后还是没有危险 ",
                                        "坎坑虽没有填满，小山头却被锄平。没有灾难 ",
                                        "把犯人用绳索捆紧，投入周围有丛棘的监狱中，三年不得释放，这是凶脸之事"

                                    ];
                               guaJie["33"]= 
                                [
                                        "离为火",
                                        "听到纷来沓至的脚步声，立时警惕戒备，可以无灾难",
                                        "天空出黄霓，大吉大利",
                                        "黄昏时分有霓虹出现在天空，这是凶兆，人们居然不击鼓唱歌禳除它，老人感到悲哀，灾殃快要来了",
                                        "灾难突然降临，敌人见房屋就烧，见人就杀，此处变成一片废墟 ",
                                        "灾难过后，人们痛哭，人们悲叹，然而吉利",
                                        "出兵反击，大获胜仗"

                                    ];

                               guaJie["27"]= 
                                [
                                        "泽山咸",
                                        "伤其大脚趾",
                                        "伤其腿肚子，这是凶兆。小腿负伤，不宜出门，安居不动，自然平安",
                                        "伤其股，并伤及股下之肉。带伤出行，定遭灾难",
                                        "贞卜吉利，无所悔恨。纷沓往来，朋友们都顺从你的意旨",
                                        "伤其背肉，但没有灾祸",
                                        "伤其腮帮、脸颊、舌头 "

                                    ];
                               guaJie["45"]= 
                                [
                                        "雷风恒",
                                        "掘进不止之所以凶险，因为冒险求深，必遭崩塌之祸",
                                        "没有悔恨，因为能坚守中正之道",
                                        "不能保持其德行，必然蒙受耻辱。卜问得艰难之兆",
                                        "长久处于不适宜的环境，怎会有收获?",
                                        "操行一贯。卜得妇人吉利，丈夫财凶险",
                                        "久动不息，凶险"

                                    ];
                                guaJie["17"]= 
                                [
                                        "天山遁",
                                        "君子全部隐退，国家就危险了。不能有所作为了",
                                        "抓来用黄牛革绳紧紧捆绑，这样就不能解脱了",
                                        "被拖累以至不能决然隐退所造成的危险，有如被疾病折腾得疲惫不堪，所以暂且养疾疗伤，不可贸然行动",
                                        "喜爱隐居，这对君子是吉利的，对小人则未必",
                                        "退隐以时，值得赞美，卜问前程，通泰吉利",
                                        "远走高飞，退隐山林，无不利"

                                    ];
                                guaJie["41"]= 
                                [
                                        "雷天大壮",
                                        "伤于脚趾。出征则凶，但尚有收获",
                                        "吉兆",
                                        "小人捕兽凭气力，君子捕兽靠网围。卜问得险兆。公羊以角撞藩，结果被篱笆卡住",
                                        "卜问得吉兆，没有悔恨。因为公羊冲决篱笆，摆脱了拘系，但又被车轮撞伤，不能乱冲乱撞了",
                                        "所处不当，像人所处环境不适当，将蒙受损失，但没有大的灾祸 ",
                                        "羊角插进了篱笆，退不了，进不了，处境不利。但是，目前虽处于艰难之中，最终可以化解逢吉    "

                                    ];
                                guaJie["38"]= 
                                [
                                        "火地晋",
                                        "攻击敌人，打垮敌人，卜问得吉兆。胜利之师没有捕捉俘虏，没有抢掠财物，不会有灾难。",
                                        "攻击敌人，压倒敌人，卜问得吉兆。因为得到了先祖母的庇佑获得大福 ",
                                        "万众一心，全力进攻，无所悔恨 ",
                                        "攻击敌人而胆小如鼠，卜问得凶兆 ",
                                        "无所悔恨，吃了败仗，不要气馁。只要再接再厉，终必转败为胜。无所不利",
                                        "攻击敌人，必须较量敌我双方的力量，可以考虑攻击敌人的城邑。但其结局难料：或许危险，或许吉利，或许没有灾难，或许正践凶兆。"

                                    ];
                                guaJie["83"]= 
                                [
                                        "地火明夷",
                                        "有所往，则必遭主人谴责",
                                        "君子负伤，因马获救。吉利",
                                        "在南方的猎区，拉弓射箭，获得一些大野兽。占问疾病则不利。",
                                        "回到深隐之处吧！走出居室，进入社会，就感到环境的险恶，退隐的念头油然而生。 ",
                                        "逃到东方邻国避难，卜问得吉兆",
                                        "太阳隐没，君子退隐之象"

                                    ];
                                guaJie["53"]= 
                                [
                                        "风火家人",
                                        "防范家庭出现意外事故，没有悔恨。",
                                        "妇女在家中料理家务，安排饍食，没有失误，这是吉利之象。",
                                        "贫困之家，众口嗷嗷待哺，这是愁苦之事，但能辛勤劳作，可以脱贫致富。而富贵之家，骄奢淫逸，妻室儿女只知嬉笑作乐，终将败落。",
                                        "幸福家庭，大吉大利",
                                        "君王到家庙祭祀祖先，不要忧虑，祖先福佑家人，凡事吉利",
                                        "君上掌握杀罚之权，威风凛凛，权柄不移，终归吉利"

                                    ];
                                guaJie["32"]= 
                                [
                                        "火泽睽",
                                        "不必悔恨，丢失了马匹，不必寻找，它自会回来，途中碰见坏人，也不会有灾祸。",
                                        "遇着了热情好客的主人，没有灾难",
                                        "像人落入了悲苦的境地。起初不顺，结局倒好，像人得到强者的帮助",
                                        "旅人孤单地行路，遇上一个踱子，一同被抓住，情形危险，但终无灾祸",
                                        "没有悔恨。瞧见同族宗人在吃肉，孤单的旅人欣然结伴同行，一路平安无事",
                                        "旅人途遇婚媾之人，开始相互猜疑，几致动武，后来相安无事，照常旅行。这是因为双方疑惧消失了。"

                                    ];

                                guaJie["67"]= 
                                [
                                        "水山蹇",
                                        "出门艰难，归来安适，知难而退，坐待时机",
                                        "屡犯艰难，并不是为自身私利",
                                        "出门困难重重，归来笑逐颜开",
                                        "出门步履艰难，归来时却有车可乘",
                                        "经历了很多艰难困苦，终予获得大利",
                                        "出门困难重重，归来欢喜跳跃，吉利，利于会见贵族王公"

                                    ];
                                guaJie["46"]= 
                                [
                                        "雷水解",
                                        "没有灾难",
                                        "畋猎获得三只狐狸，猎物身上带着铜箭头。卜问得吉兆。",
                                        "带着许多财物，又是背负，又是车拉，招摇惹盗，自然招致盗寇抢劫，卜问有灾祸之象",
                                        "赚了钱，而懒怠不想走，结果被人虏去",
                                        "君子被拘囚后又获释，吉利；小人则将受罚。 ",
                                        "在高高的城墙上，王公射中一只鹰，并且抓到了，这没有什么不吉利的"

                                    ];
                                guaJie["72"]= 
                                [
                                        "山泽损",
                                        "祭祀大事，得赶快去参加，这才不会有灾难。祭品过丰，可以酌情减损",
                                        "吉利的卜问。征伐他国则凶。因为这样作对于他国非但不能损伤，反而有利",
                                        "三人同行，难免意见分岐，必有一人被孤立。一人独行，孤单无助，则主动邀人作伴",
                                        "要消除疾病，赶快求巫祭神，病就会有好转，必无灾难",
                                        "因为上天保佑他，赐以灵龟，所以大吉",
                                        "不要减损，不要增益，一任其旧，没有灾难，卜问得吉兆。筮遇此爻，有所往则必获利，将得到一单身奴隶。"

                                    ];
                                guaJie["54"]= 
                                [
                                        "风雷益",
                                        "利于大兴土木，大吉大利，并无灾祸",
                                        "有人赐予价值十朋的大龟，不可拒违其命。卜问得长久的吉兆。君王祭祀天帝，吉利",
                                        "因为有丧事，增加祭祀鬼神的祭物，这是自然之理",
                                        "君臣上下团结更加巩固",
                                        "捕获了很多俘虏，安抚他们，不要追究他们的责任，使他们感戴我的恩德，说明这样可以笼络人心。",
                                        "没有人帮助他，还有人攻击他。在这种情况下，立志不坚定，就要坏事"

                                    ];
                                guaJie["21"]= 
                                [
                                        "泽天夬",
                                        "脚力不胜而继续行进，将遭灾难",
                                        "恐惧地惊叫，夜间有敌来犯，但不足为患",
                                        "颧骨受伤，这是凶象。君子匆匆忙忙地独个儿行路，碰上了雨，全身淋湿了，令人很不快，但没有灾难",
                                        "臀部受伤，走起路来踉踉跄跄。牵羊上路，悔恨丢失了羊儿，这是由于对别人的告诫不相信。",
                                        "细角山羊在道路中间蹦蹦跳跳，筮遇此爻无灾难 ",
                                        "狗在哭叫，预兆着终将有凶险之事"

                                    ];
                                guaJie["15"]= 
                                [
                                        "天风姤",
                                        "细柔之线牵附于黄铜柅子之上。这是吉利的贞兆。若占问有所往，则必逢凶险，就象瘦弱的猪被不情愿地拖回来。 ",
                                        "有鱼无肉，乃小康之象，不宜大肆宴请宾客",
                                        "行走困难，因为没有人扶持",
                                        "厨中无鱼，有所动作必遭凶险 ",
                                        "匏瓜缠着杞树生长，隐印的瓜纹很好看。忽然从头顶上方掉下一个瓜来",
                                        "遭遇野兽，处于它的角锋之下，不是好兆头，但没有大的灾难"

                                    ];

                                guaJie["28"]= 
                                [
                                        "泽地萃",
                                        "捕获了俘虏，却又逃跑了，引起纷乱和忧虑，大家呼喊着四处追捕。终于追回了，又高兴得嘻嘻哈哈，用不着担忧了。占得此爻，大胆前往，没有灾难",
                                        "长时间吉利，没有灾难",
                                        "忧愁嗟叹，无所利。出行则无灾难，但有小小的麻烦",
                                        "大吉大利，没有灾难",
                                        "瘁心力于其职守，结果仅仅是没有灾祸，因为才具驽下，不能有所建树",
                                        "叹息流涕，忧心忡忡，但没有灾难"

                                    ];
                                guaJie["85"]= 
                                [
                                        "地风升",
                                        "前进发展，大吉大利",
                                        "祭祀鬼神必以忠信，从而将有喜庆之事",
                                        "登临于建立在大丘之上的城邑",
                                        "顺乎天理之事",
                                        "所占之事将逐步发展",
                                        "深夜不眠，勤勉不息地工作则符合此吉兆"

                                    ];
                                guaJie["26"]= 
                                [
                                        "泽水困",
                                        "臀部被狱吏的刑杖打伤，被投入黑暗的牢房中，三年不见其人",
                                        "酒醉未醒，穿着红色服装的蛮夷前来进犯，忧患猝临，宜急祭神求佑。至于占问出征，则有危险。其他事无大的灾祸。",
                                        "被石头绊倒，被荆棘刺伤，艰难归家，妻子又不见了，这是凶险之兆。",
                                        "其人被关押在囚车里，慢慢地走来。真不幸，但最后还是被释放",
                                        "割了鼻子，断了腿，被身着红色服装的蛮夷虏去。后来慢慢找到脱身的机会，终于逃脱回家。宜急祭神酬谢",
                                        "处境如此艰难，不宜有所行动，否则悔上加悔。至于占问出征则吉利"

                                    ];

                                guaJie["65"]= 
                                [
                                        "水风井",
                                        "井水混浊不可食用。墤塌的陷阱已关不住野兽",
                                        "在井口张弓射井中小鱼，如此谋食求生，可见其人无依无靠",
                                        "君上看见井水污浊不能食用，为我们感到伤心。淘洗干净，就可汲饮。君上英明呵，众人都获得他们的好处",
                                        "用砖石垒筑井壁，进行顺利",
                                        "水洁泉寒，清凉可口，可以食用",
                                        "陷阱下宽上窄，十分隐蔽，甚至可以不加伪装。果然捕获了野兽，大吉大利"

                                    ];

                                guaJie["23"]= 
                                [
                                        "泽火革",
                                        "其人被紧紧束缚不能有作为",
                                        "祭祀的日期要改变，大概是因为将有喜庆之事",
                                        "出征，吃了败仗，卜问得凶兆。但是，只要振奋精神，整顿装备，重新开战，则能转败为胜，生擒强敌",
                                        "没有悔恨。至于占问战争，则小有战果，如果改帅易将，则将大吉",
                                        "将大获胜仗",
                                        "君子精神振奋，但基层官兵一反常态。占问征伐，则凶险。卜问居处则吉利。"

                                    ];
                                guaJie["35"]= 
                                [
                                        "火风鼎",
                                        "利于清除恶人。以无子而纳妾。因纳妾而得子，没有灾祸。",
                                        "家里有饭吃，仇家有疾病，再没有什么东西困扰我，吉利",
                                        "鼎耳脱落了。筮遇此爻，打猎无所获。野味莫吃光，老天要下雨，不知何日能出猎，坐吃山空，食物将匮乏，节约渡难关，终于得吉利",
                                        "德薄而位尊，力小而任重，凶险之兆",
                                        "豪华之鼎，吉利 ",
                                        "金属之鼎配以玉石之铉。大吉，无所不利 "

                                    ];
                                guaJie["44"]= 
                                [
                                        "震为雷",
                                        "雷声传来，吓得浑身发抖，后来听到雷声，仍谈笑如常，吉利",
                                        "雷电交加，十分危险，惊慌之中丢失了钱币，翻山越蛉，走了很远的路程去寻找也没有找到。筮者告诉他：“不必追寻了，七八日内，这损失可得补偿。”",
                                        "出门时遇到电闪雷鸣，感到疑惧不安。继续前进，不会有灾祸",
                                        "其人猝闻惊雷，吓得坠入泥中，说明其人见识不广，胆量不大。",
                                        "巨雷轰鸣，危险在前。只要小心谨慎，不至于酿成灾祸，亦无损于事",
                                        "雷电交加，行动谨慎，因为内心虚空，精神紧张。虽然凶险但毕竟没有灾祸，因为对于邻人的遭遇有所警戒，从而能远恶近善"

                                    ];
 


                                guaJie["77"]= 
                                [
                                        "艮为山",
                                        "歇脚养息，不要轻举妄动，自然无灾难，这是长期吉利的贞兆",
                                        "固执己见，没有退回来，听取别人的意见",
                                        "由于为名利所惑，不能迅速引退卸职所招致的灾祸。 ",
                                        "引退保身，没有灾祸",
                                        "闭口少言，讲话有分寸，自然没有悔恨",
                                        "秉守忠厚，必得善终"

                                    ];

                                guaJie["57"]= 
                                [
                                        "风山渐",
                                        "警惕小孩顽皮，遭遇危险，家长呵责制止，则没有灾难",
                                        "饱饮饱食，自得喜乐",
                                        "丈夫出征可能不再回返，妇女怀孕可能流产，这是凶险之兆。但有利于抵御敌寇",
                                        "鸿雁飞到树木上，有的停息在河边堆放的桷木上，没有灾难",
                                        "妻子多年不能怀孕，但始终不会被人取代，吉利",
                                        "心志不乱，吉利"

                                    ];

                                guaJie["42"]= 
                                [
                                        "雷泽归妹",
                                        "有人相助，出行吉利",
                                        "这是利于囚徒的贞卜，因为身处囚笼尚不失正道，故能重见光明",
                                        "嫁女而用其姐姐陪嫁，这件事不妥当",
                                        "出嫁时超过了婚龄，迟迟不嫁是因为有所等待",
                                        "像女嫁夫家处于尊贵之位，良辰择在某月十四日，吉利。",
                                        "筐中无物，无所利"

                                    ];

                                guaJie["43"]= 
                                [
                                        "雷火丰",
                                        "旅途之中受到一位女主人的接待，与这位寡居的女人结成夫妻。不会遭人议论，而且能得到人们的赞同。十日之内没有灾难，意思是超过一旬就有灾了。",
                                        "旅伴之中有人精神错乱。对他加以刺激，或许可以使他清醒。 ",
                                        "将铺草加厚，这起不了什么大的作用，用力过猛又会造成伤害",
                                        "正午时分，此人还在说看见北斗星，看来还未恢复正常。幸好遇着了他的老店主，把他托付给老店主，这一下可清静平安了 ",
                                        "赚得美玉，大家都庆贺夸奖他。这是吉利之兆",
                                        "增修扩建房屋，看来此人如鸟飞蓝天，志得意满，发财不小。从门缝里探视，寂无一人，看来财多害身，横遭灾祸，他逃生去了"

                                    ];

                                guaJie["37"]= 
                                [
                                        "火山旅",
                                        "旅人三心二意，进退犹豫，最后还是离开住所，结果自遭灾祸",
                                        "买一男仆，卜问得吉兆，看来这笔买卖没有问题",
                                        "旅人来到着火的市场上，新买的男仆乘乱跑掉。卜问得险兆",
                                        "旅人回到客居之处，这不是恰当的住处。赚了不少钱，恐怕抢劫，自然心中不踏实",
                                        "终于博得善射的美名，众口传誉，上面的人也知道了",
                                        "鸟儿的巢窠被焚烧，周人的邑落被抢劫，四处流落的周人呵，美好的生活已成往事，悲惨的现实即在眼前，狄人牵着牛羊去，往后的日子怎么过"

                                    ];
 
                                guaJie["55"]= 
                                [
                                        "巽为风",
                                        "进退听命，这是利于武人的占卜",
                                        "病人卧床不起，祝史巫士降神祭祀，禳灾驱鬼，忙碌不停。病情有好转，灾难消除了",
                                        "勉强顺从，而内心不顺畅，说明这是出于无可奈何",
                                        "狩猎大有收获",
                                        "吉兆，没有悔恨，无所不利。虽没有良好的开端，但有良好的结局。时日定在丁日或癸日，其事一定成功。 ",
                                        "人隐伏在床底下，钱财则被洗劫一空。卜问得凶兆"

                                    ];
                                guaJie["22"]= 
                                [
                                        "兑为泽",
                                        "和睦欢喜，吉利",
                                        "以诚信待人，人亦热忱待之，之所以吉利，因为互相之间有了信任",
                                        "以使人归服为乐，蕴藏着凶险，因为力小而任大，德薄而欲多，所行必不当",
                                        "商谈恢复邦交之事，尚未达成协议，但两国的矛盾分歧有了愈合的趋势",
                                        "被剥国俘虏。剥国无理挑衅，必遭惩罚(对我方而言，坏事将变为好事)",
                                        "引导大家和睦相处，但未必能一呼百应"

                                    ];
                                guaJie["56"]= 
                                [
                                        "风水涣",
                                        "洪水突来，因而乘马逃避，匆促跌伤，幸免淹亡之祸，吉利",
                                        "洪水奔涌，冲毁房基。性命无虞。不章中之万幸",
                                        "洪水冲到身上，幸免于难，尚可庆幸",
                                        "洪水冲向人群，然而十分幸运，因为人群聚集在山丘上，洪水只能淹到山脚，否则其后果是平常难以想像的",
                                        "洪水横溢，淹没国都，淹及王宫，牵好人员早巳撤走，没有大的灾难",
                                        "洪水退去，忧患消除，但仍须警惕，加强防范，这样就没有灾难。有血光之灾，走开，远远地走开，这样就可远离灾害。"

                                    ];

                                guaJie["62"]= 
                                [
                                        "水泽节",
                                        "杜门不出，因为其人知道所行必不通，没有灾祸",
                                        "杜门不出，也有凶险，因为坐失良机，错误已极",
                                        "不节俭则困穷，处困穷则知悔过，知悔过则可以无灾难",
                                        "安于节俭遵礼的生活，通泰",
                                        "以节俭遵礼为乐，吉利。秉此而行，所往必得别人资助",
                                        "以节俭遵礼为苦，卜问得凶兆，其人将为家道败落而悔恨，像人走入穷困不通的境地"

                                    ];
                                guaJie["52"]= 
                                [
                                        "风泽中孚",
                                        "行安神之礼，吉利，因为慕恋先人的心愿未变",
                                        "小鹤和应老鹤，这是心灵相通的表现",
                                        "击败了敌人，有的击鼓追击，有的凯旋报捷；消息传来，有的高兴得热泪盈眶，有的放声高歌。但胜利之中，恐怕隐伏着不测之祸",
                                        "月中的时候，马匹丢失了，但无大的灾祸，此后要加倍警惕，防止再发生类似事情",
                                        "俘虏成群，串连捆绑。没有灾难",
                                        "鸡飞到天空。它怎能长久飞翔呢?卜问得凶兆  "

                                    ];
                                guaJie["47"]= 
                                [
                                        "雷山小过",
                                        "飞鸟经过空中，预兆着凶险，这是无可奈何之事",
                                        "虽有差迟，但非徒劳，因而无灾难",
                                        "不要过分指责，但要制止他的错误发展，如果听任放纵，反而害了他，必遭凶险",
                                        "要过份指责，但要防止发生错误，因为九四阳爻处于阴位，像人处境不利，容易出错。前去冒险，必须加以警告，因为明知而故犯，只能加速自己的失败。",
                                        "降雨在即。王公本是去射鸟，可是在洞穴捉到野兽",
                                        "不加制止，因而犯下过失，好比飞鸟钻入罗网，凶险"

                                    ];
                                guaJie["63"]= 
                                [
                                        "水火既济",
                                        "提着腰带过河，打湿了衣尾。没有大问题",
                                        "妇人丢失了头巾，不用寻找，七日内可以不寻而得",
                                        "高宗讨伐鬼方，费时三年才打败它。筮遇此爻，不可重用小人",
                                        "撑着用败絮塞着有漏洞的船，整日里提心吊胆",
                                        "殷人杀牛厚祭鬼神，不如周人簿祭鬼神，周人倒是得到鬼神的福佑",
                                        "涉水过河，水拍湿其头部，危险，无法长久"

                                    ];
                                guaJie["36"]= 
                                [
                                        "火水未济",
                                        "涉水渡河，沾湿了衣尾，见微知巨，再冒险前进，是不知儆戒",
                                        "提着腰带涉水过河。卜问得吉兆",
                                        "渡不了河，出行有凶险。不利于涉水渡河 ",
                                        "三年，吉利的卜问，没有悔恨，说明志得意行",
                                        "吉利的贞卜，没有悔恨。打了胜仗，捕获了俘虏，这是君子的光荣，吉利",
                                        "捕获了俘虏，饮酒庆贺。没有灾难。但酗酒闹事，头发都淋湿了。俘虏乘机作乱，将他们杀了"

                                    ];

}

