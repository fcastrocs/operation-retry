declare class OperationRetry {
    private retries;
    private interval;
    private currentAttempt;
    private noDelay;
    private usedNewConfig;
    private operation;
    constructor(options: {
        retries: number;
        interval: number;
        noDelay?: boolean;
    });
    /**
     * Attempt operation
     */
    attempt(operation: (currentAttempt: number) => void): void;
    /**
     * retry operation after failure. Operation won't be retried if this is not called.
     */
    retry(): void;
    /**
     * Set a new config while still attempting an operation.
     * Calling this method only has effect once to avoid infinite retries.
     * Retries do not add up. Number passed is the number of times the operation will be attempted going forward.
     */
    setNewConfig(options: {
        retries: number;
        interval: number;
    }): void;
    private execute;
    private validateOptions;
}
