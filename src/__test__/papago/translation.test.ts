const axios = require('axios')
import { MockPAPAGO } from '../mock/mock_papago'
import { NaverOpenApiAuthType } from '../../types/auth_types'
import { PapagoTranslationReturnType } from '../../types/return_types'
import { PAPAGO_preprocessed_Translation } from '../../types/processing_types'

jest.mock('axios')

describe('PAPAGO.Translation TestSuite', () => {
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

  test('Successful request for PAPAGO Translation service', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: 'OK',
        data : {
          message: {
            '@type': 'response',
            '@service': 'naverservice.nmt.proxy',
            '@version': '1.0.0',
            result: {
              srcLangType: 'ko',
              tarLangType: 'en',
              translatedText: 'Really?'
            }
          }
        }
      })
    )
    
    const source = 'ko'
    const target = 'en'
    const text = '정말로?'
    
    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      console.log('data detected')
      const data: PapagoTranslationReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.message !== undefined).toEqual(true)
      expect(data.message['@type'] === 'response').toEqual(true)
      expect(data.message['@service']).toBe('naverservice.nmt.proxy')
      expect(data.message.result.srcLangType === source).toEqual(true)
      expect(data.message.result.tarLangType === target).toEqual(true)
      expect((data.message.result.srcLangType !== data.message.result.tarLangType) && (data.message.result.translatedText !== text)).toEqual(true)
    }

    expect(response.preprocessed).not.toBeNull()
    if (response.preprocessed) {
      console.log('preprocessd complete')
      const preprocessed: PAPAGO_preprocessed_Translation = response.preprocessed
      expect(typeof preprocessed.source).toBe('string')
      expect(preprocessed.source).toBe('ko')
      expect(typeof preprocessed.target).toBe('string')
      expect(preprocessed.target).toBe('en')
      expect(typeof preprocessed.translated).toBe('string')
      expect(preprocessed.translated).toBe('Really?')
    }

  })

  test('Invalid Request with empty source', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const source = ''
    const target = 'en'
    const text = '이게 진짜 된다고?'

    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Source parameter is needed, please check it')
  })

  test('Invalid Request with unsupported source', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const source = 'k'
    const target = 'en'
    const text = '이게 진짜 된다고?'

    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unsupported source language, please check it')
  })

  test('Invalid Request with empty target', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const source = 'ko'
    const target = ''
    const text = '이게 진짜 된다고?'

    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Target parameter is needed, please check it')
  })

  test('Invalid Request with unsupported target', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const source = 'en'
    const target = 'rur'
    const text = 'Really ?'

    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unsupported target language, please check it')
  })

  test('Invalid Request with unsupported source-to-target translation', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const source = 'en'
    const target = 'ru'
    const text = 'Really ?'

    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('There is no source–to-target translator, please check it')
  })

  test('Invalid Request with empty text', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const source = 'ko'
    const target = 'en'
    const text = ''

    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Text parameter is needed, please check it')
  })

  test('Invalid Request with text exceeding 5000 characters', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 413,
          statusText: 'Request Entity Too Large'
        }
      })
    )
    

    const source = 'ko'
    const target = 'en'
    const text = "Dummy Text-exceeded with 5000 characters-length".repeat(5000)
    
    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Text parameter exceeds the maximum length, please check it')
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
    
    const source = 'ko'
    const target = 'en'
    const text = '이게 진짜 된다고?'
    
    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 401')
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
    
    const source = 'ko'
    const target = 'en'
    const text = '이게 진짜 된다고?'
    
    const response = await client.translation(source, target, text)
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
    
    const source = 'ko'
    const target = 'en'
    const text = '이게 진짜 된다고?'
    
    const response = await client.translation(source, target, text)
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
    
    const source = 'ko'
    const target = 'en'
    const text = '이게 진짜 된다고?'
    
    const response = await client.translation(source, target, text)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 429')
  })

})