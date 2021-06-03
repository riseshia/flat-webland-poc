import { readJSON, writeJSON, removeFile } from "https://deno.land/x/flat@0.0.10/mod.ts";

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0]; // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename);

if ( json.status !== "OK" ) {
    Deno.exit(1);
}

const pocData = json.data
  .filter(row => (row.Type === "中古マンション等"))
  .map(row => ({
    prefecture: row.Prefecture,
    municipality: row.Municipality,
    districtName: row.DistrictName,
    tradePrice: row.TradePrice,
    floorPlan: row.FloorPlan,
    area: row.Area,
    buildingYear: row.BuildingYear,
    structure: row.Structure,
    cityPlanning: row.CityPlanning,
    period: row.Period,
    renovation: row.Renovation,
  }));

const newFilename = "data-postprocessed.json";
await writeJSON(newFilename, pocData) // create a new JSON file with just the Bitcoin price
