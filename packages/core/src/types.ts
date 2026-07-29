type Location = {
    type: 'coordinates';
    lat: number;
    lon: number;
} | {
    type: 'city';
    name: string;
}

export interface WeatherRequest {
    location: Location;
}
export interface WeatherResponse {
    temperature: number;
}