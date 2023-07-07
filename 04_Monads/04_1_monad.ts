import * as O from 'fp-ts/Option'

type UpperCaseIt = (s: string) => string
const upperCaseIt: UpperCaseIt = s => s.toUpperCase()
// Constructs Some<string>
const optionWithAString = O.some('a value');
// Constructs None<string>
const optionEmpty = O.none;
// Functor map which takes :
// 1. f: (a: A) => B
// 2. Functor<A>, where Functor is Option in this case
const upperCased = O.map(upperCaseIt)(optionWithAString)
const upperCasedEmpty = O.map(upperCaseIt)(optionEmpty)

console.log(O.getOrElse(() => 'no value present')(upperCased))
console.log(O.getOrElse(() => 'no value present')(upperCasedEmpty))

type UpperCaseSam = (name: string) => O.Option<string>
const upperCaseSam: UpperCaseSam = name => name === 'Sam' ? O.some(name.toUpperCase()) : O.none
const optionWithNameSam = O.some('Sam')
const optionWithNameSmith = O.some('Smith')
const justAName: string = 'James Bronco'

// chain lifts the supplied function and unwraps the value in the Monad type and applies function f
// e.g. `upperCaseSam` accepts and works with string parameter type and produces an Option<string>
// however, when wrapped in chain e.g.
// `O.chain(upperCaseSam)`, the returned function now accepts Option<string>
// It also flattend the result Option<Option<string>> to Option<string>
// O.map would have resulted in Option<Option<string>>
const upperCasedSamEmpty = upperCaseSam(justAName);
const upperCasedName = O.chain(upperCaseSam)(optionWithNameSam);
const noneUpperCasedName = O.chain(upperCaseSam)(optionWithNameSmith);
const blabla = O.map((x: string) => upperCaseSam(x))(optionWithNameSam)

console.log(O.getOrElse(() => 'no value present')(upperCasedName));
console.log(O.getOrElse(() => 'no value present')(noneUpperCasedName));