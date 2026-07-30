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
    temperature_celcius: number;
    temperature_farenheit: number;
    wind_speed_kph: number;
    wind_speed_mph: number;
    wind_direction: string;
    humidity: number;
}