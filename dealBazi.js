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

