import { ConfigurationError, WeatherProvider, WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherMapper } from './mapper';
import { getBaseUrl } from './config';
import { OpenWeatherCurrentResponse } from './apiTypes';
import { HttpTransport } from '@repo/transports/http';
export interface OpenWeatherProviderConfig {
    apiKey: string;
}
import { APIError, HTTPResponse } from '@repo/core';

export class OpenWeatherProvider implements WeatherProvider {
    readonly name = 'OpenWeather';
    #apiKey: string;
    constructor(
        private transport: HttpTransport,
        private mapper: OpenWeatherMapper,
        config: OpenWeatherProviderConfig
    ) {
        if (!config.apiKey && !process.env.OPENWEATHER_API_KEY) {
            throw new ConfigurationError(
                'OpenWeather API key is required: pass config.apiKey or set OPENWEATHER_API_KEY'
            );
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

        this.#handleApiError(response);

        return this.mapper.toWeatherResponse(response.body, request.units);
    }
    #handleApiError(response: HTTPResponse<OpenWeatherCurrentResponse>) {
        if (response.status === 401) {
            let errorMessage = 'Unauthorized: Invalid or missing API key';
            throw new APIError(
                this.name,
                errorMessage,
                'provider_error',
                response.status,
                new Error(`OpenWeather API returned status ${response.status}: ${errorMessage}`)
            );
        }
        else if (response.status === 429) {
            let errorMessage = 'Too Many Requests: Rate limit exceeded';
            throw new APIError(
                this.name,
                errorMessage,
                'provider_error',
                response.status,
                new Error(`OpenWeather API returned status ${response.status}: ${errorMessage}`)
            );
        }
    }
}

