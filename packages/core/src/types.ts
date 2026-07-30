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
    units: 'metric' | 'imperial' | 'standard';
    language?: string; 
}
export interface WeatherResponse {
    temperature: number;
    wind_speed: number;
    wind_direction: string;
    humidity: number;
}