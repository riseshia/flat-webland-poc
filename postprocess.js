import { readJSON } from "https://deno.land/x/flat@0.0.10/mod.ts";
import { writeCSV } from "https://deno.land/x/csv/mod.ts";

import formatter from "./formatter.js";

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0]; // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename);

if ( json.status !== "OK" ) {
  Deno.exit(1);
}

const pocData = json.data
  .filter(row => (row.Type === "中古マンション等" && row.Purpose === "住宅"))
  .map(row => ({
    prefecture: row.Prefecture,
    municipality: row.Municipality,
    districtName: row.DistrictName,
    tradePrice: row.TradePrice,
    floorPlan: row.FloorPlan,
    area: row.Area,
    buildingYear: formatter.buildingYear(row.BuildingYear),
    structure: row.Structure,
    cityPlanning: row.CityPlanning,
    period: row.Period,
    renovation: formatter.renovation(row.Renovation),
  }));

const keys = Object.keys(pocData[0]);
const csvData = [keys.map(key => (formatter.keyToJa(key)))];
pocData.forEach(row => {
  const values = keys.map(key => row[key] || '');
  csvData.push(values);
});

const f = await Deno.open("data-postprocessed.csv", { write: true, create: true, truncate: true });
await writeCSV(f, csvData);
f.close();
