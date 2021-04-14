import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostParams } from '@/data/protocols/http/http-post-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

type SutTypes = {
  sut: AxiosHttpClient
}

const mockSut = (): SutTypes => {
  return {
    sut: new AxiosHttpClient()
  }
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

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
