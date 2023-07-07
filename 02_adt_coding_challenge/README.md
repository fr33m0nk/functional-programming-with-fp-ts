# Discriminating Unions
From [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html), we have the following example:

```typescript
type NetworkLoadingState = {
  state: "loading";
};

type NetworkFailedState = {
  state: "failed";
  code: number;
};

type NetworkSuccessState = {
  state: "success";
  response: {
    title: string;
    duration: number;
    summary: string;
  };
};

type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState;

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function logger(s: NetworkState): string {
  switch (s.state) {
    case "loading":
      return "loading request";
    case "failed":
      return `failed with code ${s.code}`;
    case "success":
      return "got response";
    default:
      return assertNever(s); // fails if we don't handle every possible state
  }
}

let networkState1:NetworkLoadingState = { state:"loading" };
let returnedValue1 = logger(networkState1);
console.log(returnedValue1);

let networkState2:NetworkFailedState = { state: "failed", code: 404 };
let returnedValue2 = logger(networkState2);
console.log(returnedValue2);

let networkState3:NetworkSuccessState = { state: "success", response: { title: "Hello World", duration: 50, summary: "This is a summary" } };
let returnedValue3 = logger(networkState3);
console.log(returnedValue3);
```

## Output

```shell
Output 2.23s

loading request
failed with code 404
got response

```

## Explanation
`Line 34`: The `assertNever` in the code snippet above will not do anything since we have covered all the cases. However, if we were to add a fourth state, it would tell us that this new state cannot be assigned to a parameter of type `never`. In this case, an error will be thrown by the `default` fallback. This is a nice example of how the type system can help us in writing and refactoring code.
`Line 30`: Another interesting thing to note is that the TypeScript did not fail on the `${s.code}` part. Thanks to the check on the state field, it knows that the type is actually `NetworkFailedState`, which has a `code` field.

# Problem statement

In this challenge, create an algebraic data type (sum type) for a vehicle. The type of vehicle will be either a `car` or a `bicycle`. A `car` will have two properties: `mileage` and `numberOfSeats`, both properties of type `number`. On the other hand, a `bicycle` has a single property called `luggageRack` of type `boolean`.