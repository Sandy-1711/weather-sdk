import { WeatherProvider, WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherMapper } from './mapper';
import { getBaseUrl } from './config';
import { OpenWeatherCurrentResponse } from './apiTypes';
export interface OpenWeatherProviderConfig {
    apiKey: string;
}

export class OpenWeatherProvider implements WeatherProvider {
    readonly name = 'OpenWeather';
    #apiKey: string;
    constructor(
        private transport: HttpTransport,
        private mapper: OpenWeatherMapper,
        config: OpenWeatherProviderConfig
    ) {
        this.#apiKey = config.apiKey;
    }
    async current(request: WeatherRequest): Promise<WeatherResponse> {

        const response = await this.transport.request(
            method: 'GET',
            url: getBaseUrl(request.location.lat, request.location.lon, this.#apiKey)
        );

        return this.mapper.toWeatherResponse(response.body);
    }
}