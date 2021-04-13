import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { mockHttpPostClient } from '../../tests/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
import { makeAuthParams } from '@/domain/tests/mock-authentication'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models/account-model'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientStub: HttpPostClient<AuthenticationParams, AccountModel>
}

const mockSut = (url: string): SutTypes => {
  const httpPostClientStub = mockHttpPostClient()
  return {
    sut: new RemoteAuthentication(url, httpPostClientStub),
    httpPostClientStub
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    await sut.auth(makeAuthParams())
    expect(httpPostClientStub.url).toBe(url)
  })
  test('Should call HttpPostClient with correct Body', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    const params = makeAuthParams()
    await sut.auth(params)
    expect(httpPostClientStub.body).toBe(params)
  })
  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    httpPostClientStub.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
