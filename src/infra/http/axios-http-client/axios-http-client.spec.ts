import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockedAxiosResult } from '@/infra/tests/mock-axios'
import { mockPostRequest } from '@/data/tests/mock-http-post'

jest.mock('axios')
const mockedAxios = mockAxios()

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
    const req = mockPostRequest()
    const { sut } = mockSut()
    await sut.post(req)
    expect(mockedAxios.post).toHaveBeenCalledWith(req.url, req.body)
  })
  test('Should returns the correct status code and body', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
