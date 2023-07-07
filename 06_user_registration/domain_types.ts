export type UserRegistrationDto = {
  firstName: string,
  lastName: string,
  age: number,
  sex: string,
  country: string,
}

export type Gender = 'M' | 'F' | 'X';

export type Europe = {
  readonly _tag: 'Europe',
}
export type NorthAmerica = {
  readonly _tag: 'NorthAmerica',
}
export type Other = {
  readonly _tag: 'Other',
}

export type Region = Europe | NorthAmerica | Other;

import {iso, Newtype} from 'newtype-ts'
import {PositiveInteger} from 'newtype-ts/lib/PositiveInteger'

/*
  New types are defined below
  These are not just type aliases to `string`
*/
export interface FirstName
  extends Newtype<{ readonly FirstName: unique symbol }, string> {}

export interface LastName
  extends Newtype<{ readonly LastName: unique symbol }, string> {}

/*
  `iso` is used to convert new types to string and vice versa
*/

export const firstNameIso = iso<FirstName>();
export const lastNameIso = iso<LastName>();

export const positiveIntegerIso = iso<PositiveInteger>();

export interface BasicUser {
  firstName: FirstName,
  lastName: LastName,
  age: PositiveInteger,
  gender: Gender,
  region: Region,
}

export interface User extends BasicUser {
  customerType: CustomerType,
}

export type Response = {
  status: number,
  message: string | string[]
}

export type CustomerType = 'Normal' | 'VIP'
