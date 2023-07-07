import * as E from 'fp-ts/Either'
import {pipe} from 'fp-ts/function'
import {UserRegistrationDto} from './domain_types'
import {
  fieldsNotEmptyV1, validateAgeV1, validateGenderV1,
  fieldsNotEmptyV2, validateAgeV2, validateGenderV2
} from './validation'

/*
* This demonstrates how Either type can be used to perform validation and
* how `chain` can prevent nesting of Monadic types
*/

const successfulEvent: UserRegistrationDto = {
  firstName: 'Test',
  lastName: 'McTestFace',
  sex: 'M',
  age: 18,
  country: 'Belgium',
}

const erroredEvent: UserRegistrationDto = {
  firstName: 'Test',
  lastName: 'McTestFace',
  sex: 'I',
  age: 17,
  country: 'Germany',
}

const resultV1 = (userRegDTO: UserRegistrationDto) => pipe(
  userRegDTO,
  fieldsNotEmptyV1,
  E.chain(validateAgeV1),
  E.chain(validateGenderV1)
)

console.log('Success from V1 Validator with Either ', resultV1(successfulEvent))
console.log('Failure from V1 Validator with Either ', resultV1(erroredEvent))

/*
* This demonstrates how Validation specific Either type can be used to perform validation and
* how `chain` can prevent nesting of Monadic types
* This Validation specific Either type collects all the Validation failures
*/

import {sequenceT} from 'fp-ts/Apply'
import {getSemigroup} from "fp-ts/NonEmptyArray";
import * as O from "fp-ts/Option";

const applicativeValidation = E.getApplicativeValidation(getSemigroup<string>());

const resultV2 = (userRegDTO: UserRegistrationDto) => pipe(
  userRegDTO,
  userRegDTO => sequenceT(applicativeValidation)(
    fieldsNotEmptyV2(userRegDTO),
    validateAgeV2(userRegDTO),
    validateGenderV2(userRegDTO)
  ),
  E.map(([first]) => first)
)

console.log('Success from V2 Validator with Either ', resultV2(successfulEvent))
console.log('Failure from V2 Validator with Either ', resultV2(erroredEvent))

/*
* Lifting example
* Lifting means a function that works with non monadic values
* to work with monadic values
* e.g. f -> A -> B -> C
* lifting enables to
* lift f -> FA -> FB -> FC
*  */
import {prismPositiveInteger} from 'newtype-ts/lib/PositiveInteger'
import {firstNameIso, lastNameIso} from './domain_types'
import {findGender, findRegion, parseUser} from './domain_functions'

const sequenceForOption = sequenceT(O.Apply);

const user = (userRegDTO: UserRegistrationDto) => pipe(
  userRegDTO,
  userRegDTO => sequenceForOption(
    O.some(firstNameIso.wrap(userRegDTO.firstName)),
    O.some(lastNameIso.wrap(userRegDTO.lastName)),
    prismPositiveInteger.getOption(userRegDTO.age),
    findGender(userRegDTO.sex),
    findRegion(userRegDTO.country),
  ),
  O.map(([f, l, a, g, c]) => parseUser(f, l, a, g, c))
);

console.log('Mapped user from Lifting', user(successfulEvent))
console.log('Unmapped user from Lifting', user(erroredEvent))

/*
* Everything tied up together as a handler
* */
import {createUserHandler} from './domain_functions'

console.log('Successful Response from handler', createUserHandler(successfulEvent))
console.log('Failure Response from handler', createUserHandler(erroredEvent))



