# 09_1: Coding Challenge: Working with Flow

## Problem statement
- Complete the application function.
- Our function should use flow to build a person and enrich it with age and country, using the predefined helper functions.

## Complete the code#
```typescript
import {flow} from "fp-ts/function";
type BasicPerson = {
    name: string,
};

type PersonWithAge = BasicPerson & {
    age: number,
};

type PersonWithAgeAndCountry = PersonWithAge & {
    country: string,
}

const buildBasicPerson = (name: string): BasicPerson => ({
    name,
});

const enrichWithAge = (person: BasicPerson): PersonWithAge => ({
    ...person,
    age: person.name.length,
});

const enrichWithCountry = (person: PersonWithAge): PersonWithAgeAndCountry => ({
    ...person,
    country: 'Frediano',
});
// Complete the below function
// const application = (name: string): PersonWithAgeAndCountry => {
//    ...
// };
```

# 09_2: Coding Challenge: Working with TaskEither

## Problem statement

Complete the `application` function using the predefined functions.

The function should take the result of the `checkInput` function.

1. Call the `externalService` function, using the `errorMapper` to handle failures.
2. Uppercase the result of that call.
3. Use a `getOrElse` to prefix `We got back an error:` to any error we receive.

```typescript
import * as E from 'fp-ts/Either';
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
// const application = (input: string) => {
//     return pipe(
//         checkInput(input),
//         ...
//     )();
// };

```