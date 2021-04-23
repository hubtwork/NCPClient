const axios = require('axios')
import { MockSMS } from '../mock/mock_smsClient';
import { SearchMessageResultReturnType } from '../../types/return_types';
import { NCPAuthKeyType, SMSserviceAuthType } from '../../types/auth_types';

jest.mock('axios')

const messageId: string = '0-ESA-202104-4104031-0'

describe('SMS.SearchSmsResult TestSuite', () => {
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

  test('Successful request for searchMessageResult', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        isSuccess: true,
        data: {
          statusCode: '202',
          statusName: 'success',
          messages: [ {
            requestTime: '2021-04-19 06:41:15',
            from: '01012271994',
            to: '01019941227',
            contentType: 'COMM',
            countryCode: '82',
            content: 'test single',
            completeTime: '2021-04-19 06:41:23',
            status: 'COMPLETED',
            telcoCode: 'SKT',
            statusCode: '0',
            statusMessage: '성공',
            statusName: 'success'
          } ]
        }
      })
    )
    
    const response = await client.searchMessageResult(messageId)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      const data: SearchMessageResultReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.statusCode).toEqual('202')
      expect(data.statusName).toEqual('success')
      expect(data.messages.length > 0).toEqual(true)
      expect(data.messages[0].countryCode).toEqual('82')
      expect(data.messages[0].status).toEqual('COMPLETED')
      expect(data.messages[0].statusName).toEqual('success')
      expect(data.messages[0].requestTime.match(/(\d{4})-(\d{2})-(\d{2})(\s)(\d{2}):(\d{2}):(\d{2})/) !== null).toEqual(true)
      expect(data.messages[0].requestTime !== data.messages[0].completeTime).toEqual(true)
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
    
    const response = await client.searchMessageResult(messageId)
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
    
    const response = await client.searchMessageResult(messageId)
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

    // if messageId Value which can't found in api , will receive 404 Not Found
    // Not Found :: means can't find given SMS Info
    const response = await client.searchMessageResult('wrongMesageId')
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
    
    const response = await client.searchMessageResult(messageId)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Invalid URL')
  })

})
