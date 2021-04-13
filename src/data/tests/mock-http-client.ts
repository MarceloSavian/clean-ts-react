import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'

export const mockHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    url?: string
    body?: object
    async post (params: HttpPostParams): Promise<void> {
      this.url = params.url
      this.body = params.body
    }
  }
  return new HttpPostClientStub()
}
