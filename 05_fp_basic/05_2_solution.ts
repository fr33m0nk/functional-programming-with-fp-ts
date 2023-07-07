import * as O from 'fp-ts/Option'

type SafeDivide = (value: number, divisor: number) => O.Option<number>
const safeDivide: SafeDivide = (value, divisor) => divisor === 0 ? O.none : O.some(value/divisor)

console.log('Failed division due to divisor: ', O.isNone(safeDivide(10, 0)))

console.log('Division successful: ', O.isSome(safeDivide(10, 3)))
O.map(x => console.log('Value is :', x))(safeDivide(10, 3))