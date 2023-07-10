# Coding Challenge: Using Sequence in Function

## Problem statement


- Complete the `application` function by using the code below, which should use the given `eitherSequence` to check all requirements simultaneously.
- **Note that** `sequenceT` uses `E.Apply` to get the right sequence. Some course examples used `E.either`, which still works but is now deprecated.


```typescript
import * as E from 'fp-ts/Either';
import {sequenceT} from "fp-ts/lib/Apply";
import {pipe} from "fp-ts/function";

const eitherSequence = sequenceT(E.Apply);

type Airplane = {
    crew: number,
    fuel: number,
    onFire: boolean
};

const checkEnoughCrew = (airplane: Airplane): E.Either<string, Airplane> => airplane.crew >= 2 ? E.right(airplane) : E.left('Needs more crew members')

const checkEnoughFuel = (airplane: Airplane): E.Either<string, Airplane> => airplane.fuel > 1000 ? E.right(airplane) : E.left('Not enough fuel')

const checkNotOnFire = (airplane: Airplane): E.Either<string, Airplane> => airplane.onFire === false ? E.right(airplane) : E.left('Eh. The airplane is on fire');
// Complete the below function
// const application = (airplane: Airplane) => {
//     return pipe(
//         ...
//         E.map((res: Airplane[]) => res[0]),
//     );
// };
//console.log(application({crew:5,fuel:6,onFire:true}));
```