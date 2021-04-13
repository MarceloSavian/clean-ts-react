import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client'
import { AccountModel } from '@/domain/models/account-model'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'

export const mockHttpPostClient = (): HttpPostClient<AuthenticationParams, AccountModel> => {
  class HttpPostClientStub<T, R> implements HttpPostClient<T, R> {
    url?: string
    body?: T
    response: HttpResponse<R> = {
      statusCode: HttpStatusCode.ok
    }

    async post (params: HttpPostParams<T>): Promise<HttpResponse<R>> {
      this.url = params.url
      this.body = params.body
      return this.response
    }
  }
  return new HttpPostClientStub()
}
