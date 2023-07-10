# Coding Challenge: Create a Mini DSL

## Problem statement

Let’s create a mini DSL that makes it easier to create (correct) flights for an airport.
<br />
Notice that we’ve already defined a couple of useful types. Flights have different properties, depending on whether they’re arrivals or departures, so we have a separate type for each.
<br />
We’ve also written a smart constructor for airplane. This ensures that we can only create a valid airplane, refusing to create one with missing and essential information like the number of seats.
<br />
The `createFlight` function is another smart constructor, but it’s not yet implemented. We must accomplish the following:
1. Add the signature (parameters and types).
2. In the body, first check that all parameters are defined.
3. Return an arrival or departure flight (preferably using a switch with an `exhaustive check`).
<br />
The `application` function should help us fill in the signature of `createFlight`.

```typescript
import * as O from 'fp-ts/Option';
import {pipe} from "fp-ts/function";

type Airplane = {
    seats: number,
};

type ArrivalFlight = {
    type: 'Arrival',
    arrivalTime: Date,
    airplane: Airplane,
};

type DepartureFlight = {
    type: 'Departure'
    departureTime: Date,
    airplane: Airplane
}

type Flight = ArrivalFlight | DepartureFlight;

type KindOfFlight = 'ARRIVAL' | 'DEPARTURE';

const createAirplane = (seats: number): O.Option<Airplane> => {
    return seats && seats > 0 ? O.some({
        seats
    }) : O.none;
};
// Complete the below function
// const createFlight = ... => {
//     ...
// };

const application = (): O.Option<Flight> =>
    pipe(
        createAirplane(100),
        O.chain((res: Airplane) => createFlight('ARRIVAL', new Date())(res))
    );
```