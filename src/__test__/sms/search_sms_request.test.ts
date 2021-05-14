const axios = require('axios')
import { MockSMS } from '../mock/mock_smsClient';
import { SearchMessageRequestReturnType } from '../../types/return_types';
import { NCPAuthKeyType, SMSserviceAuthType } from '../../types/auth_types';
import { SENS_preprocessed_SearchMessageRequest } from '../../types/processing_types';

jest.mock('axios')

const requestId: string = '3a4cb63856b04f93aa43805188d6f695'

describe('SMS.SearchSmsRequest TestSuite', () => {
  let client: MockSMS
  let ncpAuthKey = <NCPAuthKeyType>{
    accessKey: "accessKey",
    secretKey: "secretKey"
  }
  let smsAuth = <SMSserviceAuthType>{
    phone: "01019941227",
    serviceId: "serviceId"
  }

  beforeAll(() => {
    client = new MockSMS( 'http://sms.test.com', ncpAuthKey, smsAuth )
  })

  beforeEach(() => axios.mockClear())

  test('create SmsClient', () => {
    expect(
      () =>
      new MockSMS( 'http://sms.test.com', ncpAuthKey, smsAuth )
    ).not.toThrow()
  })

  test('Successful request for searchMessageRequest with single Message', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        statusText: 'OK',
        data : {
          statusCode: '202',
          statusName: 'success',
          requestId: '3a4cb63856b04f93aa43805188d6f695',
          messages: [ {
            messageId: '0-ESA-202104-4104031-0',
            requestTime: '2021-04-19 06:41:15',
            from: '01012345678',
            to: '01043219876',
            contentType: 'COMM',
            countryCode: '82'
          } ]
        }
      })
    )
    
    const response = await client.searchMessageRequest(requestId)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      const data: SearchMessageRequestReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.statusCode).toEqual('202')
      expect(data.statusName).toEqual('success')
      expect(data.requestId !== undefined).toEqual(true)
      expect(data.messages.length > 0).toEqual(true)
      expect(data.messages[0].countryCode).toEqual('82')
      expect(data.messages[0].requestTime.match(/(\d{4})-(\d{2})-(\d{2})(\s)(\d{2}):(\d{2}):(\d{2})/) !== null).toEqual(true)
    }


    expect(response.preprocessed).not.toBeNull()
    if (response.preprocessed) {
      console.log('preprocessd complete')
      const preprocessed: SENS_preprocessed_SearchMessageRequest = response.preprocessed
      expect(typeof preprocessed.requestId).toBe('string')
      expect(preprocessed.requestId).toBe('3a4cb63856b04f93aa43805188d6f695')
      expect(typeof preprocessed.result).toBe('string')
      expect(preprocessed.result).toBe('success')
      expect(preprocessed.messageIds.length).toBe(1)
    }

  })

  test('Successful request for searchMessageRequest with multi Message', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        data: {
          statusCode: '202',
          statusName: 'success',
          requestId: '3a4cb63856b04f93aa43805188d6f695',
          messages: [
            {
              messageId: '0-ESA-202104-4104031-1',
              requestTime: '2021-04-19 06:41:15',
            },
            {
              messageId: '0-ESA-202104-4104031-2',
              requestTime: '2021-04-19 06:41:15',
            },
            {
              messageId: '0-ESA-202104-4104031-3',
              requestTime: '2021-04-19 06:41:15',
            }
          ]
        }
      })
    )
    
    const response = await client.searchMessageRequest(requestId)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      const data: SearchMessageRequestReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.statusCode).toEqual('202')
      expect(data.statusName).toEqual('success')
      expect(data.requestId !== undefined).toEqual(true)
      expect(data.messages.length > 1).toEqual(true)
      expect(data.messages[0].requestTime === data.messages.slice(-1)[0].requestTime).toEqual(true)
      expect(data.messages[0].messageId !== data.messages.slice(-1)[0].messageId).toEqual(true)
    }
  })

  test('Invalid Response with http status Code 401', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 401,
          statusText: 'Unauthorized'
        },
        request: {},
        config: {}
      })
    )

    // Assume Signature in Header calculated wrong, will receive 401 Unauthorized
    // Reason :: wrong Path || wrong Method || wrong Authentication Key ( Account )
    
    const response = await client.searchMessageRequest(requestId)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 401')
  })

  test('Invalid Response with http status Code 403', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 403,
          statusText: 'Forbidden'
        },
        request: {},
        config: {}
      })
    )

    // if ncpAuthKey is wrong , will receive 403 Forbidden
    // Forbidden :: means invalid api auth token
    ncpAuthKey = <NCPAuthKeyType>{
      accessKey: "wrongAccessKey",
      secretKey: "wrongSecretKey"
    }
    client = new MockSMS( 'http://sms.test.com', ncpAuthKey, smsAuth )
    
    const response = await client.searchMessageRequest(requestId)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 403')
  })

  test('Invalid Response with http status Code 404', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 404,
          statusText: 'Not Found'
        },
        request: {},
        config: {}
      })
    )

    // if requestId Value which can't found in api , will receive 404 Not Found
    // Not Found :: means can't find given SMS Info
    const response = await client.searchMessageRequest('wrongRequestId')
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 404')
  })

  test('Invalid URL error occured', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {},
        request: {},
        config: {}
      })
    )

    // if invalid URL ( baseUrl + path ) passed, service will return InvalidURL ERROR
    client = new MockSMS('htt:sms.test.com', ncpAuthKey, smsAuth )
    
    const response = await client.searchMessageRequest(requestId)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Invalid URL')
  })

})
