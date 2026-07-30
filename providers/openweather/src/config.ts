import { OpenWeatherRequest } from './mapper';

export function getBaseUrl(request: OpenWeatherRequest, apiKey: string): string {
    const params = new URLSearchParams({
        lat: String(request.lat),
        lon: String(request.lon),
        units: request.units,
        appid: apiKey,
    });
    if (request.lang) {
        params.set('lang', request.lang);
    }
    return `https://api.openweathermap.org/data/4.0/onecall/current?${params.toString()}`;
}
