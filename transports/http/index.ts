import type { Transport, HTTPRequest, HTTPResponse } from '@repo/core';
export class HttpTransport implements Transport {
    async request<T = unknown>(request: HTTPRequest): Promise<HTTPResponse<T>> {
        const response = await fetch(request.url, {
            method: request.method,
            body: request.body,
            headers: request.headers,
        });
        const body = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP request failed with status ${response.status}: ${body}`);
        }
        return { status: 'success', data: body as T };
    }
}