# Coding Challenge: Using Reader Monad in Function

## Problem statement 

- Complete the `writeToBucket` and `writeToTable` functions. The content of `Promise.resolve` shows us what’s passed in.
- Complete the `application` function, which should pass the uppercased message first to `writeToTable` and next to `writeToBucket`
- The `application` function uses the Reader monad to pass dependencies to the write functions, which should also give us an additional clue as to what those two functions should look like.

```typescript
import {pipe} from "fp-ts/function";
import * as RT from 'fp-ts/ReaderTask'

type Dependencies = {
    bucketName: string,
    tableName: string
}

const exampleDependencies: Dependencies = {
    bucketName: 'ourBucket',
    tableName: 'ourTable'
};

const upperCaseItAgain = (message: string) => message.toUpperCase();
// Complete the below functions
// const writeToBucket = ... => {
//     return () => Promise.resolve(`Wrote '${message}' to ${dependencies.bucketName}`);
// };

// const writeToTable = ... => {
//     return () => Promise.resolve(`Wrote '${message}' to ${dependencies.tableName}`);
// };

// const application = (message: string) => {
//      return pipe(
//          message,

```