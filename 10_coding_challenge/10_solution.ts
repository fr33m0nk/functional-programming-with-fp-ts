import * as E from 'fp-ts/Either';
import {sequenceT} from "fp-ts/Apply";
import {pipe} from "fp-ts/function";

type Airplane = {
  crew: number,
  fuel: number,
  onFire: boolean
};

const validateName = E.fromPredicate(
  (string: string) => /[a-zA-z]/.test(string),
  (name) => `"${name}" is not a valid name!`
);

const checkEnoughCrew = E.fromPredicate((airplane: Airplane) => airplane.crew >= 2, () => 'Needs more crew members')

const checkEnoughFuel = E.fromPredicate((airplane: Airplane) => airplane.fuel > 1000, () => 'Not enough fuel')

const checkNotOnFire = E.fromPredicate((airplane: Airplane) => !airplane.onFire, () => 'Eh. The airplane is on fire')

const eitherSequence = sequenceT(E.Apply);

// Complete the below function
const application = (airplane: Airplane) => {
  return pipe(
    eitherSequence(
      checkEnoughCrew(airplane),
      checkEnoughFuel(airplane),
      checkNotOnFire(airplane)
    ),
    E.map((res: Airplane[]) => res[0])
  )
}

const testAirplaneFailure: Airplane = {crew: 5, fuel: 999, onFire: true}
const testAirplaneSuccess: Airplane = {crew: 5, fuel: 1001, onFire: false}


console.log('Failure: ', application(testAirplaneFailure))
console.log('Success: ', application(testAirplaneSuccess))