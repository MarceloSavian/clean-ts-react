export type HttpPostParams = {
  url: string
  body?: object
}

export interface HttpPostClient {
  url?: string
  body?: object
  post: (params: HttpPostParams) => Promise<void>
}
