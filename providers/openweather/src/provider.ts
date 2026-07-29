import { WeatherProvider, WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherMapper } from './mapper';
import { getBaseUrl } from './config';
import { OpenWeatherCurrentResponse } from './apiTypes';
import { HttpTransport } from '../../../transports/http';
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

        const { lat, lon } = this.mapper.fromWeatherRequest(request);

        const response = await this.transport.request<OpenWeatherCurrentResponse>(
            {
                method: 'GET',
                url: getBaseUrl(lat, lon, this.#apiKey)
            }
        );

        return this.mapper.toWeatherResponse(response.data);
    }
}