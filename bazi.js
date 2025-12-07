const chineseNumber = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊"];
const Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
];

const chineseDateFormat = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });

class BaZi {
    constructor(cal) {
        this.cal = cal;
        this.baseDate = new Date(1900, 0, 31);
        this.init();
    }

    init() {
        let offset = Math.floor((this.cal - this.baseDate) / 86400000);
        let dayCyl = offset + 40;
        let monCyl = 14;

        let iYear, daysOfYear = 0;
        for (iYear = 1900; iYear < 2050 && offset > 0; iYear++) {
            daysOfYear = this.yearDays(iYear);
            offset -= daysOfYear;
            monCyl += 12;
        }
        if (offset < 0) {
            offset += daysOfYear;
            iYear--;
            monCyl -= 12;
        }

        this.year = iYear;
        let yearCyl = iYear - 1864;
        let leapMonth = this.leapMonth(iYear);
        this.leap = false;

        let iMonth, daysOfMonth = 0;
        for (iMonth = 1; iMonth < 13 && offset > 0; iMonth++) {
            if (leapMonth > 0 && iMonth == (leapMonth + 1) && !this.leap) {
                --iMonth;
                this.leap = true;
                daysOfMonth = this.leapDays(this.year);
            } else {
                daysOfMonth = this.monthDays(this.year, iMonth);
            }
            offset -= daysOfMonth;
            if (this.leap && iMonth == (leapMonth + 1)) {
                this.leap = false;
            }
            if (!this.leap) {
                monCyl++;
            }
        }

        if (offset == 0 && leapMonth > 0 && iMonth == leapMonth + 1) {
            if (this.leap) {
                this.leap = false;
            } else {
                this.leap = true;
                --iMonth;
                --monCyl;
            }
        }

        if (offset < 0) {
            offset += daysOfMonth;
            --iMonth;
            --monCyl;
        }

        this.month = iMonth;
        this.day = offset + 1;
    }

    yearDays(year) {
        let sum = 348;
        for (let i = 0x8000; i > 0x8; i >>= 1) {
            if ((lunarInfo[year - 1900] & i) !== 0) sum += 1;
        }
        return sum + this.leapDays(year);
    }

    leapDays(year) {
        if (this.leapMonth(year) !== 0) {
            if ((lunarInfo[year - 1900] & 0x10000) !== 0) {
                return 30;
            } else {
                return 29;
            }
        } else {
            return 0;
        }
    }

    leapMonth(year) {
        return lunarInfo[year - 1900] & 0xf;
    }

    monthDays(year, month) {
        if ((lunarInfo[year - 1900] & (0x10000 >> month)) === 0) {
            return 29;
        } else {
            return 30;
        }
    }

    getYear() {
        return this.getYearStr(this.year);
    }

    getMonth() {
        return chineseNumber[this.month - 1];
    }

    getDay() {
        return this.getChinaDayString(this.day);
    }

    getYearGanZhi(hour) {
        const solarYear = this.cal.getFullYear();
        const solarMonth = this.cal.getMonth(); // 0-11
        const solarDay = this.cal.getDate();
        
        // 年柱：根据立春（solar term 2）的精确时间判断
        const term2Time = Lunar.getSolarTermTime(solarYear, 2); // 立春时间
        let baziYear = solarYear;
        if (this.cal < term2Time) {
            // 如果当前时间早于立春，用上一年的年柱
            baziYear = solarYear - 1;
        }
        let idx = (baziYear - 1864) % 60;
        const y = BaZi.jiazhi[idx];

        // 月柱：根据节气判断
        // 八字月支对应关系（以节气为界）：
        // 正月(寅月): 立春(2) -> 惊蛰(4)之前
        // 二月(卯月): 惊蛰(4) -> 清明(6)之前
        // 三月(辰月): 清明(6) -> 立夏(8)之前
        // 四月(巳月): 立夏(8) -> 芒种(10)之前
        // 五月(午月): 芒种(10) -> 小暑(12)之前
        // 六月(未月): 小暑(12) -> 立秋(14)之前
        // 七月(申月): 立秋(14) -> 白露(16)之前
        // 八月(酉月): 白露(16) -> 寒露(18)之前
        // 九月(戌月): 寒露(18) -> 立冬(20)之前
        // 十月(亥月): 立冬(20) -> 大雪(22)之前
        // 十一月(子月): 大雪(22) -> 小寒(0)之前（跨年）
        // 十二月(丑月): 小寒(0) -> 立春(2)之前
        
        // 确定当前时间在哪个节气区间
        let monthZhiIndex = -1;
        
        // 节气索引到月支的映射
        const termToZhi = {
            0: 1,   // 小寒 -> 丑月
            2: 2,   // 立春 -> 寅月
            4: 3,   // 惊蛰 -> 卯月
            6: 4,   // 清明 -> 辰月
            8: 5,   // 立夏 -> 巳月
            10: 6,  // 芒种 -> 午月
            12: 7,  // 小暑 -> 未月
            14: 8,  // 立秋 -> 申月
            16: 9,  // 白露 -> 酉月
            18: 10, // 寒露 -> 戌月
            20: 11, // 立冬 -> 亥月
            22: 0   // 大雪 -> 子月
        };
        
        // 检查所有节气区间
        const termKeys = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
        for (let i = 0; i < termKeys.length; i++) {
            const currentTerm = termKeys[i];
            const nextTerm = i < termKeys.length - 1 ? termKeys[i + 1] : 0; // 最后一个节气后是小寒（跨年）
            
            const termTime = Lunar.getSolarTermTime(solarYear, currentTerm);
            let nextTermTime;
            if (nextTerm === 0 && currentTerm !== 0) {
                // 跨年情况：大雪(22)之后是小寒(0)，需要下一年的小寒
                nextTermTime = Lunar.getSolarTermTime(solarYear + 1, 0);
            } else {
                nextTermTime = Lunar.getSolarTermTime(solarYear, nextTerm);
            }
            
            if (this.cal >= termTime && this.cal < nextTermTime) {
                monthZhiIndex = termToZhi[currentTerm];
                break;
            }
        }
        
        // 如果还没找到，检查跨年的情况（大雪到小寒之间）
        if (monthZhiIndex === -1) {
            const term22 = Lunar.getSolarTermTime(solarYear, 22); // 大雪
            const nextYearTerm0 = Lunar.getSolarTermTime(solarYear + 1, 0); // 下一年的小寒
            if (this.cal >= term22 && this.cal < nextYearTerm0) {
                monthZhiIndex = 0; // 子月
            }
        }
        
        // 如果仍然没找到，使用默认值（不应该发生）
        if (monthZhiIndex === -1) {
            console.error("无法确定月支，使用默认值");
            monthZhiIndex = 0;
        }
        
        // 月干：根据年干推算（五虎遁）
        idx = idx % 5; // 年干在十天干中的位置（0-4）
        const idxm = (idx + 1) * 2 % 10; // 五虎遁的起始天干索引
        // 五虎遁是从寅月开始计算的，所以需要将月支转换为从寅月开始的索引
        const monthIndexForGan = (monthZhiIndex + 10) % 12; // 将月支转换为从寅月开始的索引（寅=0, 卯=1, ...）
        const monthGanIndex = (idxm + monthIndexForGan) % 10;
        const m = Gan[monthGanIndex] + Zhi[monthZhiIndex];

        // 日柱：根据日期计算
        const offset = (Math.floor((this.cal - this.baseDate) / 86400000) + 40) % 60;
        const d = BaZi.jiazhi[offset];

        // 时柱：根据日干和时辰计算（五鼠遁）
        const dayGanIndex = offset % 10;
        const hourGanIndex = (dayGanIndex % 5 * 2 + hour) % 10;
        const h = Gan[hourGanIndex] + Zhi[hour % 12];
        
        return `${y},${m},${d},${h}`;
    }

    animalsYear() {
        const Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
        return Animals[(this.year - 4) % 12];
    }

    getYearStr(year) {
        const chineseword = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        let ys = "";
        ys += chineseword[Math.floor(year / 1000)];
        year %= 1000;
        ys += chineseword[Math.floor(year / 100)];
        year %= 100;
        ys += chineseword[Math.floor(year / 10)];
        year %= 10;
        ys += chineseword[year];
        return ys;
    }

    getChinaDayString(day) {
        const chineseTen = ["初", "十", "廿", "卅"];
        const n = day % 10 === 0 ? 9 : day % 10 - 1;
        if (day > 30) return "";
        if (day === 10) return "初十";
        return chineseTen[Math.floor(day / 10)] + chineseNumber[n];
    }

    toString() {
        return `${this.getYearStr(this.year)}年${this.leap ? "闰" : ""}${chineseNumber[this.month - 1]}月${this.getChinaDayString(this.day)}`;
    }
}

BaZi.jiazhi = [
    "甲子", "乙丑", "丙寅", "丁卯", "戊辰", "己巳", "庚午", "辛未", "壬申", "癸酉",
    "甲戌", "乙亥", "丙子", "丁丑", "戊寅", "己卯", "庚辰", "辛巳", "壬午", "癸未",
    "甲申", "乙酉", "丙戌", "丁亥", "戊子", "己丑", "庚寅", "辛卯", "壬辰", "癸巳",
    "甲午", "乙未", "丙申", "丁酉", "戊戌", "己亥", "庚子", "辛丑", "壬寅", "癸卯",
    "甲辰", "乙巳", "丙午", "丁未", "戊申", "己酉", "庚戌", "辛亥", "壬子", "癸丑",
    "甲寅", "乙卯", "丙辰", "丁巳", "戊午", "己未", "庚申", "辛酉", "壬戌", "癸亥"
];


