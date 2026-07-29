export interface HTTPRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: any;
}

export type HTTPResponse =
    | { status: 'error'; error: string }
    | { status: 'success'; data: Record<string, any> };

export interface Transport {
    request(request: HTTPRequest): Promise<HTTPResponse>;
}