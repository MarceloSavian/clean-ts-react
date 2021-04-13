import { AccountModel } from '@/domain/models/account-model'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpReponse = await this.httpPostClient.post({ url: this.url, body: params })

    switch (httpReponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: return { accessToken: '' }
    }
  }
}
