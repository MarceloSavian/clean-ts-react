import { HttpPostClient } from 'data/protocols/http/http-post-client'

export const mockHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    url?: string
    async post (url: string): Promise<void> {
      this.url = url
    }
  }
  return new HttpPostClientStub()
}
