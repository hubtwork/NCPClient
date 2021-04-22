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


})