const axios = require('axios')
import { ApiRequest } from '../utils/network_helper';
import { NCPAuthKeyType } from '../utils/types';
import { MockNCPClient } from './mock/mock_ncpclient';

jest.mock('axios')

describe('NCP Client test', () => {

  let ncp: MockNCPClient
  let ncpAuthKey: NCPAuthKeyType
  let baseUrl: string

  beforeAll(() => {
    ncpAuthKey = {
      accessKey: "accessKey",
      secretKey: "secretKey"
    }
    baseUrl = "http://api.test.com"
    ncp = new MockNCPClient(
      ncpAuthKey,
      baseUrl
    )
  })

  beforeEach(() => axios.mockClear())

  test('create NCPClient', () => {
    expect(
      () =>
        new MockNCPClient( ncpAuthKey, baseUrl )
    ).not.toThrow()
  })

  test('successful apiRequest', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        status: 202,
        statusText: 'Accepted'
      })
    )

    const apiRequest: ApiRequest = {
      path: '/static/test',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    const response = await ncp.request(apiRequest)

    expect(response.status).toEqual(202)
    expect(response.statusText).toEqual('Accepted')
  })
  
})