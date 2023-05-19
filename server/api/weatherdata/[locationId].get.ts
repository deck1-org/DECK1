import WeatherModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.locationId;
    const pageSize = 20000; // Number of documents to retrieve in each page
    const pages = 11; // Number of pages to retrieve
    let sortedData = await WeatherModel.find({ location: id })

    sortedData = sortedData.sort((a, b) => {
        if (a.Year !== b.Year) {
            return a.Year - b.Year;
        } else if (a.Month !== b.Month) {
            return a.Month - b.Month;
        } else if (a.Day !== b.Day) {
            return a.Day - b.Day;
        } else {
            return a.Hour - b.Hour;
        }
    });
    return sortedData;
})