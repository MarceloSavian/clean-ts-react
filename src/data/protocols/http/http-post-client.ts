import { HttpResponse } from './http-response'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R>
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>
}
