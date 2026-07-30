import { SDKError } from "./sdkerror";
export class ConfigurationError extends SDKError {
    constructor(message: string, cause?: Error) {
        super(message, "configuration", { cause });
    }
}