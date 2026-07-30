import { WeatherProvider } from "@repo/core";
import { HttpTransport } from "@repo/transports/http";
import { WeatherAPIMapper } from "./mapper";
import { ConfigurationError } from "@repo/core";
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
                "API key is required",
                new Error("No API key provided")
            );
        }
        this.apiKey = config.apiKey || process.env.WEATHER_API_KEY!;
    }
    async current(request: WeatherRequest): Promise<WeatherResponse> {
        const { q } = this.mapper.toWeatherApiRequest(request);
        const response = await this.transport.request<WeatherAPIResponse>({
            method: "GET",
            url: buildUrl(this.apiKey, q)
        })
        return this.mapper.fromWeatherAPIResponse(response.data, request.units);
    }
}