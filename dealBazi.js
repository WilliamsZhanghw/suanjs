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


function transformGanZhiToWuXing(inputString) {
    const ganMapping = {
        '金': ['庚', '辛'],
        '木': ['甲', '乙'],
        '水': ['壬', '癸'],
        '火': ['丙', '丁'],
        '土': ['戊', '己']
    };

    const zhiMapping = {
        '金': ['申', '酉'],
        '木': ['寅', '卯'],
        '水': ['子', '亥'],
        '火': ['巳', '午'],
        '土': ['辰', '戌', '丑', '未']
    };

    let result = '';

    // 遍历输入字符串，逐个处理字符
    for (let char of inputString) {
        // 如果是英文字母，跳过不处理
        if (/^[a-zA-Z]+$/.test(char)) {
            continue;
        }

        let replaced = false;

        // 匹配十天干
        for (let [wuXing, ganList] of Object.entries(ganMapping)) {
            if (ganList.includes(char)) {
                result += wuXing;
                replaced = true;
                break;
            }
        }

        // 匹配十二地支
        if (!replaced) {
            for (let [wuXing, zhiList] of Object.entries(zhiMapping)) {
                if (zhiList.includes(char)) {
                    result += wuXing;
                    replaced = true;
                    break;
                }
            }
        }

        // 如果不是天干或地支，保留原字符
        if (!replaced) {
            result += char;
        }
    }

    return result;
}
function determineConfidence(inputString) {
   
    const conditions = {
        '金': ['金', '土'], // 金的前一个是土
        '水': ['水', '金'], // 水的前一个是金
        '木': ['木', '水'], // 木的前一个是水
        '火': ['火', '木'], // 火的前一个是木
        '土': ['土', '火']  // 土的前一个是火
    };

    // 获取第4、5、6个字
    const element4 = inputString[3]; // 第4个字
    const element5 = inputString[4]; // 第5个字
    const element6 = inputString[5]; // 第6个字

    // 判断逻辑
    if (
        element5  &&
        (conditions[element5].includes(element4) || conditions[element5].includes(element6))
    ) {
        return 'a confident'; // 返回英文的“自信”
    } else {
        return 'NOT a confident'; // 返回英文的“不自信”
    }
}
function checkElementInString(element, inputString) {
    // 检查输入字符串中是否包含指定的五行字符
    if (inputString.includes(element)) {
        return true;
    } else {
        return false;
    }
}
function checkCharacterAtPosition(char, inputString, position) {
    // 检查输入的位置是否超出字符串长度
    if (position < 1 || position > inputString.length) {
        return "Invalid position";
    }

    // 获取字符串中指定位置的字符
    const charAtPosition = inputString[position - 1]; // 注意：位置从1开始，索引从0开始

    // 判断是否一致
    return char === charAtPosition ? true : false;
}
function analyzeWealth(input) {
    const selfPosition = 5;
    const elements = ['金', '水', '木', '火', '土']; // 五行顺序
    const 克制关系 = {
        '金': '木',
        '水': '火',
        '木': '土',
        '火': '金',
        '土': '水'
    };

    // 获取自己的五行元素
    const selfElement = input[selfPosition - 1]; // 注意索引从0开始，所以需要-1
    const wealthElement = 克制关系[selfElement]; // 自己克制的五行为财

    // 查找财的分布情况
    const wealthIndices = input.split('').reduce((indices, char, index) => {
        if (char === wealthElement) indices.push(index + 1); // 转换为人类可读的位置
        return indices;
    }, []);

    // 判断财的分布情况
    let result;
    console.log("indices:",wealthIndices);
    if (wealthIndices.includes(selfPosition - 1) || wealthIndices.includes(selfPosition + 1)) {
    result = "You highly value wealth.";
    } else if (wealthIndices.length === 0) {
        result = "You don't value wealth at all.";
    } else if ([1, 3].some(i => wealthIndices.includes(i)) && !wealthIndices.includes(2)) {
        result = "You seem to value wealth on the surface, but you don't actually value it.";
    } else if (!wealthIndices.includes(1) && wealthIndices.includes(2)) {
        result = "You don't appear to value wealth, but you actually do.";
    } else {
        result = "You care about wealth, but not that much.";
    }

    return result;
    
}
function analyzePurpose(input) {
    const selfPosition = 5;
    const elements = ['金', '水', '木', '火', '土']; // 五行顺序
    const 克制关系 = {
        '金': '木',
        '水': '火',
        '木': '土',
        '火': '金',
        '土': '水'
    };

    // 获取自己的五行元素
    const selfElement = input[selfPosition - 1]; // 注意索引从0开始，所以需要-1
    const wealthElement = 克制关系[selfElement]; // 自己克制的五行为财

    // 查找财的分布情况
    const wealthIndices = input.split('').reduce((indices, char, index) => {
        if (char === wealthElement) indices.push(index + 1); // 转换为人类可读的位置
        return indices;
    }, []);

    // 判断财的分布情况
    let result;
    console.log("indices:",wealthIndices);
    if (wealthIndices.includes(selfPosition - 1) || wealthIndices.includes(selfPosition + 1)) {
    result = "You have a strong sense of purpose.";
    } else if (wealthIndices.length === 0) {
        result = "You have no sense of purpose at all.";
    } else if ([1, 3].some(i => wealthIndices.includes(i)) && !wealthIndices.includes(2)) {
        result = "You seem to prioritize goals on the surface, but deep down, you don't actually value them.";
    } else if (!wealthIndices.includes(1) && wealthIndices.includes(2)) {
        result = "You don't seem to prioritize goals on the surface, but deep down, you do value them.";
    } else {
        result = "You do have sense of purpose, but not that much.";
    }

    return result;
    
}
function analyzeOpinion(input) {
    const selfPosition = 5;
    const elements = ['金', '水', '木', '火', '土']; // 五行顺序
    const 印生关系 = {
        '金': '土',
        '水': '金',
        '木': '水',
        '火': '木',
        '土': '火'
    };

    // 获取自己的五行元素
    const selfElement = input[selfPosition - 1]; // 注意索引从0开始，所以需要-1
    const wealthElement = 印生关系[selfElement]; // 生自己的为印

    // 查找的分布情况
    const wealthIndices = input.split('').reduce((indices, char, index) => {
        if (char === wealthElement) indices.push(index + 1); // 转换为人类可读的位置
        return indices;
    }, []);

    // 判断财的分布情况
    let result;
    console.log("indices:",wealthIndices);
    if (wealthIndices.includes(selfPosition - 1) || wealthIndices.includes(selfPosition + 1)) {
    result = "You are very good at listening to others' perspectives.";
    } else if (wealthIndices.length === 0) {
        result = "You don't listen to others' perspectives at all.";
    } else if ([1, 3].some(i => wealthIndices.includes(i)) && !wealthIndices.includes(2)) {
        result = "You appear to like listening to others' opinions on the surface, but you don't really take them in.";
    } else if (!wealthIndices.includes(1) && wealthIndices.includes(2)) {
        result = "You seem not to like listening to others' opinions on the surface, but you actually take them in.";
    } else {
        result = "Sometimes you listen to others' opinions, and sometimes you don't.";
    }

    return result;
    
}
function analyzeSupport(input) { 
    const selfPosition = 5;
    const elements = ['金', '水', '木', '火', '土']; // 五行顺序
    const 印生关系 = {
        '金': '土',
        '水': '金',
        '木': '水',
        '火': '木',
        '土': '火'
    };

    // 获取自己的五行元素
    const selfElement = input[selfPosition - 1]; // 注意索引从0开始，所以需要-1
    const wealthElement = 印生关系[selfElement]; // 生自己的为印

    // 查找的分布情况
    const wealthIndices = input.split('').reduce((indices, char, index) => {
        if (char === wealthElement) indices.push(index + 1); // 转换为人类可读的位置
        return indices;
    }, []);

    // 判断财的分布情况
    let result;
    console.log("indices:",wealthIndices);
    if (wealthIndices.includes(selfPosition - 1) || wealthIndices.includes(selfPosition + 1)) {
    result = "Benefactors are very likely to extend their support to you.";
    } else if (wealthIndices.length === 0) {
        result = "It seems improbable that help will come your way.";
    } else {
        result = "Sometimes help comes your way, but other times it doesn't.";
    }

    return result;
    
}


function analyzeIdealPartner(input,gender) {
    // 定义天干与五行的映射
    const tianGanWuXing = {
        '甲': '木',
        '乙': '木',
        '丙': '火',
        '丁': '火',
        '戊': '土',
        '己': '土',
        '庚': '金',
        '辛': '金',
        '壬': '水',
        '癸': '水'
    };
    
    // 定义地支与可能天干的映射
    const diZhiToTianGan = {
        '子': ['癸'],
        '丑': ['己', '癸', '辛'],
        '寅': ['甲', '丙', '戊'],
        '卯': ['乙'],
        '辰': ['戊', '乙', '癸'],
        '巳': ['丙', '庚', '戊'],
        '午': ['丁', '己'],
        '未': ['己', '乙', '丁'],
        '申': ['庚', '壬', '戊'],
        '酉': ['辛'],
        '戌': ['戊', '丁', '辛'],
        '亥': ['壬', '甲']
    };
    
    // 定义五行关系
    const wuXingRelationship = {
        '木': { 克: '土', 生: '火', 被克: '金', 被生: '水' },
        '火': { 克: '金', 生: '土', 被克: '水', 被生: '木' },
        '土': { 克: '水', 生: '金', 被克: '木', 被生: '火' },
        '金': { 克: '木', 生: '水', 被克: '火', 被生: '土' },
        '水': { 克: '火', 生: '木', 被克: '土', 被生: '金' }
    };
    
    const elements = String(input).split(',');
    console.log("elements:",elements,"input:",input);
    // 获取第五个字的天干及其五行
    const targetTianGan = elements[5];
    const targetWuXing = tianGanWuXing[targetTianGan];

    // 获取第六个字的地支及其可能天干
    const targetDiZhi = elements[6];
    const possibleTianGan = diZhiToTianGan[targetDiZhi];
    console.log("targetDiZhi:",targetDiZhi,"possibleTianGan",possibleTianGan);
    if (!targetWuXing || !possibleTianGan) {
        return '输入有误，请检查输入的天干和地支是否正确。';
    }

    // 计算五行关系
    const results = possibleTianGan.map(tianGan => {
        const wuXing = tianGanWuXing[tianGan];
        if (wuXing === wuXingRelationship[targetWuXing].克) {
            return "You hope your partner can bring you financial prosperity, and you can have control over my partner.";
            //return `${tianGan}(财)`;
        } else if (wuXing === wuXingRelationship[targetWuXing].被克) {
            return "You hope your partner can appropriately regulate your behavior in life.";
            //return `${tianGan}(官)`;
        } else if (wuXing === wuXingRelationship[targetWuXing].生) {
            return "You hope you find someone you love as your spouse, someone you can confide in.";
            //return `${tianGan}(食)`;
        } else if (wuXing === wuXingRelationship[targetWuXing].被生) {
            return "You hope to find someone who loves you as your spouse and is very supportive of you."；
            //return `${tianGan}(印)`;
        } else {
            return "You hope to find someone like you, like a close brother, who can share joys and hardships with you.";
            //return `${tianGan}(比)`;
        }
    });

    return results.join('\n\n');
}






