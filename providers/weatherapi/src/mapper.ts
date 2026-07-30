import {
    celciusToKelvin,
    DEFAULT_UNITS,
    kphToMs,
    Units,
    ValidationError,
    WeatherRequest,
    WeatherResponse,
} from '@repo/core';
import { WeatherAPIResponse } from './apiTypes';
type WeatherAPIRequest = {
    q: string;
    lang?: string;
};
export class WeatherAPIMapper {
    toWeatherApiRequest(request: WeatherRequest): WeatherAPIRequest {

        //TODO: Implement lat long to city name conversion using a geocoding API if needed
        if (request.location.type !== 'city') {
            throw new ValidationError(
                `WeatherAPI requires a 'city' location, received '${request.location.type}'`
            );
        }

        return {
            q: request.location.name,
            lang: request.language,
        };
    }

    fromWeatherAPIResponse(response: WeatherAPIResponse, units: Units = DEFAULT_UNITS): WeatherResponse {
        const { current } = response;
        return {
            temperature: this.#temperature(current, units),
            wind_speed: this.#windSpeed(current, units),
            wind_direction: current.wind_dir,
            humidity: current.humidity,
        };
    }

    #temperature(current: WeatherAPIResponse['current'], units: Units): number {
        switch (units) {
            case 'metric':
                return current.temp_c;
            case 'imperial':
                return current.temp_f;
            case 'standard':
                return celciusToKelvin(current.temp_c);
        }
    }

    #windSpeed(current: WeatherAPIResponse['current'], units: Units): number {
        switch (units) {
            case 'metric':
                return current.wind_kph;
            case 'imperial':
                return current.wind_mph;
            case 'standard':
                return kphToMs(current.wind_kph);
        }
    }
}
