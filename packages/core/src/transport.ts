export interface HTTPRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: any;
}

export type HTTPResponse<T = unknown> =
    | { status: 'success'; data: T };

export interface Transport {
    request<T = unknown>(request: HTTPRequest): Promise<HTTPResponse<T>>;
}