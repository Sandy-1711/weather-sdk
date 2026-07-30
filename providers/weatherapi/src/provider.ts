import { WeatherProvider } from "@repo/core";
import { HttpTransport } from "@repo/transports/http";
import { WeatherAPIMapper } from "./mapper";
import { APIError, ConfigurationError, HttpError } from "@repo/core";
import { WeatherRequest, WeatherResponse } from "@repo/core";
import { buildUrl } from "./config";
import { WeatherAPIResponse } from "./apiTypes";
export interface WeatherAPIProviderConfig {
    apiKey: string;
}

export class WeatherAPIProvider implements WeatherProvider {
    readonly name = "WeatherAPI";
    constructor(
        private transport: HttpTransport, private mapper: WeatherAPIMapper,
        private apiKey: string,
        config: WeatherAPIProviderConfig
    ) {
        if (!config.apiKey && !process.env.WEATHER_API_KEY) {
            throw new ConfigurationError(
                "WeatherAPI API key is required: pass config.apiKey or set WEATHER_API_KEY"
            );
        }
        this.apiKey = config.apiKey || process.env.WEATHER_API_KEY!;
    }
    async current(request: WeatherRequest): Promise<WeatherResponse> {
        const { q } = this.mapper.toWeatherApiRequest(request);

        try {
            const response = await this.transport.request<WeatherAPIResponse>({
                method: "GET",
                url: buildUrl(this.apiKey, q)
            });

            return this.mapper.fromWeatherAPIResponse(response.body, request.units);
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
                    "Unauthorized: invalid or missing API key",
                    "authentication",
                    error.status,
                    error
                );
            case 403:
                return new APIError(
                    this.name,
                    "Forbidden: API key is disabled or its quota is exhausted",
                    "authentication",
                    error.status,
                    error
                );
            case 429:
                return new APIError(
                    this.name,
                    "Too Many Requests: rate limit exceeded",
                    "rate_limit",
                    error.status,
                    error
                );
            case 400:
            case 404:
                return new APIError(
                    this.name,
                    "No matching location found for the requested query",
                    "provider_error",
                    error.status,
                    error
                );
            default:
                return new APIError(
                    this.name,
                    `WeatherAPI request failed with status ${error.status}`,
                    "provider_error",
                    error.status,
                    error
                );
        }
    }
}
