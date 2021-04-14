import { ApiRequest, BaseURL, NCPClient } from '../utils/network_helper'
import { NCPAuthKeyType, SendSMSParamType, SendSMSReturnType, SMSserviceAuthType } from '../utils/types'
import { generateApiSignature } from '../utils/helper'
import { Method } from 'axios'

export class SENS {
  
  private baseUrl: string = BaseURL.sens

  private client: NCPClient

  constructor(
    ncpAuthKey: NCPAuthKeyType
  ) {
    this.client = new NCPClient(ncpAuthKey, this.baseUrl)
  }

}

export class Project {
  
}

export class SMS {

  private baseUrl: string
  private client: NCPClient
  
  private smsAuth: SMSserviceAuthType

  constructor(
    ncpAuthKey: NCPAuthKeyType,
    smsAuth: SMSserviceAuthType
  ) {
    this.smsAuth = smsAuth
    this.baseUrl = BaseURL.sens
    this.client = new NCPClient(ncpAuthKey, this.baseUrl)
  }

  public async sendSMS(
    smsParam: SendSMSParamType
  ): Promise<SendSMSReturnType>
  {
    // construct Api Request for sendSMS service.
    const apiRequest = new APISendSMS(
      this.client.ncpAuthKey,
      this.smsAuth,
      smsParam
    )
    try {
      const response = await this.client.request(apiRequest)
      if (response.status === 202) {
        return {
          success: true,
          status: response.status,
          msg: response.statusText,
        };
      } else {
        return {
          success: false,
          status: response.status,
          msg: response.statusText,
        };
      }
    } catch(error) {
      return {
        success: false,
        msg: error.response.statusText || 'Internal Server Error',
        status: error.response.status || 500,
      };
    }
  }
  
}

class APISendSMS implements ApiRequest {
  path: string
  method: Method = 'POST'
  headers: { [key: string]: string }
  body?: { [key: string]: any } | undefined

  constructor(
    ncpAuthKey: NCPAuthKeyType,
    smsAuth: SMSserviceAuthType,
    smsParam: SendSMSParamType,
  ) {
    const { accessKey, secretKey } = ncpAuthKey
    const { phone, serviceId } = smsAuth
    const { to, content, countryCode = '82' } = smsParam
    this.path = `/sms/v2/services/${serviceId}/messages`
    const { timestamp, signature } = generateApiSignature({ method: this.method, url: this.path, ncpAuthKey })
    this.headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': accessKey,
      'x-ncp-apigw-timestamp': timestamp,
      'x-ncp-apigw-signature-v2': signature,
    }
    this.body = {
      'type': 'SMS',
      'contentType': 'COMM',
      'countryCode': countryCode,
      'from': phone,
      'content': content,
      'messages': [
        {
          'to': to,
        },
      ],
    }
  }
}