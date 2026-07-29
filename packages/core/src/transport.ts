export interface HTTPRequest {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    headers?: Record<string, string>;
    body?: any;
}

export interface HTTPResponse {
    status: number;
    headers?: Record<string, string>;
    body?: any;
}

export interface Transport {
    request(request: HTTPRequest): Promise<HTTPResponse>;
}