import { WeatherResponse } from '@repo/core';
import { OpenWeatherCurrentResponse } from './apiTypes';


export class OpenWeatherMapper {
    toWeatherResponse(response: OpenWeatherCurrentResponse): WeatherResponse {
        return {
            temperature: response.data.temp,
        };
    }
}