const axios = require('axios')
import { MockPAPAGO } from '../mock/mock_papago'
import { NaverOpenApiAuthType } from '../../types/auth_types'
import { PapagoKoreanNameRomanizerReturnType } from '../../types/return_types'

jest.mock('axios')

describe('PAPAGO.KoreanNameRomanizer TestSuite', () => {
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

  test('Successful request for PAPAGO KoreanNameRomanizer service', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        aResult: [
          {
            sFirstName: '허',
            aItems: [
              { name: 'Heo Jae', score: '100' },
              { name: 'Huh Jae', score: '60' },
              { name: 'Hur Jae', score: '45' },
              { name: 'Hu Jae', score: '26' },
              { name: 'Heo Je', score: '10' },
              { name: 'Heo Jea', score: '10' },
              { name: 'Huh Je', score: '6' },
              { name: 'Huh Jea', score: '6' },
              { name: 'Hur Je', score: '4' },
              { name: 'Hur Jea', score: '4' }
            ]
          }
        ]
      })
    )
    
    const name = "허재"
    
    const response = await client.koreanNameRominizer(name)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      console.log('data detected')
      const data: PapagoKoreanNameRomanizerReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.aResult.length > 0).toEqual(true)
      expect(data.aResult[0].sFirstName.length > 0).toEqual(true)
      expect(data.aResult[0].aItems.length > 0).toEqual(true)
    }

  })

  test('Invalid Request with empty name', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const name = ""

    const response = await client.koreanNameRominizer(name)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('KoreanName parameter is needed, please check it')
  })

  test('Invalid Request with no-korean name', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const name = "hubtwork"

    const response = await client.koreanNameRominizer(name)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Only full Korean name parameter with no white space is allowed, please check it')
  })

  test('Invalid Request with Korean name with whitespaces', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject()
    )
    
    const name = "허 재"

    const response = await client.koreanNameRominizer(name)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Only full Korean name parameter with no white space is allowed, please check it')
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
    
    const name = "허재"
    
    const response = await client.koreanNameRominizer(name)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 401')
  })

  test('Invalid Request with exceeding 10MB name parameter', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 413,
          statusText: 'Request Entity Too Large'
        }
      })
    )
    
    const name = "십메가바이트가넘어가는이름"

    const response = await client.koreanNameRominizer(name)
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
    
    const name = "허재"

    const response = await client.koreanNameRominizer(name)
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
    
    const name = "허재"

    const response = await client.koreanNameRominizer(name)
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
    
    const name = "허재"

    const response = await client.koreanNameRominizer(name)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 429')
  })



})