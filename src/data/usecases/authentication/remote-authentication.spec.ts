import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { mockHttpPostClient } from '../../tests/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
import { makeAccountModel, makeAuthParams } from '@/domain/tests/mock-account'
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
  test('Should call HttpPostClient with correct params', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    const postSpy = jest.spyOn(httpPostClientStub, 'post')
    const params = makeAuthParams()
    await sut.auth(params)
    expect(postSpy).toHaveBeenLastCalledWith({ url, body: params })
  })
  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    jest.spyOn(httpPostClientStub, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized
    })
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    jest.spyOn(httpPostClientStub, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.badRequest
    })
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    jest.spyOn(httpPostClientStub, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound
    })
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    jest.spyOn(httpPostClientStub, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError
    })
    const promise = sut.auth(makeAuthParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should returns an account model if HttpPostCLient returns 200', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientStub } = mockSut(url)
    const httpResult = makeAccountModel()
    jest.spyOn(httpPostClientStub, 'post').mockResolvedValueOnce({
      statusCode: HttpStatusCode.ok,
      body: httpResult
    })
    const account = await sut.auth(makeAuthParams())
    expect(account).toEqual(httpResult)
  })
})
