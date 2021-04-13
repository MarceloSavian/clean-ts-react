import { HttpPostClient } from 'data/protocols/http/http-post-client'
import { RemoteAuthentication } from './remote-authentication'

const mockHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    url?: string
    async post (url: string): Promise<void> {
      this.url = url
    }
  }
  return new HttpPostClientStub()
}

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
