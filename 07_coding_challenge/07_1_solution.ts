import {pipe} from "fp-ts/function";
import * as E from "fp-ts/Either";

const checkValidHour = (hour: number): E.Either<string, number> => {
  return hour > 0 && hour <= 24 ? E.right(hour) : E.left('invalid hour');
};

const mapToGreeting = (hour: number): string => {
  return hour < 12 ? 'good morning' : 'good afternoon';
};

const checkDecentHour = (hour: number) : E.Either<string, number> =>
  hour < 8 ? E.left('way too early') : E.right(hour)

const application = (hour: number) => {
  return pipe(
    checkValidHour(hour),
    E.chain(checkDecentHour),
    h => E.map(mapToGreeting)(h),
    E.getOrElse(err => err),
  );
};
console.log(application(5));
console.log(application(9));