const axios = require('axios')
import { MockSMS } from '../mock/mock_smsClient';
import { SendSMSParamType } from '../../types/param_types';
import { SearchMessageRequestReturnType, SearchMessageResultReturnType, SendSMSReturnType } from '../../types/return_types';
import { NCPAuthKeyType, SMSserviceAuthType } from '../../types/auth_types';

jest.mock('axios')

const smsSingleParam: SendSMSParamType = {
  to: '01012271994',
  content: 'test single'
}

const smsMultiParam: SendSMSParamType[] = [
  {
    to: '01012271994',
    content: 'test triple'
  },
  {
  to: '01031412311',
  content: 'test triple'
  },
  {
    to: '01022293331',
    content: 'test double'
  }
]

describe('SmsClient TestSuite', () => {
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

  test('Successful request for sendSMS (single)', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        requestId: "8ac25d36c3f849c7b1ba1c705ce4e9e7",
        requestTime: "2021-04-18T19:27:10.044",
        statusCode: "202",
        statusName: "success"
      })
    )
    
    const response = await client.sendSMS(smsSingleParam)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      console.log('data detected')
      const data: SendSMSReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.statusCode).toEqual('202')
      expect(data.statusText).toEqual('success')
      expect(data.requestId !== undefined).toEqual(true)
      expect(data.requestTime !== undefined).toEqual(true)
    }
  })

  test('Successful request for sendSMS (multi)', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        requestId: "8ac25d36c3f849c7b1ba1c705ce4e9e7",
        requestTime: "2021-04-18T19:27:10.044",
        statusCode: "202",
        statusName: "success"
      })
    )
    
    const response = await client.sendSMS(smsMultiParam)
    expect(response.isSuccess).toEqual(true)
    if (response.data) {
      console.log('data detected')
      const data: SendSMSReturnType = response.data || undefined
      expect(data !== undefined).toEqual(true)
      expect(data.statusCode).toEqual('202')
      expect(data.statusText).toEqual('success')
      expect(data.requestId !== undefined).toEqual(true)
      expect(data.requestTime !== undefined).toEqual(true)
    }
  })

  test('Invalid Response with http status Code 400', async () => {
    
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 400,
          statusText: 'Bad Request'
        },
        request: {},
        config: {}
      })
    )
    // With empty sendsmsParam, will receive 400 Bad Request 
    const smsWrongParam: SendSMSParamType = {
      to: '',
      content: ''
    }
    
    const response = await client.sendSMS(smsWrongParam)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Unexpected HTTP Status Code : 400')
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
    
    const response = await client.sendSMS(smsSingleParam)
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
    
    const response = await client.sendSMS(smsSingleParam)
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

    // if smsAuth Values are wrong , will receive 404 Not Found
    // Not Found :: means can't find given SMS service Auth Info
    smsAuth = <SMSserviceAuthType>{
      phone: "wrongPhone",
      serviceId: "wrongServiceId"
    }
    client = new MockSMS( 'http://sms.test.com', ncpAuthKey, smsAuth )
    
    const response = await client.sendSMS(smsSingleParam)
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
    
    const response = await client.sendSMS(smsSingleParam)
    expect(response.isSuccess).toEqual(false)
    expect(response.errorMessage).toEqual('Invalid URL')
  })

})
