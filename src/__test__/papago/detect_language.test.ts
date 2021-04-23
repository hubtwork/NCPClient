const axios = require('axios')
import { MockPAPAGO } from '../mock/mock_papago'
import { NaverOpenApiAuthType } from '../../types/auth_types'
import { PapagoDetectLanguageReturnType } from '../../types/return_types'

jest.mock('axios')

describe('PAPAGO.DetectLanguage TestSuite', () => {
  let client: MockPAPAGO
  let naverOpenApiAuth = <NaverOpenApiAuthType>{
    clientId: "clientId",
    clientSecret: "clientSecret"
  }

  beforeAll(() => {
    client = new MockPAPAGO('http://papago.test.com', naverOpenApiAuth)
  })

  beforeEach(() => axios.mockReset())

  test('create PAPAGO client', () => {
    expect(
      () =>
        new MockPAPAGO('http://papago.test.com', naverOpenApiAuth)
    ).not.toThrow()
  })

  test('Successful request for PAPAGO Detect Language service', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        langCode: 'ko'
      })
    )
    const text = '이게 된다고?'
    
    const response = await client.detectLanguage(text)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      console.log('data detected')
      const data: PapagoDetectLanguageReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.langCode === 'ko').toEqual(true)
    }

  })

  test('Invalid Request with empty text', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const text = ""

    const response = await client.detectLanguage(text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Text parameter is needed, please check it')
  })

  test('Invalid Request with invalid Authentication', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 401,
          statusText: 'Authentication Failed'
        }
      })
    )

    const wrongAuth = <NaverOpenApiAuthType>{
      clientId: "wrongClientId",
      clientSecret: "wrongClientSecret"
    }

    client = new MockPAPAGO('http://papago.test.com', wrongAuth)
    
    const text = "hi"

    const response = await client.detectLanguage(text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 401')
  })

  test('Invalid Request with exceeding 10MB text parameter', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 413,
          statusText: 'Request Entity Too Large'
        }
      })
    )
    
    const text = "Dummy Text-exceeded with 10MB"

    const response = await client.detectLanguage(text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 413')
  })

  test('Invalid Request with account with quota limit exceeded', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 429,
          statusText: 'Quota Exceeded'
        }
      })
    )
    
    const text = '이게 된다고?'
    
    const response = await client.detectLanguage(text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 429')
  })

  test('Invalid Request with account with throttle limit exceeded', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 429,
          statusText: 'Throttle Limited'
        }
      })
    )
    
    const text = '이게 된다고?'
    
    const response = await client.detectLanguage(text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 429')
  })

  test('Invalid Request with account with rate limit exceeded', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 429,
          statusText: 'Rate Limited'
        }
      })
    )
    
    const text = '이게 된다고?'
    
    const response = await client.detectLanguage(text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 429')
  })

})