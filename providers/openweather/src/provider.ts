import { WeatherProvider, WeatherRequest, WeatherResponse } from '@repo/core';
import { OpenWeatherMapper } from './mapper';
export class OpenWeatherProvider implements WeatherProvider {
    readonly name = 'OpenWeather';

    constructor(private mapper: OpenWeatherMapper) { }
    async current(request: WeatherRequest): Promise<WeatherResponse> {
        const weatherData = {
            "lat": 51.5,
            "lon": -0.1,
            "timezone": "Europe/London",
            "timezone_offset": 3600,
            "data":
            {
                "dt": 1777449371,
                "sunrise": 1777437375,
                "sunset": 1777490344,
                "temp": 286.42,
                "feels_like": 285.32,
                "pressure": 1024,
                "humidity": 58,
                "dew_point": 278.34,
                "uvi": 1.55,
                "clouds": 0,
                "visibility": 10000,
                "wind_speed": 8.23,
                "wind_deg": 70,
                "weather": {
                    "id": 800,
                    "main": "Clear",
                    "description": "sky is clear",
                    "icon": "01d"
                }
                ,
                "alerts": [
                    "8B46C632-DCA7-44D7-8BDF-02445621BAFF",
                    "29F58A35-BB91-4A73-9F46-9FC64BDF604F",
                ]
            }

        }
        return this.mapper.toWeatherResponse(weatherData);
    }
}