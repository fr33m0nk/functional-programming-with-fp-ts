import * as E from 'fp-ts/Either';
import * as ET from 'fp-ts/EitherT';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import {pipe} from "fp-ts/function";

const checkInput = (input: string) => input === 'invalid' ? E.left('Invalid input') : E.right(input);

const externalService = (input: string) => {
  if (input === 'error') {
    return Promise.reject('Call to external service failed');
  }
  return Promise.resolve('result');
};

const errorMapper = (err: unknown) => err;

const toUpperCase = (input: string) => input.toUpperCase();
// Complete the below function
const application = (input: string): T.Task<string>  => {
    return pipe(
        checkInput(input),
        TE.fromEither,
        TE.chain(input => TE.tryCatch(
          () => externalService(input),
          errorMapper
        )),
      TE.map(toUpperCase),
      TE.getOrElse(err => T.of(`We got back an error: ${err}`))
    );
}

// Input validation failure
application('invalid')().then(s => console.log('success ', s))

// Network IO failure
application('error')().then(s => console.log('success ', s))

// All good
application('Old monk')().then(s => console.log('success ', s))