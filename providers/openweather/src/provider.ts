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
    constructor(private mapper: OpenWeatherMapper, config: OpenWeatherProviderConfig) {
        this.#apiKey = config.apiKey;
    }
    async current(request: WeatherRequest): Promise<WeatherResponse> {

        const response = await fetch(getBaseUrl(51.5, -0.1, this.#apiKey));

        const weatherData: OpenWeatherCurrentResponse = await response.json();

        return this.mapper.toWeatherResponse(weatherData);
    }
}