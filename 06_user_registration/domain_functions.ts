import * as O from 'fp-ts/Option';
import {
  Europe,
  FirstName, firstNameIso,
  Gender,
  LastName, lastNameIso,
  NorthAmerica,
  Other,
  Region,
  Response,
  BasicUser,
  UserRegistrationDto,
  User,
  positiveIntegerIso
} from './domain_types';
import {PositiveInteger, prismPositiveInteger} from 'newtype-ts/lib/PositiveInteger';
import * as E from "fp-ts/Either";
import {getSemigroup, NonEmptyArray} from "fp-ts/NonEmptyArray";
import {pipe} from "fp-ts/function";
import {sequenceT} from "fp-ts/Apply";
import {fieldsNotEmptyV2, validateAgeV2, validateGenderV2, validationNotGerman} from "./validation";

const america: NorthAmerica = {
  _tag: 'NorthAmerica',
};

const europe: Europe = {
  _tag: 'Europe'
};
const other: Other = {
  _tag: 'Other'
};

const countryMappings: Record<string, Region> = {
  Belgium: europe,
  USA: america,
  Germany: europe,
  China: other,
  // other countries
};

type ParseUser = (f: FirstName,
                  l: LastName,
                  a: PositiveInteger,
                  g: Gender,
                  r: Region) => BasicUser;
export const parseUser: ParseUser = (firstName,
                                     lastName,
                                     age,
                                     gender,
                                     region) => ({
  firstName,
  lastName,
  age,
  gender,
  region
});

type FindRegion = (country: string) => O.Option<Region>
export const findRegion: FindRegion = country =>
  countryMappings[country] ? O.some(countryMappings[country]) : O.none

type FindGender = (sex: string) => O.Option<Gender>
export const findGender: FindGender = sex =>
  sex === 'M' || sex === 'F' || sex === 'X' ? O.some(sex) : O.none;

/*
* Add Status to User
* */
type AddStatus = (u: BasicUser) => User
const addStatus: AddStatus = u => ({
  ...u,
  customerType: u.gender === 'M' ? 'Normal' : 'VIP',
}) as User;

type CreatedResponse = (message: string) => Response
const createdResponse: CreatedResponse = message => ({
  status: 201,
  message
})

type BadRequest = (errorMessages: string[]) => Response
const badRequest: BadRequest = errorMessages => ({
  status: 400,
  message: errorMessages
})

type InternalServerError = () => Response
const internalServerError: InternalServerError = () => ({
  status: 500,
  message: 'Internal Server Error'
})

const applicativeValidation = E.getApplicativeValidation(getSemigroup<string>());

type ValidateUserRegistrationDTO = (userRegDTO: UserRegistrationDto) => E.Either<NonEmptyArray<string>, UserRegistrationDto>
const validateUserRegistrationDTO: ValidateUserRegistrationDTO = (userRegDTO: UserRegistrationDto) => pipe(
  userRegDTO,
  userRegDTO => sequenceT(applicativeValidation)(
    fieldsNotEmptyV2(userRegDTO),
    validateAgeV2(userRegDTO),
    validateGenderV2(userRegDTO),
    validationNotGerman(userRegDTO)
  ),
  E.map(([validatedUserRegDTO]) => validatedUserRegDTO)
)

const sequenceForOption = sequenceT(O.Apply);
type PersistUser = (userRegDTO: UserRegistrationDto) => Response
const persistUser: PersistUser = userRegDTO =>
  pipe(
    userRegDTO,
    userRegDTO => sequenceForOption(
      O.some(firstNameIso.wrap(userRegDTO.firstName)),
      O.some(lastNameIso.wrap(userRegDTO.lastName)),
      prismPositiveInteger.getOption(userRegDTO.age),
      findGender(userRegDTO.sex),
      findRegion(userRegDTO.country),
    ),
    x => x,
    O.map(([f, l, a, g, c]) => parseUser(f, l, a, g, c)),
    O.map(addStatus),
    O.map(user => {
      console.log(`Created ${JSON.stringify(user)}. I can also persist the user if someone writes the code`)
      return createdResponse(`Created user successfully:  ${JSON.stringify(user)}`)
    }),
    O.getOrElse(internalServerError)
  )

type CreateUserHandler = (userRegDTO: UserRegistrationDto) => Response
export const createUserHandler: CreateUserHandler = userRegDTO => {
  return pipe(
    userRegDTO,
    validateUserRegistrationDTO,
    E.map(persistUser),
    E.getOrElse(badRequest)
  );
}
