# Task
- A Task is a asynchronous procedure that never fails
- Task donot have the notion of failed computation
- Task signifies something asynchronous but will provide result
```typescript
import * as T from 'fp-ts/Task'

const incrementBy = (by: number) => (n: number) => n + by


// example async task that never fails
const aPromise = async () => 42



// Task == a yet to be started Promise 
const aTask: T.Task<number> = aPromise

// Now we can map over it
const mappingOverTask = pipe(
  aTask,
  T.map(incrementBy(10))
)
```

# TaskEither
- Asynchronous functions that can fail are better handled by TaskEither

```typescript
import * as TE from 'fp-ts/TaskEither'

class DivideByZeroError {
  readonly _tag = 'DivideByZeroError'

  constructor(readonly error: Error) {
  }
}

const divideBy = (denominator: number) => async (numerator: number) => {
  if (denominator === 0) {
    throw new DivideByZeroError(new Error(`denominator is ${denominator}`))
  } else {
    return numerator / denominator
  }
}

// Below `TE.tryCatch` works but the error type is lost
const aTaskThatMayFail = (n: number) => TE.tryCatch(
  () => divideBy(10)(n),
  (error) => error
)

// To get back the error type, we have to use `TE.mapLeft`
const mappingOverTaskEither = pipe(
  aTaskThatMayFail(20),
  TE.map(incrementBy(10)),
  TE.mapLeft(e => e instanceof DivideByZeroError ? e : new DivideByZeroError(E.toError(e)))
)

// We can also use biMap to map error and success values at once
// and E.toError = (e: unknown) => e instanceof Error ? e : new Error(String(e))

const mappingOverTaskEitherV2 = pipe(
  aTaskThatMayFail(20),
  TE.bimap(
    (e) => e instanceof DivideByZeroError ? e : new DivideByZeroError(E.toError(e))
    , incrementBy(10)
  )
)

// `Try Catch K ` lets us preserve the error Type information
// as the mapping to a suitable error type can be done Task definition
const aTaskThatMayFailV2 = TE.tryCatchK(
  divideBy(10),
  e => e instanceof DivideByZeroError ? e : new DivideByZeroError(E.toError(e))
)

const mappingOverTaskEitherV3 = pipe(
  aTaskThatMayFailV2(20),
  TE.map(incrementBy(10)
  )
)
```

# Composition of tasks for Parallel task execution

```typescript
import {sequenceT} from "fp-ts/Apply";
const runTasksInParallel = sequenceT(TE.ApplyPar)(
  mappingOverTaskEither,
  mappingOverTaskEitherV2,
  mappingOverTaskEitherV3
)
```

# Synchronous side effects
- Synchronous side effects should be wrapped in IO Monad
- `now()` or `randomNumber` functions are non-deterministic yet synchronous and  thus should be wrapped in IO monad

```typescript
import * as IO from 'fp-ts/IO'

const getCurrentDate = () => new Date()

const getCurrentDateIO = IO.of(getCurrentDate())

const mapIODate = pipe(
  getCurrentDateIO,
  IO.map(x => x.toDateString())
)
```

# TaskEither from Option, Either
- Use `TE.fromEither` to perform Either -> TaskEither Monad transformation
- Similar functions exist in all Monad Typeclasses