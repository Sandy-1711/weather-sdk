import { ConfigurationError, WeatherProvider, WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherMapper } from './mapper';
import { getBaseUrl } from './config';
import { OpenWeatherCurrentResponse } from './apiTypes';
import { HttpTransport } from '@repo/transports/http';
export interface OpenWeatherProviderConfig {
    apiKey: string;
}
import { APIError, HttpError } from '@repo/core';

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

        try {
            const response = await this.transport.request<OpenWeatherCurrentResponse>(
                {
                    method: 'GET',
                    url: getBaseUrl(providerRequest, this.#apiKey)
                }
            );

            return this.mapper.toWeatherResponse(response.body, request.units);
        } catch (error) {
            if (error instanceof HttpError) {
                throw this.#translateHttpError(error);
            }
            throw error;
        }
    }

    #translateHttpError(error: HttpError): APIError {
        switch (error.status) {
            case 401:
                return new APIError(
                    this.name,
                    'Unauthorized: invalid or missing API key',
                    'authentication',
                    error.status,
                    error
                );
            case 429:
                return new APIError(
                    this.name,
                    'Too Many Requests: rate limit exceeded',
                    'rate_limit',
                    error.status,
                    error
                );
            case 404:
                return new APIError(
                    this.name,
                    'Not Found: no data for the requested coordinates',
                    'provider_error',
                    error.status,
                    error
                );
            default:
                return new APIError(
                    this.name,
                    `OpenWeather request failed with status ${error.status}`,
                    'provider_error',
                    error.status,
                    error
                );
        }
    }
}
