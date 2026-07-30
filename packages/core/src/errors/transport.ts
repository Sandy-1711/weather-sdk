import { SDKError, SDKErrorCode } from "./sdkerror";
export class TransportError extends SDKError {
    constructor(
        message: string,
        code: SDKErrorCode = "transport_error",
        cause?: Error
    ) {
        super(message, code, { cause });
    }
}