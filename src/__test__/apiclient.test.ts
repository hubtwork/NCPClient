const axios = require('axios')
import { NCPAuthKeyType } from '../types/auth_types'
import { MockApiClient, ApiRequest } from './mock/mock_apiClient'

type testDataType = {
  name: string
}

jest.mock("axios")

describe('ApiClient TestSuite', () => {
  let client: MockApiClient
  let ncpAuthKey: NCPAuthKeyType

  beforeAll(() => {
    const ncpAuthKey = {
      accessKey: "accessKey",
      secretKey: "secretKey"
    }
    client = new MockApiClient( ncpAuthKey, 'http://api.test.com', 2000 )
  })

  beforeEach(() => axios.mockClear())

  test('create ApiClient', () => {
    expect(
      () =>
      new MockApiClient( ncpAuthKey, 'http://api.test.com', 2000 )
    ).not.toThrow()
  })

  test('successful apiRequest', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        status: 202,
        data: {
          name: 'hubtwork'
        }
      })
    )

    const apiRequest: ApiRequest = {
      path: '/static/test',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    const response = await client.request<testDataType>(apiRequest)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      const data: testDataType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.name).toEqual('hubtwork')
    }
  })

  test('Response with invalid httpStatusCode', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 404,
          statusText: 'Not found'
        },
        request: {},
        config: {}
      })
    )

    const apiRequest: ApiRequest = {
      path: '/static/testsss1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    const response = await client.request<testDataType>(apiRequest)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 404')
  })

  test('No response from server', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        request: {},
        config: {}
      })
    )

    const apiRequest: ApiRequest = {
      path: '/unreached',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    const response = await client.request<testDataType>(apiRequest)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('No response from the server')
  })

  test('Request Configuration Occured', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        config: {}
      })
    )

    const apiRequest: ApiRequest = {
      path: '/',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    const response = await client.request<testDataType>(apiRequest)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Error occured during setup request')
  })

})