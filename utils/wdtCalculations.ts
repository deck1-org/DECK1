import { useWeatherStore } from "@/stores/WeatherStore";

const store = useWeatherStore();
const weatherData = store.weatherData;

// ARRAYS TO DISPLAY
let current_day = 0;

let [wdt_ctv_small, wdt_ctv_big, wdt_sov, wdt_site, wdt_heli]: number[][][] =
  Array.from({ length: 5 }, () => Array.from({ length: 12 }, () => []));
let [day_ctv_small, day_ctv_big, day_sov, day_site, day_heli]: number[][] =
  Array.from({ length: 5 }, () => []);
let [ctv_small, ctv_big, sov, site, heli]: number[][] = Array.from(
  { length: 5 },
  () => Array.from({ length: 12 }, () => 0)
);

// CONFIG LIMITS               move this to assetStores !!!
const conf_ctv_small_limit: number = 1.5; // m
const conf_ctv_big_limit: number = 1.75; // m
const conf_sov_limit: number = 2.75; // m
const conf_site_limit: number = 18; // m/s
const conf_heli_visibility_limit: number = 5; // km
const conf_heli_cloudbase_limit: number = 1; // 0 ==> no fly | 1 ==> good to go (fly?)

// CONFIG THRESHOLDS - percentage of a day that can be no-fly                move this to assetStores !!!
const conf_ctv_small_threshold: number = 0.5; // 75% no fly --> NO WDT | 80% no fly --> WDT
const conf_ctv_big_threshold: number = 0.5;
const conf_sov_threshold: number = 0.5;
const conf_site_threshold: number = 0.5;
const conf_heli_threshold: number = 0.5;

function countYears(data_set: { Year: number }[]): number {
  // Return amount of unique years
  return new Set(data_set.map(({ Year }) => Year)).size;
}

function countValue(arr: Array<any>, value: any): number {
  // return amount of "value" in array
  return arr.reduce(
    (count: number, num: any) => (num === value ? count + 1 : count),
    0
  );
}

function evaluateArray(arr: number[], threshold: number = 0.5): number {
  const zeroes = arr.filter((num) => num === 0).length;
  return zeroes / arr.length >= threshold ? 0 : 1;
}

function finalArrays(data_set: any[]) {
  let years = countYears(data_set);
  for (let i = 0; i < 12; i++) {
    ctv_small[i] = countValue(wdt_ctv_small[i], 0) / years;
    ctv_big[i] = countValue(wdt_ctv_big[i], 0) / years;
    sov[i] = countValue(wdt_sov[i], 0) / years;
    site[i] = countValue(wdt_site[i], 0) / years;
    heli[i] = countValue(wdt_heli[i], 0) / years;
  }

  store.ctvLargeData = ctv_big;
  store.ctvSmallData = ctv_small;
  store.sovData = sov;
  store.siteData = site;
  store.heliData = heli;
}

// export function start(timeRangeStart: number, timeRangeEnd: number) {
//   for (let obj of weatherData) {
//     fillArrays(obj, timeRangeStart, timeRangeEnd);
//   }
//   finalArrays(weatherData);
// }

function fillArrays(obj: any, timeRangeStart: number, timeRangeEnd: number) {
  let current_hour = Number(obj["Hour"]);
  if (current_hour >= timeRangeStart && current_hour <= timeRangeEnd) {
    if (current_day === Number(obj["Day"])) {
      let hs = parseFloat(obj["Significant wave height (Hs)"]);
      let windspeed = parseFloat(obj["Wind speed 115m"]);
      let visibility = parseFloat(obj["Visibility"]);
      let cloudBase = Number(obj["VFR cloud"]);

      day_sov.push(hs <= conf_sov_limit ? 1 : 0);
      day_ctv_big.push(hs <= conf_ctv_big_limit ? 1 : 0);
      day_ctv_small.push(hs <= conf_ctv_small_limit ? 1 : 0);

      day_site.push(windspeed <= conf_site_limit ? 1 : 0);
      day_heli.push(
        visibility >= conf_heli_visibility_limit &&
          cloudBase === conf_heli_cloudbase_limit
          ? 1
          : 0
      );
    } else {
      // If day changes
      // push wdt for 1 day to month array
      wdt_ctv_small[obj["Month"] - 1].push(
        evaluateArray(day_ctv_small, conf_ctv_small_threshold)
      );
      wdt_ctv_big[obj["Month"] - 1].push(
        evaluateArray(day_ctv_big, conf_ctv_big_threshold)
      );
      wdt_sov[obj["Month"] - 1].push(
        evaluateArray(day_sov, conf_sov_threshold)
      );
      wdt_site[obj["Month"] - 1].push(
        evaluateArray(day_site, conf_site_threshold)
      );
      wdt_heli[obj["Month"] - 1].push(
        evaluateArray(day_heli, conf_heli_threshold)
      );

      [day_ctv_small, day_ctv_big, day_sov, day_site, day_heli] = [
        [],
        [],
        [],
        [],
        [],
      ]; // reset array

      current_day = Number(obj["Day"]); // update day
      fillArrays(obj, timeRangeStart, timeRangeEnd); // re-run method with updated day
    }
  }
}
