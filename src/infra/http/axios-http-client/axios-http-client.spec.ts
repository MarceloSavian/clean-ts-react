import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

type SutTypes = {
  sut: AxiosHttpClient
}

const mockSut = (): SutTypes => {
  return {
    sut: new AxiosHttpClient()
  }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and Verb', async () => {
    const url = faker.internet.url()
    const { sut } = mockSut()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
