import * as E from 'fp-ts/Either';
import {pipe} from "fp-ts/function";

const checkValidHour = (hour: number): E.Either<string, number> => {
  return hour > 0 && hour <= 24 ? E.right(hour) : E.left('invalid hour');
};

const mapToGreeting = (hour: number) => {
  return hour < 12 ? 'good morning' : 'good afternoon';
};
// Write your code below

const application = (hour: number) => pipe(
  hour,
  checkValidHour,
  E.map(mapToGreeting),
  E.getOrElse(() => 'unknown greeting')
)

console.log(application(5));
console.log(application(13));
console.log(application(48));