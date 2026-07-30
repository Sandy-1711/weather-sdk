import { SDKError, SDKErrorCode } from "./sdkerror";

export class TransportError extends SDKError {
    constructor(
        message: string,
        cause?: Error,
        code: SDKErrorCode = "transport_error"
    ) {
        super(message, code, { cause });
    }
}
export class NetworkError extends TransportError {
    constructor(message: string, cause?: Error) {
        super(message, cause, "network_error");
    }
}

export class ParseError extends TransportError {
    constructor(message: string, cause?: Error) {
        super(message, cause, "parse_error");
    }
}
export class HttpError extends TransportError {
    constructor(
        readonly status: number,
        readonly headers: Record<string, string>,
        readonly body: unknown,
        message: string = `HTTP ${status}`
    ) {
        super(message, undefined, "http_error");
    }
}
