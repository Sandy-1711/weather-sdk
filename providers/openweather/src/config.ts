export function getBaseUrl(lat: number, lon: number, apiKey: string): string {
    return `https://api.openweathermap.org/data/4.0/onecall/current?lat=${lat}&lon=${lon}&appid=${apiKey}`;
}