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
        return 'confident'; // 返回英文的“自信”
    } else {
        return 'not confident'; // 返回英文的“不自信”
    }
}


