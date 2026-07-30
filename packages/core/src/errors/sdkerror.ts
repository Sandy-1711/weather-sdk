export type SDKErrorCode =
    | "configuration"
    | "validation"
    | "authentication"
    | "rate_limit"
    | "provider_error"
    | "transport_error"
    | "parse_error"
    | "unknown";

export class SDKError extends Error {
    constructor(
        message: string,
        readonly code: SDKErrorCode,
        options?: {
            cause?: Error;
        }
    ) {
        super(message);

        this.name = new.target.name;
        this.cause = options?.cause;

        // Fix prototype chain (important when targeting ES5/older JS)
        Object.setPrototypeOf(this, new.target.prototype);
    }
}