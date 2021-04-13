import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'

export const mockHttpPostClient = (): HttpPostClient => {
  class HttpPostClientStub implements HttpPostClient {
    url?: string
    body?: object
    response: HttpResponse = {
      statusCode: HttpStatusCode.noContent
    }

    async post (params: HttpPostParams): Promise<HttpResponse> {
      this.url = params.url
      this.body = params.body
      return this.response
    }
  }
  return new HttpPostClientStub()
}
