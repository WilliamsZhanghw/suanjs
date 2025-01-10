class PaiPanFinal {
    constructor() {
        
    }

    getBazi(cal, isman) {
        let lunar = new BaZi(cal);
        let lunaryue = new Lunar(cal);
        let result = Array(10).fill("");
        //result[9] += "此人农历的日期\n【" + lunar.toString() + "】";
        let time = Math.floor(cal.getHours() / 2);

        // 获取生肖
        //result[9] += "\n此人的农历生肖\n【" + lunar.animalsYear() + "】";
        //result[9] += ","+lunar.animalsYear() ;
        let GanZhi = lunar.getYearGanZhi(time); // 取八字
        console.log("ganzhi:",GanZhi);
        let tempchar = GanZhi.split(",");
        let ganziyear = lunaryue.getCyclicaYear(); // 年柱
        let ganzimonth = lunaryue.getCyclicaMonth(); // 月柱
        let ganziday = lunaryue.getCyclicaDay(); // 日柱
        let ganzitime = tempchar[3]; // 时柱

        //result[9] += "\n此人八字\n【" + ganziyear + " " + ganzimonth + " " + ganziday + " " + ganzitime + "】\n";
        // 示例用法
        const chineseInput = lunar.animalsYear(); // 输入一个中文的生肖名称
        const englishOutput = translateZodiac(chineseInput);
        console.log(englishOutput); // 输出: Dragon
        result[0] = englishOutput ;
        result[1] = ganziyear.charAt(0); // 年干
        result[2] = ganziyear.charAt(1); // 年支
        result[3] = ganzimonth.charAt(0); // 月干
        result[4] = ganzimonth.charAt(1); // 月支
        result[5] = ganziday.charAt(0); // 日干
        result[6] = ganziday.charAt(1); // 日支
        result[7] = ganzitime.charAt(0); // 时干
        result[8] = ganzitime.charAt(1); // 时支

        // result[0] = this.checkRiYuanHeHua(result);
        // if (result[0] !== "") {
        //     result[9] += "\n日元发生了合化，变成了：" + result[0] + "\n";
        // }
        return result;
    }
}
function translateZodiac(chineseZodiac) {
    const zodiacMap = {
        "鼠": "Rat",
        "牛": "Ox",
        "虎": "Tiger",
        "兔": "Rabbit",
        "龙": "Dragon",
        "蛇": "Snake",
        "马": "Horse",
        "羊": "Goat",
        "猴": "Monkey",
        "鸡": "Rooster",
        "狗": "Dog",
        "猪": "Pig"
    };

    return zodiacMap[chineseZodiac] || "Unknown zodiac";
}



// 示例用法
birthDate = new Date(1979, 02, 01, 04, 30); // 1983年1月10日12:30
// birthDate = new Date(); // 1983年1月10日12:30
const lunar = new Lunar(new Date());
mypaipan = new PaiPanFinal();
baziResult = mypaipan.getBazi(birthDate,true);
console.log("此人信息【" + baziResult + "】"); // 假设时辰为午时（12:00 - 14:00）
