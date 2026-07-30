import {
    DEFAULT_UNITS,
    degreesToCardinal,
    msToKph,
    speedFromKph,
    temperatureFromCelcius,
    Units,
    ValidationError,
    WeatherRequest,
    WeatherResponse,
} from '@repo/core';
import { OpenWeatherCurrentResponse } from './apiTypes';

export type OpenWeatherRequest = {
    lat: number;
    lon: number;
    units: 'metric';
    lang?: string;
};

export class OpenWeatherMapper {

    fromWeatherRequest(request: WeatherRequest): OpenWeatherRequest {
        if (request.location.type !== 'coordinates') {
            throw new ValidationError(
                `OpenWeather requires a 'coordinates' location, received '${request.location.type}'`
            );
            // TODO: Implement city name to coordinates conversion using OpenWeather API
        }
        return {
            lat: request.location.lat,
            lon: request.location.lon,
            units: 'metric',
            lang: request.language,
        };
    }


    toWeatherResponse(response: OpenWeatherCurrentResponse, units: Units = DEFAULT_UNITS): WeatherResponse {
        return {
            temperature: temperatureFromCelcius(response.data.temp, units),
            wind_speed: speedFromKph(msToKph(response.data.wind_speed), units),
            wind_direction: degreesToCardinal(response.data.wind_deg),
            humidity: response.data.humidity,
        };
    }
}
