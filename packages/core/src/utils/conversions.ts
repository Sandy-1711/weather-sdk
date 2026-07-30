export function celciusToFarenheit(celcius: number): number {
    return (celcius * 9 / 5) + 32;
}
export function farenheitToCelcius(farenheit: number): number {
    return (farenheit - 32) * 5 / 9;
}

export function kphToMph(kph: number): number {
    return kph * 0.621371;
}
export function mphToKph(mph: number): number {
    return mph / 0.621371;
}
export function degreesToCardinal(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
    const index = ((Math.round(degrees / 45) % 8) + 8) % 8;
    return directions[index]!;
}