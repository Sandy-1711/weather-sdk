import { WeatherResponse } from '@repo/core';

export interface OpenWeatherCurrentResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    data: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        clouds: number;
        uvi: number;
        visibility: number;
        wind_speed: number;
        wind_gust?: number;
        wind_deg: number;
        rain?: {
            '1h': number;
        };
        snow?: {
            '1h': number;
        };
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        },
        alerts?: Array<string>;
    };

}
export class OpenWeatherMapper {
    toWeatherResponse(response: OpenWeatherCurrentResponse): WeatherResponse {
        return {
            temperature: response.data.temp,
        };
    }
}