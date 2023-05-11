import WeatherModel from '~/server/models/WeatherData.model'

export default defineEventHandler(async (event) => {
    const id = event.context.params?.locationId;
    const pageSize = 20000; // Number of documents to retrieve in each page
    const pages = 11; // Number of pages to retrieve
    let sortedData = [];
    for (let i = 1; i <= pages; i++) {
        const result = await WeatherModel.find({ location: id })
            .sort({ Year: 1, Month: 1, Day: 1, Hour: 1 })
            .limit(pageSize)
            .skip((i - 1) * pageSize);
        sortedData.push(...result);
        console.log(sortedData.length);
        
    }
    return sortedData;
})