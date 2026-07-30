import { HttpError, NetworkError, ParseError } from '@repo/core';
import type { Transport, HTTPRequest, HTTPResponse } from '@repo/core';

export class HttpTransport implements Transport {
    async request<T = unknown>(request: HTTPRequest): Promise<HTTPResponse<T>> {
        let response: Response;

        try {
            response = await fetch(request.url, {
                method: request.method,
                body: request.body,
                headers: request.headers,
            });
        } catch (error) {
            throw new NetworkError(
                `${request.method} ${request.url} failed before a response was received`,
                error as Error
            );
        }

        const headers = Object.fromEntries(response.headers.entries());

        let raw: string;

        try {
            raw = await response.text();
        } catch (error) {
            throw new NetworkError(
                `${request.method} ${request.url} failed while reading the response body`,
                error as Error
            );
        }

        if (!response.ok) {
            // Error bodies are frequently not JSON (proxy HTML, empty 502s), so
            // the status must survive even when the body cannot be decoded.
            throw new HttpError(response.status, headers, decode(raw) ?? raw);
        }

        let body: unknown;

        try {
            body = JSON.parse(raw);
        } catch (error) {
            throw new ParseError(
                'Failed to parse response body',
                error as Error
            );
        }

        return {
            status: response.status,
            headers,
            body: body as T,
        };
    }
}

function decode(raw: string): unknown {
    try {
        return JSON.parse(raw);
    } catch {
        return undefined;
    }
}
