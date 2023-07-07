# 07_1: Coding Challenge: Adding a Check

Suppose we’re working on the application from the last challenge. We want to extend it with an additional function called `checkDecentHour`, which takes a `number` and returns a `left` with the `way too early` string when the hour is before 8. In our application function, we now want to check whether it’s way too early after checking whether the hour is valid. Instead of returning a default error message as we did earlier, we want to give back whatever error we had.

```typescript
import {pipe} from "fp-ts/function";
import * as E from "fp-ts/Either";

const checkValidHour = (hour: number): E.Either<string, number> => {
    return hour > 0 && hour <= 24 ? E.right(hour) : E.left('invalid hour');
};

const mapToGreeting = (hour: number): string => {
    return hour < 12 ? 'good morning' : 'good afternoon';
};

const application = (hour: number) => {
    return pipe(
        checkValidHour(hour),
        h => E.map(mapToGreeting)(h),
        E.getOrElse(() => 'unknown greeting'),
    );
};
console.log(application(5));
console.log(application(9));
```

# 07_2: Coding Challenge: Working with Either and Pipe

Given the two functions below, create a function called `application` that takes a single parameter, `hour`, of type `number` and uses `pipe()` to: Check whether the hour is valid using the `checkValidHour` function. Change valid hours to the proper greeting using the `mapToGreeting` function. Fall back to `unknown greeting` when the hour is invalid.

```typescript
import * as E from 'fp-ts/Either';
import {pipe} from "fp-ts/function";

const checkValidHour = (hour: number): E.Either<string, number> => {
    return hour > 0 && hour <= 24 ? E.right(hour) : E.left('invalid hour');
};

const mapToGreeting = (hour: number) => {
    return hour < 12 ? 'good morning' : 'good afternoon';
};
// Write your code below

```