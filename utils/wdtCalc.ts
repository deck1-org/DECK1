import { useWeatherStore } from "@/stores/WeatherStore";

const store = useWeatherStore();
const weatherData: any = store.weatherData;

// CONFIG LIMITS               move this to assetStores !!!
const conf_ctv_small_limit: number = 1.5; // m
const conf_ctv_big_limit: number = 1.75; // m
const conf_sov_limit: number = 2.75; // m
const conf_site_limit: number = 18; // m/s
const conf_heli_visibility_limit: number = 20.83; // 20.83% -> 5km 
const conf_heli_cloudbase_limit: number = 0; // 0 ==> no fly | 1 ==> good to go (fly?)

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

let current_day = 1;
let current_month = 1;
let amountOfYears = 0;

export function start(years: number) {
    const timeRangeStart: number = store.startHour
    const timeRangeEnd: number = store.endHour
    current_day = 1;
    current_month = 1;
    amountOfYears = 0;
    monthsCtvSmall = []
    monthsCtvBig = []
    monthsSov = []
    monthsSite = []
    monthsHeli = []

    countYears()
    console.log(amountOfYears)
    console.log(amountOfYears - years+1)
    weatherData.forEach((element: any) => {
        if (element.Year >= amountOfYears-years+1) {
        if (current_day === Number(element.Day)){
            if (Number(element.Hour) >= timeRangeStart 
            && Number(element.Hour) <= timeRangeEnd){
            //evaluate hourly wdt
            evaluateHourDay(element, false)
            }
        } else {
            //evaluate day wdt
            evaluateHourDay(element, true)

            //without this part, one hour is skipped!!
            if (Number(element.Hour) >= timeRangeStart 
            && Number(element.Hour) <= timeRangeEnd){
            evaluateHourDay(element, false)
            }

            //increment current day
            current_day = Number(element.Day);
        }
        //if month changes -> evaluate
        if (current_month != Number(element.Month) // after || is only necessary if there's only one year of data
            || (Number(element.Month)===12 && Number(element.Day)===31 && Number(element.Hour)===timeRangeEnd) ){
            monthsCtvSmall = evaluateMonth(monthsCtvSmall, daysCtvSmall, current_month)
            monthsCtvBig = evaluateMonth(monthsCtvBig, daysCtvBig, current_month)
            monthsSov = evaluateMonth(monthsSov, daysSov, current_month)
            monthsSite = evaluateMonth(monthsSite, daysSite, current_month)
            monthsHeli = evaluateMonth(monthsHeli, daysHeli, current_month)
            
            //clear days arrays
            daysCtvSmall = []
            daysCtvBig = []
            daysSov = []
            daysSite = []
            daysHeli = []
            //increment current month
            current_month = Number(element.Month)
        // }
        // //increment amountOfYears
        //     if (Number(element.Year) != amountOfYears) amountOfYears++;
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

function evaluateMonth(monthArr: number[], dayArr: number[], month: number): number[] {
    if (month >= Number(store.startMonth) && month <= Number(store.endMonth)) {
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