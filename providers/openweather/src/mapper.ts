import { WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherCurrentResponse } from './apiTypes';


export class OpenWeatherMapper {
    toWeatherResponse(response: OpenWeatherCurrentResponse): WeatherResponse {
        return {
            temperature: response.data.temp,
        };
    }
    fromWeatherRequest(request: WeatherRequest) {
        if (typeof request.location === 'string') {
            throw new Error('Location must be an object with lat and lon properties');
        }
        return {
            lat: request.location.lat,
            lon: request.location.lon,
        };
    }
}