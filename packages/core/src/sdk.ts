import { WeatherProvider } from './provider';
import { WeatherRequest, WeatherResponse } from './types';
export interface WeatherSDKConfig {
    provider: WeatherProvider;
}
export class WeatherSDK {
    #provider: WeatherProvider;

    constructor(config: WeatherSDKConfig) {
        this.#provider = config.provider;
    }

    async getWeather(request: WeatherRequest): Promise<WeatherResponse> {
        return this.#provider.current(request);
    }

}