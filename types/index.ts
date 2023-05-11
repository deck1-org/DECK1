export interface ILocation {
    _id?: string;
    name: string;
    latitude: number;
    longitude: number;
    limit: number;
}

export interface IWeatherdata {
    Year: number;
    Month: number;
    Day: number;
    Hour: number;
    Hs: number;
    Windspeed: number;
    Visibility: number;
    Cloud: number;
    locationId: string;
}