import {NetworkError, safeFetch, parseJson} from './safe_fetch'
import * as T from 'fp-ts/Task'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import {pipe} from 'fp-ts/function'
import * as t from "io-ts";

const userDTOschema = t.type({
  id: t.number,
  email: t.string,
  first_name: t.string,
  last_name: t.string,
  avatar: t.string,
})

const userDTOSchema = t.type(
  { data: userDTOschema
})

type UserDTO = t.TypeOf<typeof userDTOSchema>


type UserParseError = {
  _tag: 'UserParseError'
  error: Error
}

const decodeUserError = (e: t.Errors): UserParseError => ({
  _tag: 'UserParseError',
  error: new Error(
    `${e.map(e => e.context.map(({key}) => key).join("."))}`
  )
})

function decode(res: unknown): TE.TaskEither<UserParseError, UserDTO> {
  return pipe(TE.fromEither(userDTOSchema.decode(res)), TE.mapLeft(decodeUserError))
}

const getUserTaskEither = (id: number) => pipe(
  `https://reqres.in/api/users/${id}`,
  safeFetch({}),
  TE.chainW(parseJson),
  TE.chainW(decode),
  TE.foldW(
    e => T.of(`oh no, an error occurred: ${e.error.message}`),
    (user: UserDTO) => T.of(user.data)
  )
)

getUserTaskEither(2)()
  .then(res => console.log('Success ', res))

getUserTaskEither(21111)()
  .then(res => console.log('Error ', res))
