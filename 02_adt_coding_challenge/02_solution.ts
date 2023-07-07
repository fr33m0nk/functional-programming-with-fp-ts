type Bike = {
  _tag: 'Bike'
  luggageRack: boolean
}

type Car = {
  _tag: 'Car'
  mileage: number
  numberOfSeats: number
}

type Vehicle = Bike | Car

type AssertNever = (x: never) => never
const assertNever: AssertNever = x => {
  throw new Error("Unexpected object: " + x)
}

type Logger = (v: Vehicle) => string
const logger: Logger = v => {
  switch (v._tag) {
    case 'Bike':
      return `Bike has ${v.luggageRack}`;
    case 'Car':
      return `Car has ${v.numberOfSeats} seats and mileage of ${v.mileage}`;
    default:
      return assertNever(v); // fails if we don't handle every possible state
  }
}

const car: Vehicle = {
  _tag: 'Car',
  mileage: 10,
  numberOfSeats: 5
}
console.log(logger(car))

const bike: Vehicle = {
  _tag: 'Bike',
  luggageRack: true
}
console.log(logger(bike))