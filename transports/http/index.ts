import { TransportError } from '@repo/core';
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
            throw new TransportError(
                `${request.method} ${request.url} failed before a response was received`,
                'transport_error',
                error as Error
            );
        }

        let body: unknown;

        try {
            body = await response.json();
        } catch (error) {
            throw new TransportError(
                "Failed to parse response body",
                "parse_error",
                error as Error
            );
        }

        if (!response.ok) {
            throw new TransportError(
                `HTTP ${response.status}`,
                "transport_error"
            );
        }

        return {
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            body: body as T,
        };
    }
}