export interface WeatherRequest {
    location: {
        lat: number;
        lon: number;
    } | string;
}
export interface WeatherResponse {
    temperature: number;
}