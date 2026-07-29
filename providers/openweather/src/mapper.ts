import { WeatherResponse } from '@repo/core';
export class OpenWeatherMapper {
    toWeatherResponse(data: any): WeatherResponse {
        return {
            temperature: data.main.temp,
        };
    }
}