import * as E from 'fp-ts/Either'
import {UserRegistrationDto} from './domain_types'

/*
* Below shows how Either can be used to perform validations
* This causes short circuit as soon as any error occurs
*/

export type FieldValidation = (userRegDTO: UserRegistrationDto) => E.Either<string, UserRegistrationDto>;
export type ValidateAge = FieldValidation;
export type ValidateGender = FieldValidation;

export const fieldsNotEmptyV1: FieldValidation = userRegDTO =>
  userRegDTO.firstName && userRegDTO.lastName && userRegDTO.age && userRegDTO.sex && userRegDTO.country ?
    E.right(userRegDTO) : E.left('Not all required fields were filled in.')

export const validateAgeV1: ValidateAge = userRegDTO =>
  userRegDTO.age < 18 || userRegDTO.age >= 150 ?
    E.left(`Received an invalid age of ${userRegDTO.age}`) :
    E.right(userRegDTO)

export const validateGenderV1: ValidateGender = userRegDTO =>
  userRegDTO.sex === 'M' || userRegDTO.sex === 'F' || userRegDTO.sex === 'X' ?
    E.right(userRegDTO) : E.left(`Received an invalid sex ${userRegDTO.sex}`)

/*
* Below shows how Validation specific Either can be used to perform validations
* Prime difference being, Validation specific either will collect all errors
*/

import {NonEmptyArray} from 'fp-ts/NonEmptyArray'

type Validation = (userRegDTO: UserRegistrationDto) => E.Either<NonEmptyArray<string>, UserRegistrationDto>

export const fieldsNotEmptyV2: Validation = userRegDTO =>
  userRegDTO.firstName && userRegDTO.lastName && userRegDTO.age && userRegDTO.sex && userRegDTO.country ?
    E.right(userRegDTO) : E.left(['Not all required fields were filled in.'])

export const validateAgeV2: Validation = userRegDTO =>
  userRegDTO.age < 18 || userRegDTO.age >= 150 ?
    E.left([`Received an invalid age of ${userRegDTO.age}`]) :
    E.right(userRegDTO)

export const validateGenderV2: Validation = userRegDTO =>
  userRegDTO.sex === 'M' || userRegDTO.sex === 'F' || userRegDTO.sex === 'X' ?
    E.right(userRegDTO) : E.left([`Received an invalid sex ${userRegDTO.sex}`])

export const validationNotGerman: Validation =  userRegDTO =>
  userRegDTO.country === 'Germany' ? E.left(['We don\'t like Germany around here']) :
    E.right(userRegDTO)

