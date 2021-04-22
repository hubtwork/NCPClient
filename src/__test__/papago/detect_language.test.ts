const axios = require('axios')
import { MockPAPAGO } from '../mock/mock_papago'
import { NaverOpenApiAuthType } from '../../types/auth_types'
import { PapagoDetectLanguageReturnType } from '../../types/return_types'

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

})