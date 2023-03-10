A very simple failed operation retry module.
Originally forked from https://github.com/tim-kos/node-retry

## Installation

    npm install @fcastrocs/retry

## constructor

### new Operation(options: { retries: number; interval: number; noDelay?: boolean})

create a new OperationRetry object

- `retries`: How many times to retry an opearation after it failed once.
- `interval`: The interval between retries (in milliseconds)
- `noDelay`: Whether to delay the first operation attempt.

## Methods

### attempt(operation: (currentAttempt: number))

- `operation`: The callback (operation) that needs to be retried on failures
- `currentAttempt`: Holds the current operation attempt.

### retry()

To be called in the callback (operation) passed in the attempt() method. The operation won't be retried if this is not called.
Returns true when operation will be attempted again, false if exhausted all retries

### setNewConfig(options: { retries: number; interval: number; }

To be called in the callback (operation) passed in the attempt() method.
Sets a new config to the OperationRetry instance. This is useful when the config needs before exhausting all the retries.
Calling this method only has effect once to avoid infinite retries.
Retries do not add up. Number passed is the number of times the operation will be attempted going forward.

- `options`: same as options passed in the constructor.
