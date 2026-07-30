import { Units } from '../types';

export function celciusToFarenheit(celcius: number): number {
    return (celcius * 9 / 5) + 32;
}
export function farenheitToCelcius(farenheit: number): number {
    return (farenheit - 32) * 5 / 9;
}
export function celciusToKelvin(celcius: number): number {
    return celcius + 273.15;
}
export function kelvinToCelcius(kelvin: number): number {
    return kelvin - 273.15;
}

export function kphToMph(kph: number): number {
    return kph * 0.621371;
}
export function mphToKph(mph: number): number {
    return mph / 0.621371;
}
export function kphToMs(kph: number): number {
    return kph / 3.6;
}
export function msToKph(ms: number): number {
    return ms * 3.6;
}

export function temperatureFromCelcius(celcius: number, units: Units): number {
    switch (units) {
        case 'metric':
            return celcius;
        case 'imperial':
            return celciusToFarenheit(celcius);
        case 'standard':
            return celciusToKelvin(celcius);
    }
}

export function speedFromKph(kph: number, units: Units): number {
    switch (units) {
        case 'metric':
            return kph;
        case 'imperial':
            return kphToMph(kph);
        case 'standard':
            return kphToMs(kph);
    }
}
export function degreesToCardinal(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
    const index = ((Math.round(degrees / 45) % 8) + 8) % 8;
    return directions[index]!;
}