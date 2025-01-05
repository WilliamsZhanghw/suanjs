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
        // 如果是逗号或英文字母，直接保留
        if (char === ',' ||char === ','  || /^[a-zA-Z]+$/.test(char)) {
            result += char;
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

        // 如果不是天干或地支，保持原样
        if (!replaced) {
            result += char;
        }
    }

    return result;
}

