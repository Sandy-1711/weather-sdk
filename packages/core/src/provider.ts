import { WeatherResponse, WeatherRequest } from "./types";

export interface WeatherProvider {
    readonly name: string;
    current: (request: WeatherRequest) => Promise<WeatherResponse>;
}