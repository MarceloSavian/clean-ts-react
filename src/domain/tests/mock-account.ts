import { AuthenticationParams } from '../usecases/authentication'
import faker from 'faker'
import { AccountModel } from '../models/account-model'

export const makeAuthParams = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const makeAccountModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid()
})
