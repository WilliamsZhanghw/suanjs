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
        let idx = (this.year - 1864) % 60;
        const y = BaZi.jiazhi[idx];

        idx = idx % 5;
        const idxm = (idx + 1) * 2 % 10;
        const m = Gan[(idxm + this.month - 1) % 10] + Zhi[(this.month + 2 - 1) % 12];

        const offset = (Math.floor((this.cal - this.baseDate) / 86400000) + 40) % 60;
        const d = BaZi.jiazhi[offset];

        const h = Gan[(offset % 5 * 2 + hour) % 10] + Zhi[hour % 12];
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


