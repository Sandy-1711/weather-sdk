import type { Transport, HTTPRequest, HTTPResponse } from '@repo/core';
export class HttpTransport implements Transport {
    async request(request: HTTPRequest): Promise<HTTPResponse> {
        const response = await fetch(request.url, {
            method: request.method,
            body: request.body,
            headers: request.headers,
        });
        const body = await response.json();
        if (!response.ok) {
            return {
                status: 'error',
                error: body.message || 'Unknown error',
            }
        }
        return {
            status: 'success',
            data: body,
        };
    }
}