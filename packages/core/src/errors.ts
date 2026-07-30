export class WeatherError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WeatherError";
    }
}

export class WeatherConfigurationError extends WeatherError {
    constructor(message: string) {
        super(message);
        this.name = "WeatherConfigurationError";
    }
}