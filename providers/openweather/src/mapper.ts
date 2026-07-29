import { WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherCurrentResponse } from './apiTypes';


export class OpenWeatherMapper {


    fromWeatherRequest(request: WeatherRequest) {
        if (request.location.type !== 'coordinates') {
            throw new Error('OpenWeatherMapper: Only coordinates location type is supported');
            // TODO: Implement city name to coordinates conversion using OpenWeather API
        }
        return {
            lat: request.location.lat,
            lon: request.location.lon,
        };
    }


    toWeatherResponse(response: OpenWeatherCurrentResponse): WeatherResponse {
        return {
            temperature: response.data.temp,
        };
    }
}