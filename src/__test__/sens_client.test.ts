const axios = require('axios')
import { NCPAuthKeyType, SendSMSParamType, SMSserviceAuthType } from '../utils/types'
import { MockSMS } from './mock/mock_sms'

jest.mock("axios")

describe('SMS client test', () => {
  let client: MockSMS

  let ncpAuthKey: NCPAuthKeyType
  let smsAuth: SMSserviceAuthType

  beforeAll(() => {
    ncpAuthKey = {
      accessKey: "accessKey",
      secretKey: "secretKey"
    }
    smsAuth = {
      phone: '01011114321',
      serviceId: 'serviceId'
    }
    client = new MockSMS( ncpAuthKey, smsAuth )
  })

  beforeEach(() => axios.mockClear())
    
  test('send SMS is successful', async () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        status: 202,
        statusText: 'Accepted',
        data: {
          "statusCode": "202",
          "statusName": "success",
          "requestId": "encryptedRequestId",
          "requestTime": "requestedTimestamp",
        }
      })
    )

    const smsParams: SendSMSParamType = {
      to: '01043211111',
      content: 'test'
    }

    const response = await client.sendSMS(smsParams)
  
    expect(response.isSuccess).toBe(true)
    expect(response.status).toBe(202)
    expect(response.statusText).toBe('Accepted')
    expect(response.data !== undefined).toBe(true)
  })

  test('Unauthorized NCP auth key. Not Allowed User.', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 401,
          statusText: 'Unauthorized'
        }
      })
    )

    const smsParams: SendSMSParamType = {
      to: '01043211111',
      content: 'test'
    }

    const response = await client.sendSMS(smsParams)
  
    expect(response.isSuccess).toBe(false)
    expect(response.status).toBe(401)
    expect(response.statusText).toBe('Unauthorized')
    expect(response.data === undefined).toBe(true)
  })

  test('Incorrect Phone Number. No phone number pairing with given serviceId', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          status: 404,
          statusText: 'Not Found'
        }
      })
    )

    const smsParams: SendSMSParamType = {
      to: '01043211111',
      content: 'test'
    }

    const response = await client.sendSMS(smsParams)
  
    expect(response.isSuccess).toBe(false)
    expect(response.status).toBe(404)
    expect(response.statusText).toBe('Not Found')
    expect(response.data === undefined).toBe(true)
  })
    
  test('Incorrect ServiceId. Given serviceId is not enrolled.', async () => {
    axios.mockImplementationOnce(() =>
      Promise.reject({
        response:
        {
          status: 403,
          statusText: 'Forbidden'
        }
      })
    )

    const smsParams: SendSMSParamType = {
      to: '01043211111',
      content: 'test'
    }

    const response = await client.sendSMS(smsParams)
  
    expect(response.isSuccess).toBe(false)
    expect(response.status).toBe(403)
    expect(response.statusText).toBe('Forbidden')
    expect(response.data === undefined).toBe(true)
  })
})
