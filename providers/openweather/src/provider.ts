import { ConfigurationError, WeatherProvider, WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherMapper } from './mapper';
import { getBaseUrl } from './config';
import { OpenWeatherCurrentResponse } from './apiTypes';
import { HttpTransport } from '@repo/transports/http';
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
        if (!config.apiKey && !process.env.OPENWEATHER_API_KEY) {
            throw new ConfigurationError('API key is required', new Error('No API key provided'));
        }
        this.#apiKey = config.apiKey || process.env.OPENWEATHER_API_KEY!;
    }
    async current(request: WeatherRequest): Promise<WeatherResponse> {

        const providerRequest = this.mapper.fromWeatherRequest(request);

        const response = await this.transport.request<OpenWeatherCurrentResponse>(
            {
                method: 'GET',
                url: getBaseUrl(providerRequest, this.#apiKey)
            }
        );

        return this.mapper.toWeatherResponse(response.data, request.units);
    }
}