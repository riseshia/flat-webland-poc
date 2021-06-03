const keyToJaDic = {
  prefecture: "都道府県名",
  municipality: "市区町村名",
  districtName: "地区名",
  tradePrice: "取引価格（総額）",
  floorPlan: "間取り",
  area: "面積（平方メートル）",
  buildingYear: "建築年",
  structure: "建物の構造",
  cityPlanning: "用途",
  period: "取引時点",
  renovation: "改装",
}

const formatter = {
  keyToJa: (key) => {
    return keyToJaDic[key] || key;
  },
  buildingYear: (val) => {
    if (!val) { return "不明"; }
    const gengo = val.substring(0, 2);
    const yearStr = val.substring(2, val.length - 1);
    let year;
    if (yearStr == "元") {
      year = 1;
    } else {
      year = parseInt(yearStr, 10);
    }

    let seireki;
    switch (gengo) {
      case "大正": seireki = 1911 + year; break;
      case "昭和": seireki = 1925 + year; break;
      case "平成": seireki = 1988 + year; break;
      case "令和": seireki = 2018 + year; break;
      default: return val;
    }
    return seireki.toString() + "年";
  },
  renovation: (val) => {
    return val || "不明";
  },
}

export default formatter;
