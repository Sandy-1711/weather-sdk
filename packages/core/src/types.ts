export interface WeatherRequest {
    location: string | {
        lat: number;
        lon: number;
    }
}
export interface WeatherResponse {
    temperature: number;
}