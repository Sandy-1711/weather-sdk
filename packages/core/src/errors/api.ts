import { SDKError, SDKErrorCode } from "./sdkerror";
export class APIError extends SDKError {
    constructor(
        readonly provider: string,
        message: string,
        code: SDKErrorCode,
        readonly status?: number,
        cause?: Error
    ) {
        super(message, code, { cause });
    }
}