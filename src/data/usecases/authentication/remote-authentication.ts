import { AccountModel } from '@/domain/models/account-model'
import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    await this.httpPostClient.post({ url: this.url, body: params })
    return { accessToken: '' }
  }
}
