import { WeatherProvider, WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherMapper } from './mapper';
export class OpenWeatherProvider implements WeatherProvider {
    readonly name = 'OpenWeather';
    private readonly mapper = new OpenWeatherMapper();

    async current(request: WeatherRequest): Promise<WeatherResponse> {
        const weatherData = { main: { temp: 25 } };
        return this.mapper.toWeatherResponse(weatherData);
    }
}