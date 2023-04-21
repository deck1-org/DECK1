import { useWeatherStore } from "@/stores/WeatherStore";
import { useAssetStore } from "~/stores/AssetStore";

const store = useWeatherStore();
const assetStore = useAssetStore();
const weatherData: any = store.weatherData;

// CONFIG LIMITS               move this to assetStores !!!
const conf_ctv_small_limit: number = assetStore.ctv_small.limit; 
const conf_ctv_big_limit: number = assetStore.ctv_big.limit;  
const conf_sov_limit: number = assetStore.sov.limit;
const conf_heli_visibility_limit: number = assetStore.heli.visibility;
const conf_heli_cloudbase_limit: number = assetStore.heli.cloudbase;

const conf_site_limit: number = 18; /////////////////

// CONFIG THRESHOLDS - percentage of a day that can be no-fly                move this to assetStores !!!
const threshold: number = 0.5;

//hours
let hoursCtvSmall: Number[] = [], hoursCtvBig: Number[] = [], hoursSov: Number[] = [], 
hoursSite: Number[] = [], hoursHeli: Number[] = []

//days
let daysCtvSmall: number[] = [], daysCtvBig: number[] = [], daysSov: number[] = [], 
daysSite: number[] = [], daysHeli: number[] = []

//months
let monthsCtvSmall: number[] = [], monthsCtvBig: number[] = [], monthsSov: number[] = [],
monthsSite: number[] = [], monthsHeli: number[] = []

let current_day: number;
let current_month: number;
let amountOfYears: number;

export function start(timeRangeStart: number, timeRangeEnd: number, 
    startMonth: number, endMonth: number, years: number) {
    startMonth = startMonth;
    endMonth = endMonth;
    current_day = 1;
    current_month = 1;
    amountOfYears = 0;
    monthsCtvSmall = []
    monthsCtvBig = []
    monthsSov = []
    monthsSite = []
    monthsHeli = []

    countYears()
    weatherData.forEach((element: any) => {
        if (element.Year >= amountOfYears - years + 1) {
            if (current_day === Number(element.Day)) {
                if (Number(element.Hour) >= timeRangeStart
                    && Number(element.Hour) <= timeRangeEnd) {
                    //evaluate hourly wdt
                    evaluateHourDay(element, false)
                }
            } else {
                //evaluate day wdt
                evaluateHourDay(element, true)

                //without this part, one hour is skipped!!
                if (Number(element.Hour) >= timeRangeStart
                    && Number(element.Hour) <= timeRangeEnd) {
                    evaluateHourDay(element, false)
                }

                //increment current day
                current_day = Number(element.Day);
            }
            //if month changes -> evaluate
            if (current_month != Number(element.Month) // after || is only necessary if there's only one year of data
                || (Number(element.Month) === 12 && Number(element.Day) === 31 && Number(element.Hour) === timeRangeEnd)) {
                monthsCtvSmall = evaluateMonth(monthsCtvSmall, daysCtvSmall, current_month, startMonth, endMonth)
                monthsCtvBig = evaluateMonth(monthsCtvBig, daysCtvBig, current_month, startMonth, endMonth)
                monthsSov = evaluateMonth(monthsSov, daysSov, current_month, startMonth, endMonth)
                monthsSite = evaluateMonth(monthsSite, daysSite, current_month, startMonth, endMonth)
                monthsHeli = evaluateMonth(monthsHeli, daysHeli, current_month, startMonth, endMonth)

                //clear days arrays
                daysCtvSmall = []
                daysCtvBig = []
                daysSov = []
                daysSite = []
                daysHeli = []
                //increment current month
                current_month = Number(element.Month)
            }
        }
    });

    for (let i=0; i < 12; i++){
        monthsCtvSmall[i] = monthsCtvSmall[i] / years;
        monthsCtvBig[i] = monthsCtvBig[i] / years;
        monthsSov[i] = monthsSov[i] / years;
        monthsSite[i] = monthsSite[i] / years;
        monthsHeli[i] = monthsHeli[i] / years;
    }

    store.ctvLargeData = monthsCtvBig;
    store.ctvSmallData = monthsCtvSmall;
    store.sovData = monthsSov;
    store.siteData = monthsSite;
    store.heliData = monthsHeli;
}

function evaluateHourDay(element: any, newDay: boolean){
    if (!newDay){
        hoursCtvSmall.push(parseFloat(element["Sign. wave height (Hs)"]) > conf_ctv_small_limit ? 1 : 0)
        hoursCtvBig.push(parseFloat(element["Sign. wave height (Hs)"]) > conf_ctv_big_limit ? 1 : 0)
        hoursSov.push(parseFloat(element["Sign. wave height (Hs)"]) > conf_sov_limit ? 1 : 0)
        hoursSite.push(parseFloat(element["Wind speed"]) > conf_site_limit ? 1 : 0)
        hoursHeli.push( (parseFloat(element["Visibility"]) < conf_heli_visibility_limit 
                            || Number(element["VFR cloud"]) === conf_heli_cloudbase_limit) ? 1 : 0)
    } else {
        daysCtvSmall.push(hoursCtvSmall.filter((num) => num === 1).length / hoursCtvSmall.length
        >= threshold ? 1 : 0);
        daysCtvBig.push(hoursCtvBig.filter((num) => num === 1).length / hoursCtvBig.length
        >= threshold ? 1 : 0);
        daysSov.push(hoursSov.filter((num) => num === 1).length / hoursSov.length
        >= threshold ? 1 : 0);
        daysSite.push(hoursSite.filter((num) => num === 1).length / hoursSite.length
        >= threshold ? 1 : 0);
        daysHeli.push(hoursHeli.filter((num) => num === 1).length / hoursHeli.length
        >= threshold ? 1 : 0);

        //reset hours arrays
        [hoursCtvSmall, hoursCtvBig, hoursSov, hoursSite, hoursHeli] = [
            [],
            [],
            [],
            [],
            [],
          ];
    }
}

function evaluateMonth(monthArr: number[], dayArr: number[], month: number, startMonth: number, endMonth: number): number[] {
    if (month >= startMonth && month <= endMonth) {
    if(monthArr[month-1] != null){
    monthArr[month-1] += dayArr.filter((num) => num === 1).length
    } //amountOfYears+1 because it starts from 0
    else {
    monthArr[month-1] = dayArr.filter((num) => num === 1).length
    }
    }
    return monthArr;
};

function countYears() {
    let year = 0;
    for (const item of weatherData) {
        if(item.Year != year){
            amountOfYears++;
            year = item.Year;
        }
    }
}