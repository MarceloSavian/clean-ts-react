import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { mockHttpPostClient } from '../../tests/mock-http-client'
import { RemoteAuthentication } from './remote-authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientStub: HttpPostClient
}

const url = 'any_url'

const mockSut = (): SutTypes => {
  const httpPostClientStub = mockHttpPostClient()
  return {
    sut: new RemoteAuthentication(url, httpPostClientStub),
    httpPostClientStub
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientStub } = mockSut()
    await sut.auth()
    expect(httpPostClientStub.url).toBe(url)
  })
})
