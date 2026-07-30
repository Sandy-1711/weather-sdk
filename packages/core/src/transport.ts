export interface HTTPRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: any;
}

export interface HTTPResponse<T> {
    status: number;
    headers: Record<string, string>;
    body: T;
}

export interface Transport {
    request<T = unknown>(request: HTTPRequest): Promise<HTTPResponse<T>>;
}