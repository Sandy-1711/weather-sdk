import { SDKError } from "./sdkerror";
export class ValidationError extends SDKError {
    constructor(message: string, cause?: Error) {
        super(message, "validation", { cause });
    }
}