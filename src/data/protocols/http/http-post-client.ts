import { HttpResponse } from './http-response'

export type HttpPostParams = {
  url: string
  body?: object
}

export interface HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse
  post: (params: HttpPostParams) => Promise<HttpResponse>
}
