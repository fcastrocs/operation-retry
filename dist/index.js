"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Operation {
    constructor(options) {
        this.currentAttempt = 0;
        this.usedNewConfig = false;
        this.validateOptions(options);
        this.retries = options.retries;
        this.interval = options.interval;
        this.noDelay = options.noDelay ?? false;
    }
    /**
     * Attempt operation
     */
    attempt(operation) {
        this.operation = operation;
        this.execute();
    }
    /**
     * retry operation after failure. Operation won't be retried if this is not called.
     */
    retry() {
        if (this.currentAttempt <= this.retries) {
            this.execute();
        }
    }
    /**
     * Set a new config while still attempting an operation.
     * Calling this method only has effect once to avoid infinite retries.
     * Retries do not add up. Number passed is the number of times the operation will be attempted going forward.
     */
    setNewConfig(options) {
        if (this.usedNewConfig)
            return;
        this.validateOptions(options);
        this.usedNewConfig = true;
        this.currentAttempt = 1;
        this.retries = options.retries;
        this.interval = options.interval;
    }
    execute() {
        if (this.currentAttempt === 0 && this.noDelay) {
            this.currentAttempt++;
            return this.operation(this.currentAttempt);
        }
        setTimeout(async () => {
            this.currentAttempt++;
            this.operation(this.currentAttempt);
        }, this.interval);
    }
    validateOptions(options) {
        if (options.retries < 0) {
            throw Error("retries must be greater than 0.");
        }
        if (options.interval < 1000) {
            throw Error("interval must be 1000 or greater.");
        }
    }
}
exports.default = Operation;
