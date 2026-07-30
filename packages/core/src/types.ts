export type Location = {
    type: 'coordinates';
    lat: number;
    lon: number;
} | {
    type: 'city';
    name: string;
}

export type Units = 'metric' | 'imperial' | 'standard';

export const DEFAULT_UNITS: Units = 'metric';

export interface WeatherRequest {
    location: Location;
    // Optional units for the weather data (default is 'metric')
    units?: Units;
    language?: string;
}
export interface WeatherResponse {
    // Temperature in the specified units (°C for metric, °F for imperial, K for standard)
    temperature: number;
    // Wind speed in the specified units (m/s for standard, km/h for metric, mph for imperial)
    wind_speed: number;
    // Wind direction in cardinal directions (N, NE, E, SE, S, SW, W, NW)
    wind_direction: string;
    // Humidity percentage (0-100)
    humidity: number;
}