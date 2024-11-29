class Lunar {
    constructor(date) {
        if (!date) {
            date = new Date();
        }
        this.init(date.getTime());
    }

    static lunarInfo = [
        0x4bd8, 0x4ae0, 0xa570, 0x54d5, 0xd260, 0xd950, 0x5554, 0x56af,
        0x9ad0, 0x55d2, 0x4ae0, 0xa5b6, 0xa4d0, 0xd250, 0xd295, 0xb54f,
        0xd6a0, 0xada2, 0x95b0, 0x4977, 0x497f, 0xa4b0, 0xb4b5, 0x6a50,
        0x6d40, 0xab54, 0x2b6f, 0x9570, 0x52f2, 0x4970, 0x6566, 0xd4a0,
        0xea50, 0x6a95, 0x5adf, 0x2b60, 0x86e3, 0x92ef, 0xc8d7, 0xc95f,
        0xd4a0, 0xd8a6, 0xb55f, 0x56a0, 0xa5b4, 0x25df, 0x92d0, 0xd2b2,
        0xa950, 0xb557, 0x6ca0, 0xb550, 0x5355, 0x4daf, 0xa5b0, 0x4573,
        0x52bf, 0xa9a8, 0xe950, 0x6aa0, 0xaea6, 0xab50, 0x4b60, 0xaae4,
        0xa570, 0x5260, 0xf263, 0xd950, 0x5b57, 0x56a0, 0x96d0, 0x4dd5,
        0x4ad0, 0xa4d0, 0xd4d4, 0xd250, 0xd558, 0xb540, 0xb6a0, 0x95a6,
        0x95bf, 0x49b0, 0xa974, 0xa4b0, 0xb27a, 0x6a50, 0x6d40, 0xaf46,
        0xab60, 0x9570, 0x4af5, 0x4970, 0x64b0, 0x74a3, 0xea50, 0x6b58,
        0x5ac0, 0xab60, 0x96d5, 0x92e0, 0xc960, 0xd954, 0xd4a0, 0xda50,
        0x7552, 0x56a0, 0xabb7, 0x25d0, 0x92d0, 0xcab5, 0xa950, 0xb4a0,
        0xbaa4, 0xad50, 0x55d9, 0x4ba0, 0xa5b0, 0x5176, 0x52bf, 0xa930,
        0x7954, 0x6aa0, 0xad50, 0x5b52, 0x4b60, 0xa6e6, 0xa4e0, 0xd260,
        0xea65, 0xd530, 0x5aa0, 0x76a3, 0x96d0, 0x4afb, 0x4ad0, 0xa4d0,
        0xd0b6, 0xd25f, 0xd520, 0xdd45, 0xb5a0, 0x56d0, 0x55b2, 0x49b0,
        0xa577, 0xa4b0, 0xaa50, 0xb255, 0x6d2f, 0xada0, 0x4b63, 0x937f,
        0x49f8, 0x4970, 0x64b0, 0x68a6, 0xea5f, 0x6b20, 0xa6c4, 0xaaef,
        0x92e0, 0xd2e3, 0xc960, 0xd557, 0xd4a0, 0xda50, 0x5d55, 0x56a0,
        0xa6d0, 0x55d4, 0x52d0, 0xa9b8, 0xa950, 0xb4a0, 0xb6a6, 0xad50,
        0x55a0, 0xaba4, 0xa5b0, 0x52b0, 0xb273, 0x6930, 0x7337, 0x6aa0,
        0xad50, 0x4b55, 0x4b6f, 0xa570, 0x54e4, 0xd260, 0xe968, 0xd520,
        0xdaa0, 0x6aa6, 0x56df, 0x4ae0, 0xa9d4, 0xa4d0, 0xd150, 0xf252, 0xd520
    ];

    static solarTermInfo = [
        0, 21208, 42467, 63836, 85337, 107014, 128867, 150921,
        173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033,
        353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758
    ];

    static Tianan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    static Deqi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    static Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    static solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
    static lunarString1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    static lunarString2 = ["初", "十", "廿", "卅", "正", "腊", "冬", "闰"];

    static getLunarLeapMonth(lunarYear) {
        const leapMonth = Lunar.lunarInfo[lunarYear - 1900] & 0xf;
        return (leapMonth === 0xf ? 0 : leapMonth);
    }

    static getLunarLeapDays(lunarYear) {
        return Lunar.getLunarLeapMonth(lunarYear) > 0 ? ((Lunar.lunarInfo[lunarYear - 1899] & 0xf) === 0xf ? 30 : 29) : 0;
    }

    static getLunarYearDays(lunarYear) {
        let daysInLunarYear = 348;
        for (let i = 0x8000; i > 0x8; i >>= 1) {
            daysInLunarYear += ((Lunar.lunarInfo[lunarYear - 1900] & i) !== 0) ? 1 : 0;
        }
        daysInLunarYear += Lunar.getLunarLeapDays(lunarYear);
        return daysInLunarYear;
    }

    static getLunarMonthDays(lunarYear, lunarMonth) {
        const daysInLunarMonth = ((Lunar.lunarInfo[lunarYear - 1900] & (0x10000 >> lunarMonth)) !== 0) ? 30 : 29;
        return daysInLunarMonth;
    }

    static getSolarTermDay(solarYear, index) {
        const baseDate = new Date(1900, 0, 6, 2, 5, 0);
        const time = baseDate.getTime() + 31556925974.7 * (solarYear - 1900) + Lunar.solarTermInfo[index] * 60000;
        return new Date(time).getDate();
    }

    static getCyclicalString(cyclicalNumber) {
        return Lunar.Tianan[Lunar.getTianan(cyclicalNumber)] + Lunar.Deqi[Lunar.getDeqi(cyclicalNumber)];
    }

    static getTianan(cyclicalNumber) {
        return cyclicalNumber % 10;
    }

    static getDeqi(cyclicalNumber) {
        return cyclicalNumber % 12;
    }

    static getLunarYearString(lunarYear) {
        return Lunar.getCyclicalString(lunarYear - 1900 + 36);
    }

    static getLunarMonthString(lunarMonth) {
        let lunarMonthString = "";
        if (lunarMonth === 1) {
            lunarMonthString = Lunar.lunarString2[4];
        } else {
            if (lunarMonth > 9) {
                lunarMonthString += Lunar.lunarString2[1];
            }
            if (lunarMonth % 10 > 0) {
                lunarMonthString += Lunar.lunarString1[lunarMonth % 10];
            }
        }
        return lunarMonthString;
    }

    static getLunarDayString(lunarDay) {
        if (lunarDay < 1 || lunarDay > 30) {
            return "";
        }
        const i1 = Math.floor(lunarDay / 10);
        const i2 = lunarDay % 10;
        let c1 = Lunar.lunarString2[i1];
        let c2 = Lunar.lunarString1[i2];
        if (lunarDay < 11) {
            c1 = Lunar.lunarString2[0];
        }
        if (i2 === 0) {
            c2 = Lunar.lunarString2[1];
        }
        return c1 + c2;
    }

    init(TimeInMillis) {
        this.solar = new Date(TimeInMillis);
        const baseDate = new Date(1900, 0, 31);
        let offset = (TimeInMillis - baseDate.getTime()) / 86400000;
        this.lunarYear = 1900;
        let daysInLunarYear = Lunar.getLunarYearDays(this.lunarYear);
        while (this.lunarYear < 2100 && offset >= daysInLunarYear) {
            offset -= daysInLunarYear;
            daysInLunarYear = Lunar.getLunarYearDays(++this.lunarYear);
        }
        let lunarMonth = 1;
        const leapMonth = Lunar.getLunarLeapMonth(this.lunarYear);
        this.isLeapYear = leapMonth > 0;
        let leapDec = false;
        let isLeap = false;
        let daysInLunarMonth = 0;
        while (lunarMonth < 13 && offset > 0) {
            if (isLeap && leapDec) {
                daysInLunarMonth = Lunar.getLunarLeapDays(this.lunarYear);
                leapDec = false;
            } else {
                daysInLunarMonth = Lunar.getLunarMonthDays(this.lunarYear, lunarMonth);
            }
            if (offset < daysInLunarMonth) {
                break;
            }
            offset -= daysInLunarMonth;
            if (leapMonth === lunarMonth && !isLeap) {
                leapDec = true;
                isLeap = true;
            } else {
                lunarMonth++;
            }
        }
        this.maxDayInMonth = daysInLunarMonth;
        this.lunarMonth = lunarMonth;
        this.isLeap = (lunarMonth === leapMonth && isLeap);
        this.lunarDay = Math.floor(offset + 1);
        this.getCyclicalData();
    }

    getCyclicalData() {
        this.solarYear = this.solar.getFullYear();
        this.solarMonth = this.solar.getMonth();
        this.solarDay = this.solar.getDate();
        let cyclicalYear = 0;
        let cyclicalMonth = 0;
        let cyclicalDay = 0;

        const term2 = Lunar.getSolarTermDay(this.solarYear, 2);
        if (this.solarMonth < 1 || (this.solarMonth === 1 && this.solarDay < term2)) {
            cyclicalYear = (this.solarYear - 1900 + 36 - 1) % 60;
        } else {
            cyclicalYear = (this.solarYear - 1900 + 36) % 60;
        }

        const firstNode = Lunar.getSolarTermDay(this.solarYear, this.solarMonth * 2);
        if (this.solarDay < firstNode) {
            cyclicalMonth = ((this.solarYear - 1900) * 12 + this.solarMonth + 12) % 60;
        } else {
            cyclicalMonth = ((this.solarYear - 1900) * 12 + this.solarMonth + 13) % 60;
        }

        cyclicalDay = Math.floor((this.solar.getTime() / 86400000 + 25567 + 10) % 60);
        this.cyclicalYear = cyclicalYear;
        this.cyclicalMonth = cyclicalMonth;
        this.cyclicalDay = cyclicalDay;
    }

    getAnimalString() {
        return Lunar.Animals[(this.lunarYear - 4) % 12];
    }

    getTermString() {
        let termString = "";
        if (Lunar.getSolarTermDay(this.solarYear, this.solarMonth * 2) === this.solarDay) {
            termString = Lunar.solarTerm[this.solarMonth * 2];
        } else if (Lunar.getSolarTermDay(this.solarYear, this.solarMonth * 2 + 1) === this.solarDay) {
            termString = Lunar.solarTerm[this.solarMonth * 2 + 1];
        }
        return termString;
    }

    getCyclicalDateString() {
        return `${this.getCyclicaYear()}年${this.getCyclicaMonth()}月${this.getCyclicaDay()}日`;
    }

    getCyclicaYear() {
        return Lunar.getCyclicalString(this.cyclicalYear);
    }

    getCyclicaMonth() {
        return Lunar.getCyclicalString(this.cyclicalMonth);
    }

    getCyclicaDay() {
        return Lunar.getCyclicalString(this.cyclicalDay);
    }

    getLunarDayString() {
        return Lunar.getLunarDayString(this.lunarDay);
    }

    getLunarMonthString() {
        return (this.isLeap ? "闰" : "") + Lunar.getLunarMonthString(this.lunarMonth);
    }

    getLunarYearString() {
        return Lunar.getLunarYearString(this.lunarYear);
    }

    getLunarDateString() {
        return `${this.getLunarYearString()}年${this.getLunarMonthString()}月${this.getLunarDayString()}日`;
    }
}

// 示例使用
// const lunar = new Lunar(new Date());
// console.log("节气:", lunar.getTermString());
// console.log("干支历:", lunar.getCyclicalDateString());
// console.log("生肖:", lunar.getAnimalString());
// console.log("农历日期:", lunar.getLunarDateString());
