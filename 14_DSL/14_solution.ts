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
type CreateFlight = (typeOfFlight: KindOfFlight, date: Date) => (airplane: Airplane) => O.Option<Flight>
const createFlight: CreateFlight = (typeOfFlight, date) => airplane => {
  if (!typeOfFlight || !date || !airplane) {
    return O.none;
  }

  switch (typeOfFlight) {
    case 'ARRIVAL': {
      return O.some({
        type: 'Arrival',
        arrivalTime: date,
        airplane,
      });
    }
    case 'DEPARTURE': {
      return O.some({
        type: 'Departure',
        departureTime: date,
        airplane,
      });
    }
    default:
      const _exhaustiveCheck: never = typeOfFlight;
      return _exhaustiveCheck;
  }
}

const application = (seats: number, kindOfFlight: KindOfFlight, date: Date): (Flight | string) =>
  pipe(
    createAirplane(seats),
    O.chain(createFlight(kindOfFlight, date)),
    O.getOrElseW(() => 'No flight')
  )

console.log(application(100, "ARRIVAL",new Date()))

