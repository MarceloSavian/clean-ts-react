import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { mockHttpPostClient } from '../../tests/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
import { makeAuthParams } from '@/domain/tests/mock-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientStub: HttpPostClient
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
})
