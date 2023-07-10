import * as TE from 'fp-ts/TaskEither'
import {pipe} from 'fp-ts/function'

type FetchError = {
  _tag: 'FetchError'
  error: Error
}

type JSONError = {
  _tag: 'JSONError'
  error: Error
}

export type NetworkError = FetchError | JSONError

export const safeFetch = (init: FetchRequestInit) => (url: string|URL): TE.TaskEither<FetchError, Response> => TE.tryCatch(
  () => fetch(url, init),
  (error): FetchError => error instanceof Error ? {
    _tag: 'FetchError',
    error: error
  } : {
    _tag: 'FetchError',
    error: new Error(String(error))
  },
)

export const parseJson = (response: Response): TE.TaskEither<JSONError, unknown> => TE.tryCatch(
  () => response.json(),
  (error): JSONError => error instanceof Error ? {
    _tag: 'JSONError',
    error: error
  } : {
    _tag: 'JSONError',
    error: new Error(String(error))
  }
)
