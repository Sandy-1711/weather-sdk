import { WeatherRequest, WeatherResponse } from '@repo/core';
import { WeatherAPIResponse } from './apiTypes';
type WeatherAPIRequest = {
    q: string;
    lang?: string; //# Language not supported at the moment
};
export class WeatherAPIMapper {
    toWeatherApiRequest(request: WeatherRequest): WeatherAPIRequest {

        //TODO: Implement lat long to city name conversion using a geocoding API if needed
        if (request.location.type !== 'city') {
            throw new Error('WeatherAPIMapper: Only city location type is supported');
        }

        return {
            q: request.location.name,
        };
    }

    fromWeatherAPIResponse(response: WeatherAPIResponse): WeatherResponse {
        return {
            temperature: response.current.temp_c,
        };
    }

}