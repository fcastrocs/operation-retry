class OperationRetry {
  private retries: number;
  private interval: number;
  private currentAttempt = 0;
  private noDelay: boolean;
  private usedNewConfig = false;
  private operation: (currentAttempt: number) => void;

  constructor(options: { retries: number; interval: number; noDelay?: boolean }) {
    this.validateOptions(options);
    this.retries = options.retries;
    this.interval = options.interval;
    this.noDelay = options.noDelay ?? false;
  }

  /**
   * Attempt operation
   */
  public async attempt(operation: (currentAttempt: number) => void) {
    this.operation = operation;
    this.execute();
  }

  /**
   * retry operation after failure. Operation won't be retried if this is not called.
   */
  public retry() {
    if (this.currentAttempt <= this.retries) {
      this.execute();
    }
  }

  /**
   * Set a new config while still attempting an operation.
   * Calling this method only has effect once to avoid infinite retries.
   * Retries do not add up. Number passed is the number of times the operation will be attempted going forward.
   */
  public setNewConfig(options: { retries: number; interval: number }) {
    if (this.usedNewConfig) return;
    this.validateOptions(options);
    this.usedNewConfig = true;
    this.currentAttempt = 1;
    this.retries = options.retries;
    this.interval = options.interval;
  }

  private execute() {
    if (this.currentAttempt === 0 && this.noDelay) {
      this.currentAttempt++;
      return this.operation(this.currentAttempt);
    }

    setTimeout(async () => {
      this.currentAttempt++;
      this.operation(this.currentAttempt);
    }, this.interval);
  }

  private validateOptions(options: { retries: number; interval: number; noDelay?: boolean }) {
    if (options.retries < 0) {
      throw Error("retries must be greater than 0.");
    }

    if (options.interval < 1000) {
      throw Error("interval must be 1000 or greater.");
    }
  }
}
