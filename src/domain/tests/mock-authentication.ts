import { AuthenticationParams } from '../usecases/authentication'
import faker from 'faker'

export const makeAuthParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
