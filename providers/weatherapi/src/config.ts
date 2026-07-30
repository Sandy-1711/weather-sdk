export const buildUrl = (apiKey: string, q: string): string => {
    return `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(q)}`;
}