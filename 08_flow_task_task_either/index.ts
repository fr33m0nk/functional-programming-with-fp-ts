import {pipe, flow} from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'

const aPromise = async () => 42

/*
* A Promise that never fails is essentially a Task
* Task donot have the notion of failed computation
* Task signifies something asynchronous but will provide succeed
* */
const aTask: T.Task<number> = aPromise

/*
* Now we can map over it
* */

const incrementBy = (by: number) => (n: number) => n + by

const mappingOverTask = pipe(
  aTask,
  T.map(incrementBy(10))
)

/*
* Asynchronous functions can also fail
* and they are handled by TaskEither
* */

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

/*
* Below `TE.tryCatch` works but the error type is lost
* */
const aTaskThatMayFail = (n: number) => TE.tryCatch(
  () => divideBy(10)(n),
  (error) => error
)

/*
* To get back the error type, we have to use `mapLeft`
* */
const mappingOverTaskEither = pipe(
  aTaskThatMayFail(20),
  TE.map(incrementBy(10)),
  TE.mapLeft(e => e instanceof DivideByZeroError ? e : new DivideByZeroError(E.toError(e)))
)

/*
* We can also use biMap to map error and success values at once
* and E.toError = (e: unknown) => e instanceof Error ? e : new Error(String(e))
* */
const mappingOverTaskEitherV2 = pipe(
  aTaskThatMayFail(20),
  TE.bimap(
    (e) => e instanceof DivideByZeroError ? e : new DivideByZeroError(E.toError(e))
    , incrementBy(10)
  )
)

/*
* `Try Catch K ` lets us preserve the error Type information
* as the mapping to a suitable error type can be done Task definition
* */
const aTaskThatMayFailV2 = TE.tryCatchK(
  divideBy(10),
  e => e instanceof DivideByZeroError ? e : new DivideByZeroError(E.toError(e))
)

const mappingOverTaskEitherV3 = pipe(
  aTaskThatMayFailV2(20),
  TE.map(incrementBy(10)
  )
)

/*
* Tasks can be executed in parallel as well
* */
import {sequenceT} from "fp-ts/Apply";

const runTasksInParallel = sequenceT(TE.ApplyPar)(
  mappingOverTaskEither,
  mappingOverTaskEitherV2,
  mappingOverTaskEitherV3
)

/*
* Synchronous side effects should be wrapped in IO Monad
* now() or randomNumber functions are non-deterministic yet synchronous
* and  thus should be wrapped in IO monad
*
* */
const getCurrentDate = () => new Date()

import * as IO from 'fp-ts/IO'

const getCurrentDateIO = IO.of(getCurrentDate())

const mapIODate = pipe(
  getCurrentDateIO,
  IO.map(x => x.toDateString())
)

  /**
   * Monoids
   */
import {identity} from 'fp-ts/function'
import {concatAll, Monoid, struct} from 'fp-ts/Monoid'
import {MonoidSum} from 'fp-ts/number'
import * as A from 'fp-ts/Array'

const numbers = [
  [3, 2, 9, 0, 8, 5, 6, 4, 1, 7],
  [6, 9, 8, 3, 2, 1, 7, 0, 4, 5],
  [0, 7, 5, 4, 1, 8, 6, 3, 2, 9]
]

const sum = concatAll(MonoidSum)(A.flatten(numbers))
console.log('Sum is ', sum)

type Status = 'ERR' | 'WARN' | 'OK'

// Custom monoid description manually
const statusMonoid: Monoid<Status> = {
  concat: (x, y) =>
    x === 'ERR' || y === 'ERR' ? 'ERR'
      : (x === 'WARN' || y === 'WARN' ? 'WARN' : 'OK'),
  empty: 'OK'
};

// Custom monoid description manually
const messageMonoid: Monoid<string> = {
  concat: (x, y) => (x + ' ' + y).trim(),
  empty: '',
};

type ReducedStats = {
  readonly status: Status,
  readonly message: string,
}

// Custom monoid description
const ReducedStatsMonoid: Monoid<ReducedStats> = struct({
  status: statusMonoid,
  message: messageMonoid
});

